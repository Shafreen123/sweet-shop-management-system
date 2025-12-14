import { useEffect, useState, useContext } from 'react';
import api from '../api/api';
import SweetSearch from '../components/SweetSearch';
import AddSweetForm from '../components/AddSweetForm';
import { AuthContext } from '../context/AuthContext';

interface Sweet {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [sweets, setSweets] = useState<Sweet[]>([]);
  const [error, setError] = useState('');

  // Fetch all sweets
  const fetchSweets = async () => {
    try {
      const res = await api.get('/sweets');
      setSweets(res.data);
    } catch (err: any) {
      setError(err.message || 'Failed to load sweets');
    }
  };

  useEffect(() => {
    fetchSweets();
  }, []);

  // Search & filter sweets
  const searchSweets = async (params: any) => {
    try {
      const res = await api.get('/sweets/search', { params });
      setSweets(res.data);
    } catch (err: any) {
      alert(err.message || 'Search failed');
    }
  };

  // Purchase sweet
  const purchaseSweet = async (id: number) => {
    try {
      await api.post(`/sweets/${id}/purchase`, { quantity: 1 });
      fetchSweets();
    } catch (err: any) {
      alert(err.response?.data?.error || 'Purchase failed');
    }
  };

  // Delete sweet (admin only)
  const deleteSweet = async (id: number) => {
    if (!window.confirm('Delete this sweet?')) return;
    try {
      await api.delete(`/sweets/${id}`);
      fetchSweets();
    } catch (err: any) {
      alert(err.response?.data?.error || 'Delete failed');
    }
  };

  // Restock sweet (admin only)
  const restockSweet = async (id: number) => {
    const qty = parseInt(prompt('Enter quantity to restock:', '1') || '0');
    if (qty <= 0) return;

    try {
      await api.post(`/sweets/${id}/restock`, { quantity: qty });
      fetchSweets();
    } catch (err: any) {
      alert(err.response?.data?.error || 'Restock failed');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Sweet Shop Dashboard 🍬</h2>

      {/* Search & Filter */}
      <SweetSearch onSearch={searchSweets} />

      {/* Admin: Add Sweet */}
      {user?.role === 'admin' && <AddSweetForm onSweetAdded={fetchSweets} />}

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Sweets Table */}
      <table width="100%" border={1} cellPadding={10}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price (₹)</th>
            <th>Quantity</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {sweets.map((sweet) => (
            <tr key={sweet.id}>
              <td>{sweet.name}</td>
              <td>{sweet.price}</td>
              <td>{sweet.quantity}</td>
              <td>
                <button
                  onClick={() => purchaseSweet(sweet.id)}
                  disabled={sweet.quantity === 0}
                >
                  Purchase
                </button>

                {user?.role === 'admin' && (
                  <>
                    <button
                      style={{ marginLeft: 10, color: 'red' }}
                      onClick={() => deleteSweet(sweet.id)}
                    >
                      Delete
                    </button>
                    <button
                      style={{ marginLeft: 10, color: 'green' }}
                      onClick={() => restockSweet(sweet.id)}
                    >
                      Restock
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
