import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ManageContent from './pages/ManageContent';
import Placeholder from './pages/Placeholder';

function App() {
  // Check if token exists in localStorage
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        {isAuthenticated ? (
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="content" element={<ManageContent />} />
            
            {/* Catch-all for all other admin routes (Placeholder) */}
            <Route path="*" element={<Placeholder title="Module Under Construction" />} />
          </Route>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
