import React, { useEffect, useState } from 'react';
import axios from 'axios';

function HomePage() {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [addedToCartId, setAddedToCartId] = useState(null); 

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => setProducts(res.data.data))
      .catch(err => console.error(err));
  }, []);

  const handleQuantityChange = (productId, quantity) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: parseInt(quantity),
    }));
  };

  const addToCart = (product) => {
    if (!product.availability) return;

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const selectedQty = quantities[product._id] || 1;

    const existing = cart.find(item => item._id === product._id);
    if (existing) {
      if (existing.quantity + selectedQty > 10) {
        return;
      }
      existing.quantity += selectedQty;
    } else {
      cart.push({ ...product, quantity: selectedQty });
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    // Show check icon temporarily
    setAddedToCartId(product._id);
    setTimeout(() => setAddedToCartId(null), 1000); // Hide after 1 second
    
  };

  return (
    <div className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map(product => (
        <div key={product._id} className="border p-4 rounded shadow relative">
          <img src={product.url} alt={product.name} className="w-full h-40 object-cover" />
          <h3 className="text-xl font-bold mt-2">{product.name}</h3>
          <p className="mt-1">{product.description}</p>
          <p className="text-green-600 font-bold mt-1">${product.price}</p>

          {/* Availability Label */}
          <p className={`mt-2 font-semibold ${product.availability ? 'text-green-600' : 'text-red-600'}`}>
            {product.availability ? 'Available' : 'Unavailable'}
          </p>

          {/* Quantity Selector */}
          <div className="mt-2">
            <label htmlFor={`qty-${product._id}`} className="mr-2">Qty:</label>
            <select
              id={`qty-${product._id}`}
              value={quantities[product._id] || 1}
              onChange={(e) => handleQuantityChange(product._id, e.target.value)}
              className="border rounded px-2 py-1"
              disabled={!product.availability}
            >
              {[...Array(10)].map((_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>
          </div>

          <button
            onClick={() => addToCart(product)}
            className={`mt-3 w-full px-4 py-2 rounded text-white flex justify-center items-center gap-2 ${
              product.availability ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-400 cursor-not-allowed'
            }`}
            disabled={!product.availability}
          >
            {addedToCartId === product._id ? (
              <span>✅</span>
            ) : (
              <span>Add to Cart</span>
            )}
          </button>
        </div>
      ))}
    </div>
  );
}

export default HomePage;
