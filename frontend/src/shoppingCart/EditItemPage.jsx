import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EditItemPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    url: '',
    availability: false, // default to false to avoid uncontrolled
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch product data by id
    fetch(`http://localhost:5000/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          // Ensure availability is boolean
          const avail = typeof data.data.availability === 'boolean' ? data.data.availability : false;
          setFormData({
            name: data.data.name || '',
            description: data.data.description || '',
            price: data.data.price !== undefined ? data.data.price.toString() : '',
            url: data.data.url || '',
            availability: avail,
          });
        } else {
          alert('Failed to load product details');
          navigate('/adminCart');
        }
      })
      .catch(() => {
        alert('Error fetching product details');
        navigate('/adminCart');
      })
      .finally(() => setLoading(false));
  }, [id, navigate]);

  // Controlled input handler, handles text and checkbox
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, description, price, url, availability } = formData;

    if (!name || !description || !price) {
      alert('Please fill all required fields');
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          description,
          price: parseFloat(price),
          url,
          availability,
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert('Product updated successfully');
        navigate('/adminCart');
      } else {
        alert('Failed to update product');
      }
    } catch (error) {
      alert('Error updating product');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Edit Item</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
      >
        {/* Name */}
        <label className="block mb-4">
          <span className="text-gray-700">Name</span>
          <input
            type="text"
            name="name"
            className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        {/* Description */}
        <label className="block mb-4">
          <span className="text-gray-700">Description</span>
          <textarea
            name="description"
            rows="3"
            className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </label>

        {/* Price */}
        <label className="block mb-4">
          <span className="text-gray-700">Price ($)</span>
          <input
            type="number"
            name="price"
            min="0"
            step="0.01"
            className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </label>

        {/* Image URL */}
        <label className="block mb-4">
          <span className="text-gray-700">Image URL</span>
          <input
            type="url"
            name="url"
            placeholder="https://example.com/image.jpg"
            className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={formData.url}
            onChange={handleChange}
          />
        </label>

        {/* Availability Checkbox */}
        <label className="block mb-4 flex items-center space-x-2">
          <input
            type="checkbox"
            name="availability"
            checked={formData.availability}
            onChange={handleChange}
            className="h-5 w-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
          />
          <span className="text-gray-700 font-semibold">Available</span>
        </label>

        {/* Buttons */}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => navigate('/adminCart')}
            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            Update Item
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditItemPage;
