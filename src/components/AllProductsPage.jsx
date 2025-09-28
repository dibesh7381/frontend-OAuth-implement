import { useEffect, useState } from "react";
import ModernLoader from "./ModernLoader";

const BACKEND_URL = "http://localhost:5000";

const AllProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [userRole, setUserRole] = useState("customer"); // default

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/products`, {
          credentials: "include", // cookies bhejne ke liye
        });
        const data = await res.json();

        if (res.ok) {
          setProducts(data.products || []);
          setUserRole(data.userRole || "customer"); // backend se role
          console.log("User Role:", data.userRole); // debug ke liye
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

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <h1 className="text-4xl font-bold mb-6">All Products</h1>
        <ModernLoader />
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

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold mt-10 mb-8 text-center">All Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition flex flex-col overflow-hidden"
          >
            {product.image && (
              <div className="w-full p-4 flex justify-center items-center bg-gray-100">
                <img
                  src={product.image}
                  alt={product.model}
                  className="max-h-48 w-auto object-contain"
                />
              </div>
            )}
            <div className="p-4 flex flex-col flex-1">
              <h2 className="text-lg font-semibold mb-1">
                {product.brand} {product.model}
              </h2>
              <p className="text-gray-600 text-sm mb-1">
                {product.color} | {product.storage} | {product.ram}
              </p>
              <p className="text-gray-800 font-bold text-lg mb-1">₹{product.price}</p>
              <p className="text-gray-500 text-sm mb-3">
                From: {product.shopName}
              </p>

              <div className="mt-auto flex gap-2">
                <button
                  disabled={userRole === "seller"}
                  className={`flex-1 py-2 rounded text-white transition ${
                    userRole === "seller"
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  Buy Now
                </button>
                <button
                  disabled={userRole === "seller"}
                  className={`flex-1 py-2 rounded text-white transition ${
                    userRole === "seller"
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProductsPage;
