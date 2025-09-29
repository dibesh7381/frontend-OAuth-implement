import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
    setIsOpen(false);
  };

  return (
    <nav className="bg-gray-800 text-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-white">
              ShopCart
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link to="/" className="hover:text-gray-300 transition">Home</Link>
            <Link to="/about" className="hover:text-gray-300 transition">About</Link>
            <Link to="/all-products" className="hover:text-gray-300 transition">All Products</Link>

            {user ? (
              <>
                <Link to="/profile" className="hover:text-gray-300 transition">Profile</Link>
                <Link to="/become-seller" className="hover:text-gray-300 transition">Become Seller</Link>
                <Link to="/seller-dashboard" className="hover:text-gray-300 transition">Seller Dashboard</Link>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1 bg-red-500 rounded hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="hover:text-gray-300 transition">Login</Link>
            )}
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none z-50"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`fixed top-0 left-0 w-64 h-full bg-gray-800 shadow-lg transform transition-transform duration-300 z-40 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex flex-col mt-16 space-y-4 px-4">
          <Link to="/" className="block px-3 py-2 rounded hover:bg-gray-700 transition" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/about" className="block px-3 py-2 rounded hover:bg-gray-700 transition" onClick={() => setIsOpen(false)}>About</Link>
          <Link to="/all-products" className="block px-3 py-2 rounded hover:bg-gray-700 transition" onClick={() => setIsOpen(false)}>All Products</Link>

          {user ? (
            <>
              <Link to="/profile" className="block px-3 py-2 rounded hover:bg-gray-700 transition" onClick={() => setIsOpen(false)}>Profile</Link>
              <Link to="/become-seller" className="block px-3 py-2 rounded hover:bg-gray-700 transition" onClick={() => setIsOpen(false)}>Become Seller</Link>
              <Link to="/seller-dashboard" className="block px-3 py-2 rounded hover:bg-gray-700 transition" onClick={() => setIsOpen(false)}>Seller Dashboard</Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 rounded bg-red-500 hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="block px-3 py-2 rounded hover:bg-gray-700 transition" onClick={() => setIsOpen(false)}>Login</Link>
          )}
        </div>
      </div>

      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-30" onClick={() => setIsOpen(false)}></div>}
    </nav>
  );
};

export default Navbar;

