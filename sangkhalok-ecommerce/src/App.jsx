import { useState } from 'react'
import './App.css'

const PRODUCTS = [
  {
    id: 1,
    name: "Sukhothai Twin Fish Bowl",
    category: "Celadon Tableware",
    description: "A masterfully crafted celadon bowl featuring the traditional twin fish underglaze motif, symbolizing abundance and prosperity.",
    fullDescription: "Hand-thrown by master artisans in Si Satchanalai, this signature bowl revives the 14th-century Sukhothai stoneware tradition. The twin fish motif is hand-painted with natural iron-oxide slip before being coated in a translucent wood-ash celadon glaze and fired at 1,280°C, producing its characteristic crackle texture and jade-green depth.",
    price: 3500,
    image: "/sangkhalok_bowl_1779114178357.png",
    specs: {
      dimensions: "Ø 22 cm × H 8.5 cm",
      material: "High-fired Sukhothai Stoneware & Wood-Ash Celadon Glaze",
      origin: "Si Satchanalai, Sukhothai",
      craftsmanship: "100% Hand-thrown & Hand-painted Underglaze"
    },
    initialComments: [
      {
        id: 101,
        author: "คุณพิมพ์ชนก ว.",
        rating: 5,
        date: "12 Oct 2026",
        text: "งานจริงสวยกว่าในรูปมากค่ะ เคลือบเซลาดอนเงางาม ลายปลาคู่คมชัด วางประดับโต๊ะอาหารแล้วดูหรูมาก แพ็กของมาแน่นหนาปลอดภัยดีมากค่ะ"
      },
      {
        id: 102,
        author: "Alexander M.",
        rating: 5,
        date: "5 Oct 2026",
        text: "Incredible craftsmanship. The crackle glaze catches the light beautifully and feels genuinely historic. Worth every baht."
      },
      {
        id: 103,
        author: "คุณณัฐพงศ์ ส.",
        rating: 4,
        date: "28 Sep 2026",
        text: "เนื้อดินเผาหนาและมีน้ำหนักดีมาก ซื้อเป็นของขวัญให้ผู้ใหญ่ ท่านชอบมากครับ"
      }
    ]
  },
  {
    id: 2,
    name: "Royal Celadon Vase",
    category: "Decorative Art Piece",
    description: "An elegant, tall vase with intricate floral carvings. The deep celadon glaze perfectly captures the light, creating a stunning centerpiece.",
    fullDescription: "Inspired by royal court vessels of the Sukhothai Kingdom, this tall baluster vase features deeply incised lotus petal and scrolling vine reliefs. As the natural celadon glaze pools into the carved recesses during kiln firing, it creates a luminous three-dimensional shading effect that shifts with the ambient light of your room.",
    price: 8900,
    image: "/sangkhalok_vase_1779114369931.png",
    specs: {
      dimensions: "Ø 16 cm × H 38 cm",
      material: "Refined River Clay & Jade Celadon Glaze",
      origin: "Mueang Kao, Sukhothai",
      craftsmanship: "Hand-carved Lotus Relief & Reduction Kiln Fired"
    },
    initialComments: [
      {
        id: 201,
        author: "คุณกัญญาณัฐ พ.",
        rating: 5,
        date: "15 Oct 2026",
        text: "ลายแกะสลักละเอียดปราณีตมากค่ะ สีเขียวหยกเวลาโดนแสงไฟในห้องรับแขกคือสวยสะกดตาจริงๆ คุ้มค่ามากค่ะ"
      },
      {
        id: 202,
        author: "คุณธนกฤต ร.",
        rating: 5,
        date: "2 Oct 2026",
        text: "ทรงแจกันสง่างามมาก งานฝีมือระดับพิพิธภัณฑ์เลยครับ ตั้งโชว์ในออฟฟิศมีแต่คนทัก"
      }
    ]
  },
  {
    id: 3,
    name: "Heritage Ceramic Plate",
    category: "Collector Display & Dining",
    description: "A beautifully detailed serving plate with traditional Sukhothai patterns. Ideal for display or adding elegance to fine dining.",
    fullDescription: "Designed for both collector display and elevated dining, this wide-rimmed heritage charger plate showcases concentric geometric borders framing a hand-brushed central medallion. Each piece undergoes a 36-hour firing and slow cooling cycle, ensuring remarkable durability alongside timeless Sukhothai aesthetics.",
    price: 2800,
    image: "/sangkhalok_plate.png",
    specs: {
      dimensions: "Ø 26 cm × H 4.2 cm",
      material: "Artisanal Stoneware & Natural Mineral Slip",
      origin: "Si Satchanalai, Sukhothai",
      craftsmanship: "Hand-brushed Iron Underglaze"
    },
    initialComments: [
      {
        id: 301,
        author: "คุณอรอนงค์ จ.",
        rating: 5,
        date: "14 Oct 2026",
        text: "ขนาดกำลังพอดีเลยค่ะ เอามาใส่ขาตั้งโชว์ในตู้กระจกสวยมาก ลายเส้นมีความคลาสสิกแบบงานปั้นมือแท้ๆ"
      },
      {
        id: 302,
        author: "Sophia L.",
        rating: 5,
        date: "29 Sep 2026",
        text: "Bought two of these plates for our dining table centerpiece. The glaze texture is extraordinary!"
      }
    ]
  }
];

