import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';
import { useContext } from 'react';

const PrivateRoute = ({ children, adminOnly = false }: any) => {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/login" />;
  if (adminOnly && user.role !== 'admin') return <Navigate to="/" />;
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />
          <Route path="/admin" element={
            <PrivateRoute adminOnly>
              <AdminPanel />
            </PrivateRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
