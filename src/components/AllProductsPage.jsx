import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ModernLoader from "./ModernLoader";

import CustomerMobileCard from "../Cards/CustomerMobileCard";
import CustomerHomeApplianceCard from "../Cards/CustomerHomeApplianceCard";
import CustomerBeautyProductCard from "../Cards/CustomerBeautyProductCard"; // ✅ Add this

const BACKEND_URL = "http://localhost:5000";

const AllProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/products`, {
          credentials: "include",
        });
        const data = await res.json();

        if (res.ok) {
          setProducts(data.products || []);
        } else {
          setErrorMsg(data.message || "Failed to fetch products");
        }
      } catch (err) {
        console.error(err);
        setErrorMsg("Server error");
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchProducts();
    else setLoading(false);
  }, [user]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <h1 className="text-4xl font-bold mb-6">All Products</h1>
        <ModernLoader />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
        <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md text-center">
          <h2 className="text-2xl font-bold mb-4">You need to login</h2>
          <p className="text-gray-600 mb-6">
            Please login to view all products and start shopping.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-3 cursor-pointer rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (errorMsg) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <h1 className="text-4xl font-bold mb-6">All Products</h1>
        <p className="text-red-600 text-lg">{errorMsg}</p>
      </div>
    );
  }

  const isSeller = user?.role?.toLowerCase() === "seller";

  // Group products by shopType
  const groupedProducts = products.reduce((acc, product) => {
    const type = product.shopType?.toLowerCase() || "other";
    if (!acc[type]) acc[type] = [];
    acc[type].push(product);
    return acc;
  }, {});

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold mt-10 mb-8 text-center">All Products</h1>

      <p className="text-center text-gray-700 mb-6">
        Logged in as: <span className="font-semibold">{user.role || "customer"}</span>
      </p>

      {/* Render products dynamically */}
      {Object.entries(groupedProducts).map(([type, items]) => (
        <div key={type} className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 capitalize">
            {type.replace("-", " ")}
          </h2>

          {type.includes("mobile") && (
            <CustomerMobileCard products={items} disableButtons={isSeller} />
          )}
          {type.includes("home") && (
            <CustomerHomeApplianceCard products={items} disableButtons={isSeller} />
          )}
          {type.includes("beauty") && (
            <CustomerBeautyProductCard products={items} disableButtons={isSeller} />
          )}

          {/* Fallback for other types */}
          {!type.includes("mobile") && !type.includes("home") && !type.includes("beauty") && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {items.map((p) => (
                <div
                  key={p._id}
                  className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition"
                >
                  <img
                    src={p.image || "/placeholder.png"}
                    alt={p.brand || p.model || "Product"}
                    className="w-full h-40 object-cover rounded-lg mb-3"
                  />
                  <h3 className="text-lg font-semibold">{p.brand || "Unknown"}</h3>
                  <p className="text-gray-600">{p.model || p.productType}</p>
                  <p className="text-blue-600 font-bold mt-2">₹{p.price || "--"}</p>

                  <div className="flex gap-2 mt-3">
                    <button
                      disabled={isSeller}
                      className={`flex-1 rounded-lg py-2 text-white ${
                        isSeller
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-yellow-500 hover:bg-yellow-600"
                      }`}
                    >
                      Add to Cart
                    </button>
                    <button
                      disabled={isSeller}
                      className={`flex-1 rounded-lg py-2 text-white ${
                        isSeller
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-green-600 hover:bg-green-700"
                      }`}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AllProductsPage;
