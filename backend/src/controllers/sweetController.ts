import { Request, Response } from 'express';
import { pool } from '../database';

// Get all sweets
export const getAllSweets = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      'SELECT * FROM sweets ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Get sweets error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Search sweets
export const searchSweets = async (req: Request, res: Response) => {
  try {
    const { name, category, minPrice, maxPrice } = req.query;

    let query = 'SELECT * FROM sweets WHERE 1=1';
    const params: any[] = [];
    let paramCount = 1;

    if (name) {
      query += ` AND name ILIKE $${paramCount}`;
      params.push(`%${name}%`);
      paramCount++;
    }

    if (category) {
      query += ` AND category = $${paramCount}`;
      params.push(category);
      paramCount++;
    }

    if (minPrice) {
      query += ` AND price >= $${paramCount}`;
      params.push(parseFloat(minPrice as string));
      paramCount++;
    }

    if (maxPrice) {
      query += ` AND price <= $${paramCount}`;
      params.push(parseFloat(maxPrice as string));
      paramCount++;
    }

    query += ' ORDER BY created_at DESC';

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error('Search sweets error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create sweet
export const createSweet = async (req: Request, res: Response) => {
  try {
    const { name, category, price, quantity, description, image_url } = req.body;

    if (!name || !category || price === undefined || quantity === undefined) {
      return res.status(400).json({ 
        error: 'Name, category, price, and quantity are required' 
      });
    }

    if (price < 0 || quantity < 0) {
      return res.status(400).json({ 
        error: 'Price and quantity must be non-negative' 
      });
    }

    const result = await pool.query(
      `INSERT INTO sweets (name, category, price, quantity, description, image_url) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING *`,
      [name, category, price, quantity, description || null, image_url || null]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Create sweet error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update sweet
export const updateSweet = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, category, price, quantity, description, image_url } = req.body;

    const existingSweet = await pool.query(
      'SELECT * FROM sweets WHERE id = $1',
      [id]
    );

    if (existingSweet.rows.length === 0) {
      return res.status(404).json({ error: 'Sweet not found' });
    }

    if (price !== undefined && price < 0) {
      return res.status(400).json({ error: 'Price must be non-negative' });
    }

    if (quantity !== undefined && quantity < 0) {
      return res.status(400).json({ error: 'Quantity must be non-negative' });
    }

    const result = await pool.query(
      `UPDATE sweets 
       SET name = COALESCE($1, name),
           category = COALESCE($2, category),
           price = COALESCE($3, price),
           quantity = COALESCE($4, quantity),
           description = COALESCE($5, description),
           image_url = COALESCE($6, image_url),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $7
       RETURNING *`,
      [name, category, price, quantity, description, image_url, id]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Update sweet error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete sweet
export const deleteSweet = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM sweets WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Sweet not found' });
    }

    res.json({ message: 'Sweet deleted successfully', sweet: result.rows[0] });
  } catch (error) {
    console.error('Delete sweet error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Purchase sweet
export const purchaseSweet = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({ error: 'Quantity must be at least 1' });
    }

    const sweetResult = await pool.query(
      'SELECT * FROM sweets WHERE id = $1',
      [id]
    );

    if (sweetResult.rows.length === 0) {
      return res.status(404).json({ error: 'Sweet not found' });
    }

    const sweet = sweetResult.rows[0];

    if (sweet.quantity < quantity) {
      return res.status(400).json({ 
        error: 'Insufficient stock',
        available: sweet.quantity,
        requested: quantity
      });
    }

    const result = await pool.query(
      `UPDATE sweets 
       SET quantity = quantity - $1,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $2
       RETURNING *`,
      [quantity, id]
    );

    res.json({ 
      message: 'Purchase successful',
      sweet: result.rows[0],
      purchased: quantity
    });
  } catch (error) {
    console.error('Purchase sweet error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Restock sweet
export const restockSweet = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({ error: 'Quantity must be at least 1' });
    }

    const existingSweet = await pool.query(
      'SELECT * FROM sweets WHERE id = $1',
      [id]
    );

    if (existingSweet.rows.length === 0) {
      return res.status(404).json({ error: 'Sweet not found' });
    }

    const result = await pool.query(
      `UPDATE sweets 
       SET quantity = quantity + $1,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $2
       RETURNING *`,
      [quantity, id]
    );

    res.json({ 
      message: 'Restock successful',
      sweet: result.rows[0],
      added: quantity
    });
  } catch (error) {
    console.error('Restock sweet error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};