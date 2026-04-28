import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, User, LogOut } from 'lucide-react';
import { supabase } from '../lib/supabase';
import './Navbar.css';

function Navbar() {
  const [session, setSession] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsAdmin(session?.user?.user_metadata?.role === 'admin');
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setIsAdmin(session?.user?.user_metadata?.role === 'admin');
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <nav className="navbar glass">
      <div className="container navbar-container">
        <Link to="/" className="brand">
          <span className="brand-text text-gradient">Florería Ash</span>
        </Link>
        <div className="nav-links">
          <Link to="/" className="nav-link">Inicio</Link>
          <Link to="/#servicios" className="nav-link">Servicios</Link>
          <Link to="/#arreglos" className="nav-link">Arreglos</Link>
          {isAdmin && (
            <Link to="/admin" className="nav-link text-gradient" style={{ fontWeight: 'bold' }}>Panel Admin</Link>
          )}
        </div>
        <div className="nav-actions">
          <button className="icon-btn">
            <ShoppingBag size={24} color="var(--primary)" />
          </button>
          
          {session ? (
            <button onClick={handleLogout} className="icon-btn" title="Cerrar sesión">
              <LogOut size={24} color="var(--primary)" />
            </button>
          ) : (
            <Link to="/auth" className="icon-btn" title="Iniciar sesión">
              <User size={24} color="var(--primary)" />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
