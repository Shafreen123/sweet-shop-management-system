import { useEffect, useState, useContext } from 'react';
import api from '../api/api';
import SweetSearch from '../components/SweetSearch';
import AddSweetModal from '../components/AddSweetModal';
import SweetDetailsModal from '../components/SweetDetailsModal';
import { AuthContext } from '../context/AuthContext';

interface Sweet {
  id: number;
  name: string;
  price: number;
  quantity: number;
  category?: string;
  description?: string;
  image_url?: string;
}

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [sweets, setSweets] = useState<Sweet[]>([]);
  const [error, setError] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSweetId, setModalSweetId] = useState<number | undefined>(undefined);
  const [selectedSweet, setSelectedSweet] = useState<Sweet | null>(null);

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

  const searchSweets = async (params: any) => {
    try {
      const res = await api.get('/sweets/search', { params });
      setSweets(res.data);
    } catch (err: any) {
      alert(err.message || 'Search failed');
    }
  };

  const purchaseSweet = async (id: number) => {
    try {
      await api.post(
        `/sweets/${id}/purchase`,
        { quantity: 1 },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      fetchSweets();
    } catch (err: any) {
      alert(err.response?.data?.error || 'Purchase failed');
    }
  };

  const deleteSweet = async (id: number) => {
    if (!window.confirm('Delete this sweet?')) return;
    try {
      await api.delete(`/sweets/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      fetchSweets();
    } catch (err: any) {
      alert(err.response?.data?.error || 'Delete failed');
    }
  };

  const openRestockModal = (id: number) => {
    setModalSweetId(id);
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    setModalSweetId(undefined);
    setIsModalOpen(true);
  };

  const openDetailsModal = (sweet: Sweet) => {
    setSelectedSweet(sweet);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Sweet Shop Dashboard 🍬</h2>

      <SweetSearch onSearch={searchSweets} />

      {user?.role === 'admin' && (
        <button
          onClick={openAddModal}
          style={{
            margin: '10px 0',
            padding: '8px 16px',
            backgroundColor: '#2196f3',
            color: '#fff',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer',
          }}
        >
          Add New Sweet
        </button>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <table width="100%" border={1} cellPadding={10} style={{ borderCollapse: 'collapse' }}>
        <thead style={{ fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>
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
              <td
                style={{ cursor: 'pointer', textDecoration: 'underline', color: '#2196f3' }}
                onClick={() => openDetailsModal(sweet)}
              >
                {sweet.name}
              </td>
              <td>{sweet.price}</td>
              <td>{sweet.quantity}</td>
              <td>
                <button
                  onClick={() => purchaseSweet(sweet.id)}
                  disabled={sweet.quantity === 0}
                  style={{ padding: '4px 8px', cursor: 'pointer' }}
                >
                  Purchase
                </button>

                {user?.role === 'admin' && (
                  <>
                    <button
                      style={{ marginLeft: 10, color: 'red', padding: '4px 8px', cursor: 'pointer' }}
                      onClick={() => deleteSweet(sweet.id)}
                    >
                      Delete
                    </button>
                    <button
                      style={{ marginLeft: 10, color: 'green', padding: '4px 8px', cursor: 'pointer' }}
                      onClick={() => openRestockModal(sweet.id)}
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

      <AddSweetModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSweetAdded={fetchSweets}
        sweetId={modalSweetId}
      />

      {selectedSweet && (
        <SweetDetailsModal
          sweet={selectedSweet}
          onClose={() => setSelectedSweet(null)}
        />
      )}
    </div>
  );
};

export default Dashboard;
