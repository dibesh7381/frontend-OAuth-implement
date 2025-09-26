import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ModernLoader from "../components/ModernLoader";
import MobileForm from "../forms/MobileForm";

const BACKEND_URL = "http://localhost:5000";

const SellerDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [seller, setSeller] = useState(null);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    if (!user) return;
    if (user.role !== "seller") {
      const timer = setTimeout(() => navigate("/"), 3000);
      return () => clearTimeout(timer);
    } else {
      fetch(`${BACKEND_URL}/seller/me`, { credentials: "include" })
        .then(res => res.json())
        .then(data => {
          if (data.seller) setSeller(data.seller);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });

      fetch(`${BACKEND_URL}/products/my`, { credentials: "include" })
        .then(res => res.json())
        .then(data => {
          if (data.products) setProducts(data.products);
          setProductsLoading(false);
        })
        .catch(err => {
          console.error(err);
          setProductsLoading(false);
        });
    }
  }, [user, navigate]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await fetch(`${BACKEND_URL}/product/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        setProducts(products.filter(p => p._id !== id));
      } else {
        alert(data.message || "Failed to delete product");
      }
    } catch (err) {
      console.error(err);
      alert("Server error while deleting product");
    }
  };

  const handleUpdate = async (e, product) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      const res = await fetch(`${BACKEND_URL}/product/update/${product._id}`, {
        method: "PUT",
        credentials: "include",
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        setProducts(products.map(p => p._id === product._id ? data.product : p));
        setEditingId(null);
      } else {
        alert(data.message || "Failed to update product");
      }
    } catch (err) {
      console.error(err);
      alert("Server error while updating product");
    }
  };

  if (!user || loading) return <ModernLoader />;

  if (user.role !== "seller") {
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded max-w-md text-center">
          <strong className="font-bold">Restricted!</strong>
          <span className="block mt-2">You are not a seller. Redirecting to home...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-50 px-4 pt-6">
      {/* Seller Info */}
      {seller && (
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md text-center mb-6">
          <img src={seller.shopPhoto} alt={seller.shopName} className="w-32 h-32 mx-auto rounded-full object-cover mb-4" />
          <h2 className="text-2xl font-bold mb-2">{seller.shopName}</h2>
          <p className="text-gray-600 mb-1"><strong>Owner:</strong> {seller.name}</p>
          <p className="text-gray-600 mb-1"><strong>Email:</strong> {seller.email}</p>
          <p className="text-gray-600 mb-1"><strong>Shop Type:</strong> {seller.shopType}</p>
          <p className="text-gray-600 mb-1"><strong>Location:</strong> {seller.shopLocation}</p>
        </div>
      )}

      {/* MobileForm with addProduct callback */}
      {seller?.shopType === "Mobile Seller" && <MobileForm addProduct={(newProduct) => setProducts([newProduct, ...products])} />}

      {/* Products */}
      <div className="w-full max-w-6xl mt-8">
        <h2 className="text-3xl font-bold mb-6 text-center">My Products</h2>
        {productsLoading ? (
          <ModernLoader />
        ) : products.length === 0 ? (
          <p className="text-center text-gray-600">No products added yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <div key={product._id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition flex flex-col overflow-hidden">
                {product.image && (
                  <div className="w-full p-4 flex justify-center items-center bg-gray-100">
                    <img src={product.image} alt={product.model} className="max-h-48 w-auto object-contain" />
                  </div>
                )}
                <div className="p-4 flex flex-col flex-1">
                  {editingId === product._id ? (
                    <form onSubmit={(e) => handleUpdate(e, product)} className="flex flex-col gap-2">
                      <input type="text" name="brand" defaultValue={product.brand} placeholder="Brand" required className="border p-2 rounded" />
                      <input type="text" name="model" defaultValue={product.model} placeholder="Model" required className="border p-2 rounded" />
                      <input type="text" name="color" defaultValue={product.color} placeholder="Color" className="border p-2 rounded" />
                      <input type="text" name="storage" defaultValue={product.storage} placeholder="Storage" className="border p-2 rounded" />
                      <input type="text" name="ram" defaultValue={product.ram} placeholder="RAM" className="border p-2 rounded" />
                      <input type="number" name="price" defaultValue={product.price} placeholder="Price" className="border p-2 rounded" />
                      <input type="file" name="image" accept="image/*" className="border p-2 rounded" />

                      <div className="flex gap-2 mt-2">
                        <button type="submit" className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">Save</button>
                        <button type="button" onClick={() => setEditingId(null)} className="flex-1 bg-gray-400 text-white py-2 rounded hover:bg-gray-500 transition">Cancel</button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <h3 className="text-lg font-semibold mb-1">{product.brand} {product.model}</h3>
                      <p className="text-gray-600 text-sm mb-1">{product.color} | {product.storage} | {product.ram}</p>
                      <p className="text-gray-800 font-bold text-lg mb-1">₹{product.price}</p>
                      <p className="text-gray-500 text-sm mb-3">From: {product.shopName}</p>

                      <div className="mt-auto flex gap-2">
                        <button onClick={() => setEditingId(product._id)} className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Edit</button>
                        <button onClick={() => handleDelete(product._id)} className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700 transition">Delete</button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerDashboard;
