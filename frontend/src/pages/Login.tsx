import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../api/api';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await api.post('/auth/login', { email, password });
      login(res.data.user, res.data.token);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(to right, #6a11cb, #2575fc)',
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
        <h2 style={{ marginBottom: 20, color: '#2575fc' }}>🍬 Sweet Shop Login</h2>

        {error && <p style={{ color: 'red', marginBottom: 15 }}>{error}</p>}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column' }}>
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
              background: 'linear-gradient(to right, #6a11cb, #2575fc)',
              color: 'white',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: 16,
            }}
          >
            Login
          </button>
        </form>

        <p style={{ marginTop: 15, fontSize: 14 }}>
          New user?{' '}
          <span
            style={{ color: '#2575fc', cursor: 'pointer', fontWeight: 'bold' }}
            onClick={() => navigate('/register')}
          >
            Register here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
