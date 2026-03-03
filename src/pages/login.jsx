import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const data = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', data.token); //objeto clave-valor
      navigate('/productos');
    } catch (err) {
      setError('Credenciales incorrectas. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#D8DDE6] p-6">
      <div className="w-full max-w-sm">
        <div className="bg-slate-900 text-white rounded-xl p-6 shadow-lg">
          <h1 className="text-2xl font-bold text-center">Login</h1>
          <p className="text-sm text-white/80 mt-1 text-center">Ingresa tus credenciales</p>

          {error && (
            <div className="mt-4 p-3 bg-red-500/20 border border-red-500 rounded-md text-sm text-red-200">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <input className="w-full rounded-md bg-white/10 placeholder-white/70 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500/60"
              type="email"
              placeholder="Correo electronico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input className="w-full rounded-md bg-white/10 placeholder-white/70 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500/60"
              type="password"
              placeholder="Contrasena"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed" 
            >
              {loading ? 'Cargando...' : 'Enviar'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}