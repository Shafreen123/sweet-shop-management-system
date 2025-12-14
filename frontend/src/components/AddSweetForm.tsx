import { useState } from 'react';
import api from '../api/api';

const AddSweetForm = ({ onSweetAdded }: { onSweetAdded: () => void }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await api.post('/sweets', {
        name,
        category,
        price: Number(price),
        quantity: Number(quantity),
      });

      setName('');
      setCategory('');
      setPrice('');
      setQuantity('');
      onSweetAdded();
    } catch (err) {
      setError('Failed to add sweet');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <h3>Add New Sweet 🍭</h3>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <input
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />

      <input
        placeholder="Category"
        value={category}
        onChange={e => setCategory(e.target.value)}
        required
      />

      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={e => setPrice(e.target.value)}
        required
      />

      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={e => setQuantity(e.target.value)}
        required
      />

      <br /><br />
      <button type="submit">Add Sweet</button>
    </form>
  );
};

export default AddSweetForm;
