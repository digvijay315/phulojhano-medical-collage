import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import api from '../api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/auth/login', { email, password });
      const data = response.data;
      
      if (data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('admin', JSON.stringify(data.admin));
        window.location.href = '/';
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Server connection failed. Is the backend running?');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-background font-sans">
      {/* Left Side: Image */}
      <div className="hidden lg:block lg:w-1/2 relative bg-primary">
        <img 
          src="https://dumkamedicalcollege.org/wp-content/uploads/2026/08/IMG_3621.JPG.jpeg" 
          alt="Phulo Jhano Medical College Hospital" 
          className="absolute inset-0 w-full h-full object-cover opacity-60 "
        />
        {/* <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div> */}
        <div className="absolute bottom-12 left-12 right-12 text-white">
          {/* <div className="mb-6 h-20 w-20 bg-white rounded-full p-1 shadow-lg">
             <img src="/logo.webp" alt="Logo" className="w-full h-full object-contain" />
          </div> */}
          <h2 className="text-4xl font-serif font-bold mb-4 leading-tight">Phulo Jhano Medical College & Hospital</h2>
          <p className="text-lg text-white/80 max-w-md">Empowering healthcare and education in Santhal Pargana region. Access your admin tools securely.</p>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-muted/10 min-h-screen">
        <div className="bg-card w-full max-w-md rounded-2xl shadow-xl border border-border p-8 lg:p-10 relative overflow-hidden">
          {/* Subtle background decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10"></div>
          
          <div className="text-center mb-8">
            <div className=" mx-auto h-16 w-16 items-center justify-center rounded-full bg-white overflow-hidden p-1 mb-4 shadow-sm border border-border">
              <img src="/logo.webp" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <h1 className="text-3xl font-serif font-bold text-foreground">Admin Portal</h1>
            <p className="text-muted-foreground mt-2 text-sm">Sign in to manage your institution</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {error && <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-lg border border-destructive/20">{error}</div>}
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="admin@gmail.com"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-primary-foreground font-medium py-3 rounded-lg hover:bg-primary/90 transition-colors mt-6 shadow-md disabled:opacity-70 flex justify-center items-center"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </>
              ) : 'Sign In to Dashboard'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
