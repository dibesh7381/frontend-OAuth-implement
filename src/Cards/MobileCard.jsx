import { useState } from "react";

const BACKEND_URL = "http://localhost:5000";

const MobileCard = ({ products, setProducts }) => {
  const [editingId, setEditingId] = useState(null);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this mobile?")) return;
    try {
      const res = await fetch(`${BACKEND_URL}/product/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) setProducts(products.filter((p) => p._id !== id));
      else alert(data.message || "Failed to delete mobile");
    } catch (err) {
      console.error(err);
      alert("Server error while deleting mobile");
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
        setProducts(products.map((p) => (p._id === product._id ? data.product : p)));
        setEditingId(null);
      } else {
        alert(data.message || "Failed to update mobile");
      }
    } catch (err) {
      console.error(err);
      alert("Server error while updating mobile");
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-6 justify-items-center">
      {products.map((product) => (
        <div
          key={product._id}
          className="relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all flex flex-col overflow-hidden h-[36rem] w-full max-w-[22rem]"
        >
          {/* Image */}
          {product.image && (
            <div className="w-full h-72 bg-gray-100 p-4 flex justify-center items-center overflow-hidden">
              <img
                src={product.image || "/placeholder.png"}
                alt={`${product.brand || ""} ${product.model || ""}`}
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          )}

          {/* Card Content */}
          <div className="p-5 flex flex-col flex-1 justify-between">
            <div>
              <h3 className="text-lg md:text-xl font-bold mb-1 truncate">
                {product.brand} {product.model}
              </h3>
              <p className="text-gray-600 text-sm md:text-base mb-1 truncate">
                {product.color} | {product.storage} | {product.ram}
              </p>
              <p className="text-gray-800 font-bold text-lg md:text-xl mb-1">
                ₹{product.price}
              </p>
              <p className="text-gray-500 text-sm md:text-base truncate">
                From: {product.shopName}
              </p>
            </div>

            <div className="flex gap-4 mt-3">
              <button
                onClick={() => setEditingId(product._id)}
                className="flex-1 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition cursor-pointer"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product._id)}
                className="flex-1 bg-red-600 text-white py-3 rounded-xl hover:bg-red-700 transition cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>

          {/* Edit Form Overlay */}
          {editingId === product._id && (
            <div className="absolute inset-0 bg-white p-6 flex flex-col gap-4 shadow-2xl rounded-3xl z-10 overflow-auto">
              <form onSubmit={(e) => handleUpdate(e, product)} className="flex flex-col gap-3">
                <input
                  type="text"
                  name="brand"
                  defaultValue={product.brand}
                  placeholder="Brand"
                  required
                  className="border p-3 rounded-lg w-full focus:outline-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                <input
                  type="text"
                  name="model"
                  defaultValue={product.model}
                  placeholder="Model"
                  required
                  className="border p-3 rounded-lg w-full focus:outline-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                <input
                  type="text"
                  name="color"
                  defaultValue={product.color}
                  placeholder="Color"
                  className="border p-3 rounded-lg w-full focus:outline-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                <input
                  type="text"
                  name="storage"
                  defaultValue={product.storage}
                  placeholder="Storage"
                  className="border p-3 rounded-lg w-full focus:outline-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                <input
                  type="text"
                  name="ram"
                  defaultValue={product.ram}
                  placeholder="RAM"
                  className="border p-3 rounded-lg w-full focus:outline-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                <input
                  type="number"
                  name="price"
                  defaultValue={product.price}
                  placeholder="Price"
                  required
                  className="border p-3 rounded-lg w-full focus:outline-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  className="border p-3 rounded-lg w-full cursor-pointer"
                />

                <div className="flex gap-3 mt-3">
                  <button
                    type="submit"
                    className="flex-1 bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition cursor-pointer"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingId(null)}
                    className="flex-1 bg-gray-400 text-white py-3 rounded-xl hover:bg-gray-500 transition cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MobileCard;
