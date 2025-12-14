import { useState } from 'react';
import api from '../api/api';

interface AddSweetFormProps {
  onSweetAdded: () => void;
}

const AddSweetForm = ({ onSweetAdded }: AddSweetFormProps) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !category || !price || !quantity) {
      setError('Name, category, price, and quantity are required.');
      return;
    }

    try {
      await api.post('/sweets', {
        name,
        category,
        price: parseFloat(price),
        quantity: parseInt(quantity),
        description,
        image_url: imageUrl
      });

      setName('');
      setCategory('');
      setPrice('');
      setQuantity('');
      setDescription('');
      setImageUrl('');
      setError('');

      onSweetAdded();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to add sweet.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ marginRight: 10 }}
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        style={{ marginRight: 10 }}
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        style={{ marginRight: 10 }}
      />
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        style={{ marginRight: 10 }}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ marginRight: 10 }}
      />
      <input
        type="text"
        placeholder="Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        style={{ marginRight: 10 }}
      />
      <button type="submit">Add Sweet</button>
    </form>
  );
};

export default AddSweetForm;
