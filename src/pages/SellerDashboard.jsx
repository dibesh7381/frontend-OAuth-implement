import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import ModernLoader from "../components/ModernLoader";

import MobileCard from "../Cards/MobileCard";
import MobileForm from "../forms/MobileForm";
import HomeApplianceForm from "../forms/HomeApplianceForm";
import HomeApplianceCard from "../Cards/HomeApplianceCard";
import BeautyProductForm from "../forms/BeautyProductForm";
import BeautyProductCard from "../Cards/BeautyProductCard";

const BACKEND_URL = "http://localhost:5000";

const SellerDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [seller, setSeller] = useState(null);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        const sellerRes = await fetch(`${BACKEND_URL}/seller/me`, { credentials: "include" });
        const sellerData = await sellerRes.json();
        if (sellerData.seller) setSeller(sellerData.seller);

        const prodRes = await fetch(`${BACKEND_URL}/products/my`, { credentials: "include" });
        const prodData = await prodRes.json();
        if (prodData.products) setProducts(prodData.products);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
        setProductsLoading(false);
      }
    };

    fetchData();
  }, [user]);

  if (!user || loading) return <ModernLoader />;

  if (!seller) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 px-6 py-8 rounded-lg text-center max-w-md">
          <h2 className="text-2xl font-bold mb-4">You need to be a seller!</h2>
          <p className="mb-6">To add products, you must first become a seller.</p>
          <button
            onClick={() => navigate("/become-seller")}
            className="bg-yellow-600 text-white py-3 px-6 rounded-xl hover:bg-yellow-700 transition cursor-pointer"
          >
            Become a Seller
          </button>
        </div>
      </div>
    );
  }

  const shopType = seller?.shopType?.toLowerCase() || "";
  const isMobileSeller = shopType.includes("mobile");
  const isHomeApplianceSeller = shopType.includes("home");
  const isBeautySeller = shopType.includes("beauty");

  // Filter products based on shop type
  const mobileProducts = products.filter((p) => p.shopType?.toLowerCase().includes("mobile"));
  const homeApplianceProducts = products.filter((p) => p.shopType?.toLowerCase().includes("home"));
  const beautyProducts = products.filter((p) => p.shopType?.toLowerCase().includes("beauty"));

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-50 px-4 pt-24">
      {/* Seller Info */}
      {seller && (
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md text-center mb-8">
          <img
            src={seller.shopPhoto || "/placeholder.png"}
            alt={seller.shopName}
            className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
          />
          <h2 className="text-2xl font-bold mb-2">{seller.shopName}</h2>
          <p className="text-gray-600 mb-1"><strong>Owner:</strong> {seller.name}</p>
          <p className="text-gray-600 mb-1"><strong>Email:</strong> {seller.email}</p>
          <p className="text-gray-600 mb-1"><strong>Shop Type:</strong> {seller.shopType}</p>
          <p className="text-gray-600 mb-1"><strong>Location:</strong> {seller.shopLocation}</p>
        </div>
      )}

      {/* Conditional Forms */}
      {isMobileSeller && (
        <div className="w-full max-w-md mb-8">
          <MobileForm addProduct={(newProduct) => setProducts([newProduct, ...products])} />
        </div>
      )}
      {isHomeApplianceSeller && (
        <div className="w-full max-w-md mb-8">
          <HomeApplianceForm addProduct={(newProduct) => setProducts([newProduct, ...products])} />
        </div>
      )}
      {isBeautySeller && (
        <div className="w-full max-w-md mb-8">
          <BeautyProductForm addProduct={(newProduct) => setProducts([newProduct, ...products])} />
        </div>
      )}

      {/* Products Grid */}
      <div className="w-full max-w-6xl mb-16">
        <h2 className="text-3xl font-bold mb-6 text-center">My Products</h2>

        {productsLoading ? (
          <div className="flex justify-center"><ModernLoader /></div>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-600">No products added yet.</p>
        ) : (
          <>
            {isMobileSeller && <MobileCard products={mobileProducts} setProducts={setProducts} />}
            {isHomeApplianceSeller && <HomeApplianceCard products={homeApplianceProducts} setProducts={setProducts} />}
            {isBeautySeller && <BeautyProductCard products={beautyProducts} setProducts={setProducts} />}
          </>
        )}
      </div>
    </div>
  );
};

export default SellerDashboard;
