import { useState, useRef } from "react";

const BACKEND_URL = "http://localhost:5000";

const BeautyProductForm = ({ addProduct }) => {
  const [formData, setFormData] = useState({
    brand: "",
    productType: "",
    color: "",
    price: "",
    image: null,
  });

  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const data = new FormData();
      data.append("brand", formData.brand);
      data.append("productType", formData.productType);
      data.append("color", formData.color);
      data.append("price", formData.price);
      if (formData.image) data.append("image", formData.image);

      const res = await fetch(`${BACKEND_URL}/product/add`, {
        method: "POST",
        credentials: "include",
        body: data,
      });

      const result = await res.json();

      if (res.ok) {
        setSuccessMsg("Product added successfully!");
        addProduct(result.product);

        setFormData({
          brand: "",
          productType: "",
          color: "",
          price: "",
          image: null,
        });
        if (fileInputRef.current) fileInputRef.current.value = "";
      } else {
        setErrorMsg(result.message || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md mb-6">
      <h2 className="text-xl font-bold mb-4">Add Beauty Product</h2>

      {successMsg && <p className="text-green-600 mb-2">{successMsg}</p>}
      {errorMsg && <p className="text-red-600 mb-2">{errorMsg}</p>}

      <input
        type="text"
        name="brand"
        placeholder="Brand"
        value={formData.brand}
        onChange={handleChange}
        className="w-full mb-2 p-2 border rounded"
        required
      />

      <select
        name="productType"
        value={formData.productType}
        onChange={handleChange}
        className="w-full mb-2 p-2 border rounded"
        required
      >
        <option value="">Select Product Type</option>
        <option value="Lipstick">Lipstick</option>
        <option value="Foundation">Foundation</option>
        <option value="Perfume">Perfume</option>
        <option value="Skincare">Skincare</option>
      </select>

      <input
        type="text"
        name="color"
        placeholder="Color / Shade"
        value={formData.color}
        onChange={handleChange}
        className="w-full mb-2 p-2 border rounded"
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        className="w-full mb-2 p-2 border rounded"
        required
      />

      {/* Modern file input */}
      <div className="mb-4">
        <input
          type="file"
          name="image"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleChange}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current && fileInputRef.current.click()}
          className="w-full cursor-pointer py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition flex items-center justify-center gap-2"
        >
          {formData.image ? formData.image.name : "Upload Image"}
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12v6m0 0l-3-3m3 3l3-3m-9-9h6a2 2 0 012 2v2H5V5a2 2 0 012-2z"
            />
          </svg>
        </button>
      </div>

      <button
        type="submit"
        className={`w-full py-2 rounded cursor-pointer text-white transition ${
          loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
        }`}
        disabled={loading}
      >
        {loading ? "Adding..." : "Add Product"}
      </button>
    </form>
  );
};

export default BeautyProductForm;
