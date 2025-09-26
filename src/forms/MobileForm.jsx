import { useState, useRef } from "react";

const BACKEND_URL = "http://localhost:5000";

const MobileForm = ({ addProduct }) => {
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    color: "",
    storage: "",
    ram: "",
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
      data.append("model", formData.model);
      data.append("color", formData.color);
      data.append("storage", formData.storage);
      data.append("ram", formData.ram);
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
        addProduct(result.product); // ✅ Parent state update
        // Reset form
        setFormData({
          brand: "",
          model: "",
          color: "",
          storage: "",
          ram: "",
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
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow-md w-full max-w-md mb-6"
    >
      <h2 className="text-xl font-bold mb-4">Add Mobile Product</h2>

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
      <input
        type="text"
        name="model"
        placeholder="Model"
        value={formData.model}
        onChange={handleChange}
        className="w-full mb-2 p-2 border rounded"
        required
      />
      <input
        type="text"
        name="color"
        placeholder="Color"
        value={formData.color}
        onChange={handleChange}
        className="w-full mb-2 p-2 border rounded"
        required
      />
      <input
        type="text"
        name="storage"
        placeholder="Storage"
        value={formData.storage}
        onChange={handleChange}
        className="w-full mb-2 p-2 border rounded"
        required
      />
      <input
        type="text"
        name="ram"
        placeholder="RAM"
        value={formData.ram}
        onChange={handleChange}
        className="w-full mb-2 p-2 border rounded"
        required
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
      <input
        type="file"
        name="image"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleChange}
        className="w-full mb-4"
        required
      />

      <button
        type="submit"
        className={`w-full py-2 rounded text-white transition ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
        disabled={loading}
      >
        {loading ? "Adding..." : "Add Mobile"}
      </button>
    </form>
  );
};

export default MobileForm;
