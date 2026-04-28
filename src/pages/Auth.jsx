import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { motion } from 'framer-motion';
import { Flower } from 'lucide-react';
import './Auth.css';

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
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
          password: 'Password123!', // Dummy password for magic link / or we can add a password field.
        });
        if (error) throw error;
        setMessage({ text: 'Revisa tu correo para el enlace de confirmación!', type: 'success' });
      } else {
        const { error } = await supabase.auth.signInWithOtp({ email });
        if (error) throw error;
        setMessage({ text: '¡Enlace mágico enviado a tu correo!', type: 'success' });
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
          
          <button className="btn btn-primary auth-submit" disabled={loading}>
            {loading ? 'Cargando...' : isSignUp ? 'Registrarse' : 'Enviar Enlace Mágico'}
          </button>
        </form>

        {message.text && (
          <div className={`auth-message ${message.type}`}>
            {message.text}
          </div>
        )}

        <div className="auth-toggle">
          <button onClick={() => setIsSignUp(!isSignUp)} className="text-primary">
            {isSignUp ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
