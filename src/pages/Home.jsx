import { motion } from 'framer-motion';
import { ArrowRight, Heart, Gift, Truck } from 'lucide-react';
import './Home.css';

const services = [
  {
    icon: <Heart size={32} />,
    title: 'Arreglos Personalizados',
    description: 'Creamos el ramo perfecto para cada ocasión, adaptado a tus gustos y presupuesto.'
  },
  {
    icon: <Gift size={32} />,
    title: 'Regalos Especiales',
    description: 'Complementa tus flores con chocolates, peluches y detalles únicos.'
  },
  {
    icon: <Truck size={32} />,
    title: 'Entregas a Domicilio',
    description: 'Envíos rápidos y seguros para que tus sorpresas lleguen a tiempo.'
  }
];

const mockProducts = [
  { id: 1, name: 'Ramo Primaveral', price: 450, image: 'https://images.unsplash.com/photo-1563241598-6dc3a964063f?q=80&w=600&auto=format&fit=crop' },
  { id: 2, name: 'Rosas Eternas', price: 800, image: 'https://images.unsplash.com/photo-1582791694770-bd600642cebf?q=80&w=600&auto=format&fit=crop' },
  { id: 3, name: 'Caja de Tulipanes', price: 650, image: 'https://images.unsplash.com/photo-1520764816124-749e7552debc?q=80&w=600&auto=format&fit=crop' },
];

function Home() {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-container">
          <motion.div 
            className="hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="badge">Nueva Colección</span>
            <h1 className="heading text-gradient hero-title">
              Expresa tus sentimientos con flores
            </h1>
            <p className="hero-subtitle">
              Arreglos florales únicos y entregas a domicilio en toda la ciudad. 
              En Florería Ash, hacemos que cada momento sea especial.
            </p>
            <div className="hero-actions">
              <button className="btn btn-primary">
                Comprar Ahora <ArrowRight size={20} />
              </button>
              <button className="btn btn-outline">
                Servicios
              </button>
            </div>
          </motion.div>
          <motion.div 
            className="hero-image-wrapper"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img 
              src="/hero.png" 
              alt="Arreglo Floral" 
              className="hero-image"
            />
            <div className="blob"></div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" className="services section">
        <div className="container">
          <div className="section-header">
            <h2 className="heading text-gradient">Nuestros Servicios</h2>
            <p>Todo lo que necesitas para sorprender a esa persona especial</p>
          </div>
          <div className="services-grid">
            {services.map((service, index) => (
              <motion.div 
                key={index} 
                className="service-card"
                whileHover={{ y: -10 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="service-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="arreglos" className="products section bg-light">
        <div className="container">
          <div className="section-header">
            <h2 className="heading text-gradient">Arreglos Destacados</h2>
            <p>Los favoritos de nuestros clientes</p>
          </div>
          <div className="products-grid">
            {mockProducts.map((product, index) => (
              <motion.div 
                key={product.id} 
                className="product-card"
                whileHover={{ y: -10 }}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="product-image-container">
                  <img src={product.image} alt={product.name} className="product-image" />
                  <button className="add-to-cart-btn btn btn-primary">
                    Agregar
                  </button>
                </div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <span className="product-price">${product.price} MXN</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