function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutStatus, setCheckoutStatus] = useState(null); // null, 'processing', 'success'
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [detailQty, setDetailQty] = useState(1);

  // Comments state keyed by product ID
  const [commentsByProduct, setCommentsByProduct] = useState(() => {
    const initial = {};
    PRODUCTS.forEach(p => {
      initial[p.id] = p.initialComments;
    });
    return initial;
  });
  const [newCommentAuthor, setNewCommentAuthor] = useState('');
  const [newCommentText, setNewCommentText] = useState('');
  const [newCommentRating, setNewCommentRating] = useState(5);

  const addToCart = (product, qty = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + qty } : item);
      }
      return [...prev, { ...product, quantity: qty }];
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

  const openProductDetail = (product) => {
    setSelectedProduct(product);
    setDetailQty(1);
    setNewCommentAuthor('');
    setNewCommentText('');
    setNewCommentRating(5);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeProductDetail = () => {
    setSelectedProduct(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!selectedProduct || !newCommentText.trim()) return;

    const newEntry = {
      id: Date.now(),
      author: newCommentAuthor.trim() || 'ผู้เยี่ยมชม (Guest)',
      rating: newCommentRating,
      date: 'Just now',
      text: newCommentText.trim()
    };

    setCommentsByProduct(prev => ({
      ...prev,
      [selectedProduct.id]: [newEntry, ...(prev[selectedProduct.id] || [])]
    }));

    setNewCommentAuthor('');
    setNewCommentText('');
    setNewCommentRating(5);
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

  const currentComments = selectedProduct ? (commentsByProduct[selectedProduct.id] || []) : [];
  const averageRating = currentComments.length > 0
    ? (currentComments.reduce((sum, c) => sum + c.rating, 0) / currentComments.length).toFixed(1)
    : '5.0';

  return (
    <div className="app-container">
      {/* Navigation */}
      <nav className="glass navbar">
        <div className="logo" onClick={closeProductDetail} style={{ cursor: 'pointer' }}>
          <h1>SANGKHALOK <span>สุโขทัย</span></h1>
        </div>
        <button className="cart-btn" onClick={() => setIsCartOpen(true)}>
          Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})
        </button>
      </nav>

      {selectedProduct ? (
        /* Product Detail Page */
        <main className="product-detail-page fade-in-up">
          <div className="detail-top-bar">
            <button className="back-btn" onClick={closeProductDetail}>
              ← Back to Collection
            </button>
          </div>

          <section className="glass detail-main-card">
            <div className="detail-image-wrapper">
              <img src={selectedProduct.image} alt={selectedProduct.name} />
            </div>

            <div className="detail-content">
              <span className="detail-category">{selectedProduct.category}</span>
              <h2>{selectedProduct.name}</h2>

              <div className="detail-rating-row">
                <span className="stars">{'★'.repeat(Math.round(Number(averageRating)))}</span>
                <span className="rating-score">{averageRating}</span>
                <span className="rating-count">({currentComments.length} reviews)</span>
              </div>

              <div className="detail-price">฿{selectedProduct.price.toLocaleString()}</div>

              <p className="detail-description">{selectedProduct.fullDescription}</p>

              <div className="detail-specs">
                <h4>Craftsmanship & Specifications</h4>
                <div className="specs-grid">
                  <div className="spec-item">
                    <span className="spec-label">Dimensions</span>
                    <span className="spec-value">{selectedProduct.specs.dimensions}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Origin</span>
                    <span className="spec-value">{selectedProduct.specs.origin}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Material</span>
                    <span className="spec-value">{selectedProduct.specs.material}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Technique</span>
                    <span className="spec-value">{selectedProduct.specs.craftsmanship}</span>
                  </div>
                </div>
              </div>

              <div className="detail-actions">
                <div className="detail-qty">
                  <button onClick={() => setDetailQty(q => Math.max(1, q - 1))}>−</button>
                  <span>{detailQty}</span>
                  <button onClick={() => setDetailQty(q => q + 1)}>+</button>
                </div>
                <button
                  className="btn-primary detail-add-btn"
                  onClick={() => addToCart(selectedProduct, detailQty)}
                >
                  Add to Cart • ฿{(selectedProduct.price * detailQty).toLocaleString()}
                </button>
              </div>
            </div>
          </section>

          {/* Comments / Reviews Section */}
          <section className="comments-section">
            <div className="comments-header">
              <div>
                <h3>Customer Reviews & Comments</h3>
                <p className="comments-subtitle">ความคิดเห็นและรีวิวจากผู้สะสมงานสังคโลก ({currentComments.length})</p>
              </div>
              <div className="comments-summary-badge">
                <span className="big-star">★</span>
                <strong>{averageRating}</strong>
                <span>/ 5.0</span>
              </div>
            </div>

            {/* Write a Comment Form */}
            <form className="glass comment-form" onSubmit={handleAddComment}>
              <h4>Leave a Comment</h4>
              <div className="comment-form-top">
                <input
                  type="text"
                  placeholder="ชื่อของคุณ (Your Name)"
                  value={newCommentAuthor}
                  onChange={e => setNewCommentAuthor(e.target.value)}
                  className="comment-input"
                />
                <div className="rating-select">
                  <span>Rating:</span>
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      type="button"
                      key={star}
                      className={`star-btn ${star <= newCommentRating ? 'active' : ''}`}
                      onClick={() => setNewCommentRating(star)}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>
              <textarea
                rows="3"
                placeholder="เขียนความคิดเห็นเกี่ยวกับสินค้าชิ้นนี้... (Share your thoughts on this piece...)"
                value={newCommentText}
                onChange={e => setNewCommentText(e.target.value)}
                className="comment-textarea"
                required
              ></textarea>
              <div className="comment-form-footer">
                <button type="submit" className="btn-outline submit-comment-btn">
                  Post Comment
                </button>
              </div>
            </form>

            {/* Comments List */}
            <div className="comments-list">
              {currentComments.map(comment => (
                <div key={comment.id} className="glass comment-card">
                  <div className="comment-card-header">
                    <div className="comment-user">
                      <div className="comment-avatar">
                        {comment.author.replace('คุณ', '').trim().charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h5>{comment.author}</h5>
                        <span className="comment-date">{comment.date}</span>
                      </div>
                    </div>
                    <div className="comment-stars" aria-label={`${comment.rating} out of 5 stars`}>
                      {'★'.repeat(comment.rating)}
                      <span className="muted-stars">{'★'.repeat(5 - comment.rating)}</span>
                    </div>
                  </div>
                  <p className="comment-body">{comment.text}</p>
                </div>
              ))}
            </div>
          </section>
        </main>
      ) : (
        <>
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
                <div
                  key={product.id}
                  className="glass product-card clickable-card"
                  onClick={() => openProductDetail(product)}
                >
                  <div className="img-container">
                    <img src={product.image} alt={product.name} />
                    <span className="view-detail-hint">View Details →</span>
                  </div>
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <p className="desc">{product.description}</p>
                    <div className="price-row">
                      <span className="price">฿{product.price.toLocaleString()}</span>
                      <button
                        className="btn-outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product);
                        }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </>
      )}

      {/* Footer */}
      <footer className="glass footer">
        <p>© 2026 Sangkhalok Sukhothai. All rights reserved.</p>
      </footer>

      {/* Floating Mobile Cart Bar (Visible only on mobile when cart has items) */}
      {cart.length > 0 && !isCartOpen && (
        <div className="mobile-cart-bar glass" onClick={() => setIsCartOpen(true)}>
          <div className="mobile-cart-info">
            <span className="mobile-cart-badge">{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
            <span className="mobile-cart-text">View Cart</span>
          </div>
          <span className="mobile-cart-total">฿{cartTotal.toLocaleString()} →</span>
        </div>
      )}

      {/* Cart Drawer */}
      <div className={`cart-overlay ${isCartOpen ? 'open' : ''}`} onClick={() => setIsCartOpen(false)}></div>
      <div className={`glass cart-drawer ${isCartOpen ? 'open' : ''}`}>
        <div className="drawer-handle" onClick={() => setIsCartOpen(false)}></div>
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
