import React from 'react';

interface SweetDetailsModalProps {
  sweet: {
    name: string;
    price: number;
    quantity: number;
    category?: string;
    description?: string;
    image_url?: string;
  };
  onClose: () => void;
}

const SweetDetailsModal: React.FC<SweetDetailsModalProps> = ({ sweet, onClose }) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.7)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: 'linear-gradient(135deg, #232526, #414345)',
          padding: 25,
          borderRadius: 12,
          width: 400,
          maxHeight: '80vh',
          overflowY: 'auto',
          color: '#fff',
          boxShadow: '0 8px 20px rgba(0,0,0,0.4)',
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: 15 }}>{sweet.name}</h2>

        {sweet.image_url && (
          <img
            src={sweet.image_url}
            alt={sweet.name}
            style={{
              width: '100%',
              borderRadius: 8,
              marginBottom: 15,
              border: '2px solid #fff',
            }}
          />
        )}

        <p><b>Price:</b> ₹{sweet.price}</p>
        <p><b>Quantity:</b> {sweet.quantity}</p>
        {sweet.category && <p><b>Category:</b> {sweet.category}</p>}
        {sweet.description && <p><b>Description:</b> {sweet.description}</p>}

        <button
          onClick={onClose}
          style={{
            marginTop: 20,
            width: '100%',
            padding: '10px 0',
            background: 'linear-gradient(135deg, #f6d365, #fda085)',
            border: 'none',
            borderRadius: 8,
            fontWeight: 'bold',
            cursor: 'pointer',
            color: '#fff',
            transition: 'transform 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SweetDetailsModal;
