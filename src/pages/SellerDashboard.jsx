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

    if (user.role?.toLowerCase() !== "seller") {
      const timer = setTimeout(() => navigate("/"), 3000);
      return () => clearTimeout(timer);
    }

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
  }, [user, navigate]);

  if (!user || loading) return <ModernLoader />;

  if (user.role?.toLowerCase() !== "seller") {
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded max-w-md text-center">
          <strong className="font-bold">Restricted!</strong>
          <span className="block mt-2">You are not a seller. Redirecting to home...</span>
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
