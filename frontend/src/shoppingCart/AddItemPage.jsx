// src/pages/AddItemPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddItemPage() {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    url: "",
    availability: true,  // default true
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });

    if (res.ok) {
      setProduct({ name: "", description: "", price: "", url: "", availability: true });
      navigate("/adminCart");
    } else {
      alert("Failed to add product");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center">
        Add New Product
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name, Description, Price, URL inputs unchanged */}
        
        <div>
          <label htmlFor="availability" className="inline-flex items-center space-x-2">
            <input
              type="checkbox"
              id="availability"
              name="availability"
              checked={product.availability}
              onChange={handleChange}
              className="form-checkbox h-5 w-5 text-green-600"
            />
            <span className="text-gray-700 font-semibold">Available</span>
          </label>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}

export default AddItemPage;
