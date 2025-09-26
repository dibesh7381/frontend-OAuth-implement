import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ModernLoader from "../components/ModernLoader";

const BACKEND_URL = "http://localhost:5000";

const BecomeSeller = () => {
  const { user, setUser } = useAuth();
  const [formData, setFormData] = useState({
    shopName: "",
    shopType: "",
    shopPhoto: null, // file object
    shopLocation: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  if (!user) return <ModernLoader />;

  // Agar user already seller hai, congratulation card dikhao
  if (user.role === "seller") {
    return (
      <div className="flex items-center justify-center min-h-screen px-4 bg-gray-50">
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md text-center">
          <h2 className="text-2xl font-bold mb-4">🎉 Congratulations!</h2>
          <p className="mb-4">You are already registered as a seller.</p>
          <button
            onClick={() => navigate("/seller-dashboard")}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    if (e.target.name === "shopPhoto") {
      setFormData({ ...formData, shopPhoto: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append("shopName", formData.shopName);
      data.append("shopType", formData.shopType);
      data.append("shopLocation", formData.shopLocation);
      if (formData.shopPhoto) data.append("shopPhoto", formData.shopPhoto);

      const res = await fetch(`${BACKEND_URL}/seller/register`, {
        method: "POST",
        credentials: "include",
        body: data,
      });

      const result = await res.json();
      if (res.ok) {
        // Update user role in context
        setUser({ ...user, role: "seller" });
        navigate("/profile");
      } else {
        alert(result.message);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
        encType="multipart/form-data"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Become a Seller</h2>

        <input
          type="text"
          name="shopName"
          placeholder="Shop Name"
          value={formData.shopName}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded mb-4"
        />

        <select
          name="shopType"
          value={formData.shopType}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded mb-4"
        >
          <option value="">Select Shop Type</option>
          <option value="Mobile Seller">Mobile Seller</option>
          <option value="Home Appliances Seller">Home Appliances Seller</option>
          <option value="Fashion Seller">Fashion Seller</option>
          <option value="Beauty Products Seller">Beauty Products Seller</option>
          <option value="Grocery Seller">Grocery Seller</option>
        </select>

        <input
          type="file"
          name="shopPhoto"
          accept="image/*"
          onChange={handleChange}
          required
          className="w-full p-2 border rounded mb-4"
        />

        <input
          type="text"
          name="shopLocation"
          placeholder="Shop Location"
          value={formData.shopLocation}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded mb-6"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Submitting..." : "Become a Seller"}
        </button>
      </form>
    </div>
  );
};

export default BecomeSeller;
