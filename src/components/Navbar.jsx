import { Link } from 'react-router-dom';
import { ShoppingBag, User } from 'lucide-react';
import './Navbar.css';

function Navbar() {
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
        </div>
        <div className="nav-actions">
          <button className="icon-btn">
            <ShoppingBag size={24} color="var(--primary)" />
          </button>
          <Link to="/auth" className="icon-btn">
            <User size={24} color="var(--primary)" />
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
