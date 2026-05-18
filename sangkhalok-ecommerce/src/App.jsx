import { useState } from 'react'
import './App.css'

const PRODUCTS = [
  {
    id: 1,
    name: "Sukhothai Twin Fish Bowl",
    description: "A masterfully crafted celadon bowl featuring the traditional twin fish underglaze motif, symbolizing abundance and prosperity.",
    price: 3500,
    image: "/sangkhalok_bowl_1779114178357.png"
  },
  {
    id: 2,
    name: "Royal Celadon Vase",
    description: "An elegant, tall vase with intricate floral carvings. The deep celadon glaze perfectly captures the light, creating a stunning centerpiece.",
    price: 8900,
    image: "/sangkhalok_vase_1779114369931.png"
  },
  {
    id: 3,
    name: "Heritage Ceramic Plate",
    description: "A beautifully detailed serving plate with traditional Sukhothai patterns. Ideal for display or adding elegance to fine dining.",
    price: 2800,
    image: "/sangkhalok_bowl_1779114178357.png" // Reusing bowl image as a placeholder for the 3rd item
  }
];

function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutStatus, setCheckoutStatus] = useState(null); // null, 'processing', 'success'

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQ = item.quantity + delta;
        return { ...item, quantity: newQ > 0 ? newQ : 1 };
      }
      return item;
    }));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    setCheckoutStatus('processing');
    setTimeout(() => {
      setCheckoutStatus('success');
      setCart([]);
      setTimeout(() => {
        setCheckoutStatus(null);
        setIsCartOpen(false);
      }, 3000);
    }, 1500);
  };

  return (
    <div className="app-container">
      {/* Navigation */}
      <nav className="glass navbar">
        <div className="logo">
          <h1>SANGKHALOK <span>สุโขทัย</span></h1>
        </div>
        <button className="cart-btn" onClick={() => setIsCartOpen(true)}>
          Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})
        </button>
      </nav>

      {/* Hero Section */}
      <header className="hero">
        <div className="hero-bg" style={{ backgroundImage: `url('/sangkhalok_hero_1779114127450.png')` }}>
          <div className="overlay"></div>
        </div>
        <div className="hero-content">
          <h2 className="fade-in-up">The Legacy of Sukhothai</h2>
          <p className="fade-in-up delay-1">Discover premium, handcrafted celadon ceramics honoring centuries of Thai artistry.</p>
          <button className="btn-primary fade-in-up delay-2" onClick={() => document.getElementById('products').scrollIntoView({ behavior: 'smooth' })}>
            Explore Collection
          </button>
        </div>
      </header>

      {/* Product Grid */}
      <main id="products" className="products-section">
        <div className="section-header">
          <h2>Curated Masterpieces</h2>
          <div className="divider"></div>
        </div>
        <div className="grid">
          {PRODUCTS.map(product => (
            <div key={product.id} className="glass product-card">
              <div className="img-container">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="desc">{product.description}</p>
                <div className="price-row">
                  <span className="price">฿{product.price.toLocaleString()}</span>
                  <button className="btn-outline" onClick={() => addToCart(product)}>Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="glass footer">
        <p>© 2026 Sangkhalok Sukhothai. All rights reserved.</p>
      </footer>

      {/* Cart Drawer */}
      <div className={`cart-overlay ${isCartOpen ? 'open' : ''}`} onClick={() => setIsCartOpen(false)}></div>
      <div className={`glass cart-drawer ${isCartOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2>Your Cart</h2>
          <button className="close-btn" onClick={() => setIsCartOpen(false)}>×</button>
        </div>
        
        <div className="cart-body">
          {checkoutStatus === 'success' ? (
            <div className="success-message">
              <div className="check-circle">✓</div>
              <h3>Order Placed Successfully!</h3>
              <p>Thank you for preserving the heritage.</p>
            </div>
          ) : cart.length === 0 ? (
            <div className="empty-cart">
              <p>Your cart is empty.</p>
            </div>
          ) : (
            <div className="cart-items">
              {cart.map(item => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} />
                  <div className="item-details">
                    <h4>{item.name}</h4>
                    <p className="item-price">฿{item.price.toLocaleString()}</p>
                    <div className="qty-controls">
                      <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                    </div>
                  </div>
                  <button className="remove-btn" onClick={() => removeFromCart(item.id)}>×</button>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && checkoutStatus !== 'success' && (
          <div className="cart-footer">
            <div className="total-row">
              <span>Total</span>
              <span className="total-price">฿{cartTotal.toLocaleString()}</span>
            </div>
            <button 
              className={`btn-primary checkout-btn ${checkoutStatus === 'processing' ? 'processing' : ''}`}
              onClick={handleCheckout}
              disabled={checkoutStatus === 'processing'}
            >
              {checkoutStatus === 'processing' ? 'Processing...' : 'Checkout'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
