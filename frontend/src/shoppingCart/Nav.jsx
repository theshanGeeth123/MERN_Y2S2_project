import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo / Brand */}
        <Link to="/" className="text-2xl font-bold text-green-600">
          MyStore
        </Link>

        {/* Menu items */}
        <div className="space-x-8 hidden md:flex">
          <Link
            to="/home"
            className="text-gray-700 hover:text-green-600 font-medium transition"
          >
            Home
          </Link>

          <Link
            to="/adminCart"
            className="text-gray-700 hover:text-green-600 font-medium transition"
          >
            Admin
          </Link>

          <Link
            to="/cart"
            className="text-gray-700 hover:text-green-600 font-medium"
          >
            Customer
          </Link>
        </div>

        {/* Mobile menu button (hidden here, you can add later) */}
        <div className="md:hidden">
          {/* You can add hamburger icon & toggle logic here */}
        </div>
      </div>
    </nav>
  );
}

export default Nav;
