import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { motion } from 'framer-motion';
import { Flower } from 'lucide-react';
import './Auth.css';

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [isSignUp, setIsSignUp] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              role: role,
            }
          }
        });
        if (error) throw error;
        setMessage({ text: 'Revisa tu correo para el enlace de confirmación!', type: 'success' });
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        setMessage({ text: '¡Inicio de sesión exitoso!', type: 'success' });
      }
    } catch (error) {
      setMessage({ text: error.error_description || error.message, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <motion.div 
        className="auth-box"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="auth-header">
          <div className="auth-icon">
            <Flower size={40} color="var(--primary)" />
          </div>
          <h2 className="heading">{isSignUp ? 'Crear Cuenta' : 'Iniciar Sesión'}</h2>
          <p>Bienvenido a Florería Ash</p>
        </div>

        <form onSubmit={handleAuth} className="auth-form">
          <div className="input-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              id="email"
              className="auth-input"
              type="email"
              placeholder="tu@correo.com"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              className="auth-input"
              type="password"
              placeholder="Tu contraseña"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          {isSignUp && (
            <div className="input-group">
              <label htmlFor="role">Rol</label>
              <select
                id="role"
                className="auth-input"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="user">Usuario</option>
                <option value="admin">Administrador</option>
              </select>
            </div>
          )}
          
          <button className="btn btn-primary auth-submit" disabled={loading}>
            {loading ? 'Cargando...' : isSignUp ? 'Registrarse' : 'Iniciar Sesión'}
          </button>
        </form>

        {message.text && (
          <div className={`auth-message ${message.type}`}>
            {message.text}
          </div>
        )}

        <div className="auth-toggle">
          <button type="button" onClick={() => setIsSignUp(!isSignUp)} className="text-primary">
            {isSignUp ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
