// src/pages/admin/AllItemsPage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AllItemsPage() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => {
        if (data.success) setProducts(data.data);
        else alert('Failed to fetch products');
      })
      .catch(() => alert('Error fetching products'));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();

      if (data.success) {
        setProducts(products.filter(product => product._id !== id));
        alert('Product deleted successfully');
      } else {
        alert('Failed to delete product');
      }
    } catch (error) {
      alert('Error deleting product');
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin: All Products</h1>
        <button
          onClick={() => navigate('/cart/new')}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Add New Item
        </button>
      </div>

      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <table className="w-full bg-white rounded shadow">
          <thead>
            <tr className="border-b">
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Description</th>
              <th className="p-3 text-left">Price ($)</th>
              <th className="p-3 text-left">Availability</th> {/* new */}
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(({ _id, name, description, price, url, availability }) => (
              <tr key={_id} className="border-b hover:bg-gray-50">
                <td className="p-3">
                  {url ? (
                    <img src={url} alt={name} className="w-20 h-20 object-cover rounded" />
                  ) : (
                    <div className="w-20 h-20 bg-gray-200 flex items-center justify-center rounded text-gray-400">
                      No Image
                    </div>
                  )}
                </td>
                <td className="p-3">{name}</td>
                <td className="p-3">{description}</td>
                <td className="p-3">${price.toFixed(2)}</td>
                <td className="p-3">
                  {availability ? (
                    <span className="px-2 py-1 rounded bg-green-200 text-green-800 font-semibold">Available</span>
                  ) : (
                    <span className="px-2 py-1 rounded bg-red-200 text-red-800 font-semibold">Unavailable</span>
                  )}
                </td>
                <td className="p-3 flex justify-center gap-3">
                  <button
                    onClick={() => navigate(`/cart/edit/${_id}`)}
                    className="px-3 py-1 bg-yellow-400 rounded hover:bg-yellow-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(_id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AllItemsPage;
