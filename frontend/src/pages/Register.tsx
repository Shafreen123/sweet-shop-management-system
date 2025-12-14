import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../api/api';

const Register = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // After registration, auto-login

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await api.post('/auth/register', { name, email, password });
      login(res.data.user, res.data.token); // Auto-login after registration
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(to right, #ff758c, #ff7eb3)',
        padding: 20,
      }}
    >
      <div
        style={{
          background: 'white',
          padding: '40px 30px',
          borderRadius: 12,
          width: 350,
          boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
          textAlign: 'center',
        }}
      >
        <h2 style={{ marginBottom: 20, color: '#ff7eb3' }}>🍭 Sweet Shop Register</h2>

        {error && <p style={{ color: 'red', marginBottom: 15 }}>{error}</p>}

        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column' }}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{
              padding: 10,
              marginBottom: 15,
              borderRadius: 6,
              border: '1px solid #ccc',
              fontSize: 14,
            }}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              padding: 10,
              marginBottom: 15,
              borderRadius: 6,
              border: '1px solid #ccc',
              fontSize: 14,
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              padding: 10,
              marginBottom: 20,
              borderRadius: 6,
              border: '1px solid #ccc',
              fontSize: 14,
            }}
          />

          <button
            type="submit"
            style={{
              padding: 10,
              borderRadius: 6,
              border: 'none',
              background: 'linear-gradient(to right, #ff758c, #ff7eb3)',
              color: 'white',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: 16,
            }}
          >
            Register
          </button>
        </form>

        <p style={{ marginTop: 15, fontSize: 14 }}>
          Already have an account?{' '}
          <span
            style={{ color: '#ff7eb3', cursor: 'pointer', fontWeight: 'bold' }}
            onClick={() => navigate('/login')}
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
