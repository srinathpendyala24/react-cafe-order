import React, { useState } from 'react';
import './style.css'; // Make sure the path is correct

function App() {
  const [item, setItem] = useState('');
  const [price, setPrice] = useState('');
  const [message, setMessage] = useState('');

  const handleOrder = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ item, price }),
      });

      const data = await res.json();
      setMessage(data.message);
      setItem('');
      setPrice('');
    } catch (error) {
      console.error('Error placing order:', error);
      setMessage('Failed to send order.');
    }
  };

  return (
    <div className="App">
      <header>
        <h1>Welcome to Dynamic Café!</h1>
        <p>Place Your Order</p>
      </header>

      <section id="menu">
        <h2>Order Menu</h2>
        <form onSubmit={handleOrder}>
          <input
            type="text"
            placeholder="Item Name"
            value={item}
            onChange={(e) => setItem(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <button type="submit">Place Order</button>
        </form>
        <p>{message}</p>
      </section>

      <footer>
        <p>© 2025 Dynamic Café. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
