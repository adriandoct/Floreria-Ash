import { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, ShoppingBag, Users, Settings } from 'lucide-react';
import AdminProducts from '../components/AdminProducts';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('orders');

  return (
    <div className="admin-dashboard container section">
      <div className="admin-header">
        <h1 className="heading text-gradient">Panel de Administrador</h1>
        <p>Gestiona tu tienda, pedidos y catálogo de productos.</p>
      </div>

      <div className="admin-layout">
        <aside className="admin-sidebar">
          <button 
            className={`admin-nav-item ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            <ShoppingBag size={20} /> Pedidos
          </button>
          <button 
            className={`admin-nav-item ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            <Package size={20} /> Catálogo
          </button>
          <button 
            className={`admin-nav-item ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            <Users size={20} /> Clientes
          </button>
          <button 
            className={`admin-nav-item ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <Settings size={20} /> Ajustes
          </button>
        </aside>

        <main className="admin-content">
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'orders' && (
              <div className="admin-panel">
                <h2>Últimos Pedidos</h2>
                <div className="empty-state">
                  <p>Aún no hay pedidos recientes. ¡Pronto llegarán!</p>
                </div>
              </div>
            )}
            
            {activeTab === 'products' && (
              <AdminProducts />
            )}

            {activeTab === 'users' && (
              <div className="admin-panel">
                <h2>Clientes Registrados</h2>
                <div className="empty-state">
                  <p>Gestión de usuarios en desarrollo.</p>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="admin-panel">
                <h2>Ajustes de la Tienda</h2>
                <div className="empty-state">
                  <p>Configuración general en desarrollo.</p>
                </div>
              </div>
            )}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
