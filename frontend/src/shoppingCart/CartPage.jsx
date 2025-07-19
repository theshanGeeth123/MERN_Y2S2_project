// src/pages/CartPage.jsx
import React, { useEffect, useState } from 'react';

function CartPage() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(stored);
  }, []);

  const updateCart = (newCart) => {
    localStorage.setItem('cart', JSON.stringify(newCart));
    setCart(newCart);
  };

  const increaseQty = (id) => {
    const newCart = cart.map(item =>
      item._id === id && item.quantity < 10 ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCart(newCart);
  };

  const decreaseQty = (id) => {
    const newCart = cart
      .map(item => item._id === id ? { ...item, quantity: item.quantity - 1 } : item)
      .filter(item => item.quantity > 0);
    updateCart(newCart);
  };

  const removeItem = (id) => {
    const newCart = cart.filter(item => item._id !== id);
    updateCart(newCart);
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cart.map(item => (
            <div key={item._id} className="flex items-center gap-4 border p-4 rounded shadow">
              <img src={item.url} alt={item.name} className="w-24 h-24 object-cover" />
              <div className="flex-1">
                <h3 className="text-xl font-bold">{item.name}</h3>
                <p>${item.price} each</p>
                <div className="flex items-center gap-2 mt-2">
                  <button onClick={() => decreaseQty(item._id)} className="bg-gray-200 px-2">-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increaseQty(item._id)} className="bg-gray-200 px-2">+</button>
                </div>
              </div>
              <button onClick={() => removeItem(item._id)} className="text-red-600">Remove</button>
            </div>
          ))}
          <h2 className="text-2xl font-bold">Total: ${total.toFixed(2)}</h2>
        </div>
      )}
    </div>
  );
}
export default CartPage;
