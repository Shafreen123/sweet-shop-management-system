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
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: 'white',
          padding: 20,
          borderRadius: 8,
          width: 400,
          maxHeight: '80vh',
          overflowY: 'auto',
        }}
      >
        <h2>{sweet.name}</h2>
        {sweet.image_url && (
          <img src={sweet.image_url} alt={sweet.name} style={{ width: '100%', borderRadius: 8 }} />
        )}
        <p><b>Price:</b> ₹{sweet.price}</p>
        <p><b>Quantity:</b> {sweet.quantity}</p>
        {sweet.category && <p><b>Category:</b> {sweet.category}</p>}
        {sweet.description && <p><b>Description:</b> {sweet.description}</p>}

        <button onClick={onClose} style={{ marginTop: 10 }}>
          Close
        </button>
      </div>
    </div>
  );
};

export default SweetDetailsModal;
