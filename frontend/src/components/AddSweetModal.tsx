import React, { useState, useEffect } from 'react';
import api from '../api/api';

interface AddSweetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSweetAdded: () => void;
  sweetId?: number; // if defined → restock, else → add new sweet
}

const AddSweetModal: React.FC<AddSweetModalProps> = ({ isOpen, onClose, onSweetAdded, sweetId }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1); // for adding sweet
  const [restockQuantity, setRestockQuantity] = useState<number>(1);

  useEffect(() => {
    if (!sweetId) {
      setName('');
      setPrice(0);
      setQuantity(1);
    }
  }, [sweetId, isOpen]);

  if (!isOpen) return null;

  const handleAddSweet = async () => {
    try {
      if (sweetId) {
        // Restock sweet
        await api.post(
          `/sweets/${sweetId}/restock`,
          { quantity: restockQuantity },
          { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
        );
      } else {
        // Add new sweet
        await api.post(
          '/sweets',
          { name, price, quantity },
          { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
        );
      }

      onSweetAdded();
      onClose();
    } catch (err: any) {
      alert(err.response?.data?.error || 'Operation failed');
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}
    >
      <div style={{ background: 'white', padding: 20, borderRadius: 8, width: 400 }}>
        {sweetId ? <h3>Restock Sweet</h3> : <h3>Add New Sweet</h3>}

        {!sweetId && (
          <>
            <input
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ width: '100%', marginBottom: 10 }}
            />
            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              style={{ width: '100%', marginBottom: 10 }}
            />
            <input
              type="number"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              style={{ width: '100%', marginBottom: 10 }}
            />
          </>
        )}

        {sweetId && (
          <input
            type="number"
            placeholder="Quantity to restock"
            value={restockQuantity}
            onChange={(e) => setRestockQuantity(Number(e.target.value))}
            style={{ width: '100%', marginBottom: 10 }}
          />
        )}

        <button onClick={handleAddSweet} style={{ marginRight: 10 }}>
          {sweetId ? 'Restock' : 'Add'}
        </button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default AddSweetModal;
