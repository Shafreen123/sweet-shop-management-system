import { useEffect, useState, useContext } from 'react';
import api from '../api/api';
import { AuthContext } from '../context/AuthContext';

interface Sweet {
  _id: string;
  name: string;
  price: number;
  quantity: number;
}

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [sweets, setSweets] = useState<Sweet[]>([]);
  const [error, setError] = useState('');

  const fetchSweets = async () => {
    try {
      const res = await api.get('/sweets');
      setSweets(res.data);
    } catch (err) {
      setError('Failed to load sweets');
    }
  };

  useEffect(() => {
    fetchSweets();
  }, []);

  const purchaseSweet = async (id: string) => {
    try {
      await api.post(`/sweets/purchase/${id}`);
      fetchSweets();
    } catch (err) {
      alert('Purchase failed');
    }
  };

  const deleteSweet = async (id: string) => {
    if (!window.confirm('Delete this sweet?')) return;
    try {
      await api.delete(`/sweets/${id}`);
      fetchSweets();
    } catch (err) {
      alert('Delete failed');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Sweet Shop Dashboard 🍬</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

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
          {sweets.map(sweet => (
            <tr key={sweet._id}>
              <td>{sweet.name}</td>
              <td>{sweet.price}</td>
              <td>{sweet.quantity}</td>
              <td>
                {sweet.quantity > 0 && (
                  <button onClick={() => purchaseSweet(sweet._id)}>
                    Purchase
                  </button>
                )}

                {user?.role === 'admin' && (
                  <button
                    style={{ marginLeft: 10, color: 'red' }}
                    onClick={() => deleteSweet(sweet._id)}
                  >
                    Delete
                  </button>
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
