import express from 'express';
import {
  getAllSweets,
  searchSweets,
  createSweet,
  updateSweet,
  deleteSweet,
  purchaseSweet,
  restockSweet,
} from '../controllers/sweetController';
import { authenticateToken, isAdmin } from '../middleware/auth';

const router = express.Router();

// Public routes (no authentication needed)
router.get('/', getAllSweets);
router.get('/search', searchSweets);

// Protected routes (authentication required)
router.post('/:id/purchase', authenticateToken, purchaseSweet);

// Admin-only routes
router.post('/', authenticateToken, isAdmin, createSweet);
router.put('/:id', authenticateToken, isAdmin, updateSweet);
router.delete('/:id', authenticateToken, isAdmin, deleteSweet);
router.post('/:id/restock', authenticateToken, isAdmin, restockSweet);

export default router;