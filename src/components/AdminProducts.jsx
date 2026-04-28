import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Edit2, Trash2, Plus, X } from 'lucide-react';
import './AdminProducts.css';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', price: '', image: '', inventory: '' });

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    setLoading(true);
    const { data, error } = await supabase.from('products').select('*').order('id', { ascending: true });
    if (!error && data) {
      setProducts(data);
    }
    setLoading(false);
  }

  function handleOpenModal(product = null) {
    if (product) {
      setEditingProduct(product);
      setFormData({ name: product.name, price: product.price, image: product.image, inventory: product.inventory });
    } else {
      setEditingProduct(null);
      setFormData({ name: '', price: '', image: '', inventory: '' });
    }
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setEditingProduct(null);
  }

  async function handleSave(e) {
    e.preventDefault();
    const productData = {
      name: formData.name,
      price: parseFloat(formData.price),
      image: formData.image,
      inventory: parseInt(formData.inventory, 10),
    };

    if (editingProduct) {
      const { error } = await supabase.from('products').update(productData).eq('id', editingProduct.id);
      if (!error) fetchProducts();
    } else {
      const { error } = await supabase.from('products').insert([productData]);
      if (!error) fetchProducts();
    }
    handleCloseModal();
  }

  async function handleDelete(id) {
    if (window.confirm('¿Seguro que deseas eliminar este producto?')) {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (!error) fetchProducts();
    }
  }

  return (
    <div className="admin-products">
      <div className="panel-header">
        <h2>Gestión de Catálogo</h2>
        <button className="btn btn-primary" onClick={() => handleOpenModal()}>
          <Plus size={20} /> Agregar Producto
        </button>
      </div>

      {loading ? (
        <p>Cargando productos...</p>
      ) : products.length === 0 ? (
        <div className="empty-state">
          <p>No hay productos en el catálogo. ¡Agrega el primero!</p>
        </div>
      ) : (
        <div className="products-table-container">
          <table className="products-table">
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Inventario</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id}>
                  <td>
                    <img src={p.image} alt={p.name} className="admin-product-img" />
                  </td>
                  <td>{p.name}</td>
                  <td>${p.price}</td>
                  <td>{p.inventory}</td>
                  <td className="actions-cell">
                    <button className="icon-btn edit" onClick={() => handleOpenModal(p)}>
                      <Edit2 size={18} />
                    </button>
                    <button className="icon-btn delete" onClick={() => handleDelete(p.id)}>
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-modal" onClick={handleCloseModal}><X size={24} /></button>
            <h3>{editingProduct ? 'Editar Producto' : 'Nuevo Producto'}</h3>
            <form onSubmit={handleSave} className="admin-form">
              <div className="input-group">
                <label>Nombre del Arreglo</label>
                <input 
                  type="text" 
                  required 
                  value={formData.name} 
                  onChange={e => setFormData({...formData, name: e.target.value})} 
                />
              </div>
              <div className="input-group">
                <label>Precio (MXN)</label>
                <input 
                  type="number" 
                  step="0.01" 
                  required 
                  value={formData.price} 
                  onChange={e => setFormData({...formData, price: e.target.value})} 
                />
              </div>
              <div className="input-group">
                <label>URL de Imagen</label>
                <input 
                  type="url" 
                  required 
                  value={formData.image} 
                  onChange={e => setFormData({...formData, image: e.target.value})} 
                />
              </div>
              <div className="input-group">
                <label>Inventario (Unidades)</label>
                <input 
                  type="number" 
                  required 
                  value={formData.inventory} 
                  onChange={e => setFormData({...formData, inventory: e.target.value})} 
                />
              </div>
              <button type="submit" className="btn btn-primary full-width">
                Guardar Producto
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
