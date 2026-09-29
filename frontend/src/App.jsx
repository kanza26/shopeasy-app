
import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const total = cart.reduce((sum, item) => sum + Number(item.price), 0);

  const checkout = async () => {
    if (cart.length === 0) return;
    try {
      for (const item of cart) {
        await fetch(`${API_URL}/api/orders`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ product_id: item.id, quantity: 1 }),
        });
      }
      alert('Order placed successfully!');
      setCart([]);
    } catch (err) {
      alert('Order failed: ' + err.message);
    }
  };

  if (loading) return <div className="container"><p>Loading...</p></div>;

  return (
    <div className="container">
      <h1>🛒 ShopEasy</h1>
      <div className="products">
        {products.map((p) => (
          <div key={p.id} className="product">
            <h3>{p.name}</h3>
            <p className="price">${p.price}</p>
            <button onClick={() => addToCart(p)}>Add to Cart</button>
          </div>
        ))}
      </div>

      <div className="cart">
        <h2>Cart ({cart.length})</h2>
        {cart.length === 0 ? (
          <p className="empty">Cart is empty</p>
        ) : (
          <>
            {cart.map((item, i) => (
              <div key={i} className="cart-item">
                <span>{item.name}</span>
                <span>${item.price}</span>
              </div>
            ))}
            <div className="total">Total: ${total.toFixed(2)}</div>
            <button onClick={checkout} style={{ marginTop: '1rem', padding: '0.75rem', background: '#27ae60', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', width: '100%', fontSize: '1rem' }}>
              Checkout
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
