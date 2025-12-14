import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

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

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div
      style={{
        padding: 20,
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #fceabb 0%, #f8b500 100%)',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      {/* HEADER */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 20,
        }}
      >
        <h2 style={{ color: '#6b1d63' }}>Sweet Shop Dashboard 🍬</h2>

        <button
          onClick={logout}
          style={{
            padding: '8px 16px',
            backgroundColor: '#ff4d6d',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          Logout
        </button>
      </div>

      <SweetSearch onSearch={searchSweets} />

      {user?.role === 'admin' && (
        <button
          onClick={() => {
            setModalSweetId(undefined);
            setIsModalOpen(true);
          }}
          style={{
            margin: '10px 0',
            padding: '10px 20px',
            backgroundColor: '#ff7eb9',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          Add New Sweet
        </button>
      )}

      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: 20,
          marginTop: 20,
        }}
      >
        {sweets.map((sweet) => (
          <div
            key={sweet.id}
            style={{
              background: '#fff1f3',
              padding: 20,
              borderRadius: 12,
              boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            }}
          >
            {sweet.image_url && (
              <img
                src={sweet.image_url}
                alt={sweet.name}
                style={{
                  width: '100%',
                  height: 150,
                  objectFit: 'cover',
                  borderRadius: 12,
                }}
              />
            )}

            <h3
              style={{ color: '#ff4d6d', cursor: 'pointer' }}
              onClick={() => setSelectedSweet(sweet)}
            >
              {sweet.name}
            </h3>

            <p><b>Price:</b> ₹{sweet.price}</p>
            <p><b>Quantity:</b> {sweet.quantity}</p>

            <button
              onClick={() => purchaseSweet(sweet.id)}
              disabled={sweet.quantity === 0}
              style={{
                padding: '6px 12px',
                backgroundColor: '#ff9f1c',
                color: '#fff',
                border: 'none',
                borderRadius: 6,
                cursor: 'pointer',
              }}
            >
              Purchase
            </button>

            {user?.role === 'admin' && (
              <>
                <button
                  onClick={() => deleteSweet(sweet.id)}
                  style={{
                    marginLeft: 8,
                    padding: '6px 12px',
                    backgroundColor: '#ff4d6d',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 6,
                    cursor: 'pointer',
                  }}
                >
                  Delete
                </button>

                <button
                  onClick={() => {
                    setModalSweetId(sweet.id);
                    setIsModalOpen(true);
                  }}
                  style={{
                    marginLeft: 8,
                    padding: '6px 12px',
                    backgroundColor: '#28c76f',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 6,
                    cursor: 'pointer',
                  }}
                >
                  Restock
                </button>
              </>
            )}
          </div>
        ))}
      </div>

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
