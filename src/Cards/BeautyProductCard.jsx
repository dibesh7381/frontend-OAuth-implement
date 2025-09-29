import { useState } from "react";

const BACKEND_URL = "http://localhost:5000";

const BeautyProductCard = ({ products, setProducts }) => {
  const [editingId, setEditingId] = useState(null);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await fetch(`${BACKEND_URL}/product/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) setProducts(products.filter((p) => p._id !== id));
      else alert(data.message || "Failed to delete product");
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
        setProducts(products.map((p) => (p._id === product._id ? data.product : p)));
        setEditingId(null);
      } else {
        alert(data.message || "Failed to update product");
      }
    } catch (err) {
      console.error(err);
      alert("Server error while updating product");
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
                alt={product.productName}
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          )}

          {/* Card Content */}
          <div className="p-5 flex flex-col flex-1 justify-between">
            <div>
              <h3 className="text-lg md:text-xl font-bold mb-1 truncate">
                {product.brand} {product.productName}
              </h3>
              <p className="text-gray-600 text-sm md:text-base mb-1 truncate">
                {product.productType} {product.color && `| ${product.color}`}
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
                className="flex-1 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product._id)}
                className="flex-1 bg-red-600 text-white py-3 rounded-xl hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>

          {/* Edit Form Overlay */}
          {editingId === product._id && (
            <div className="absolute inset-0 bg-white bg-opacity-95 p-6 flex flex-col gap-3 shadow-2xl rounded-3xl z-10 overflow-auto">
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
                  name="productName"
                  defaultValue={product.productName}
                  placeholder="Product Name"
                  required
                  className="border p-3 rounded-lg w-full focus:outline-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                <select
                  name="productType"
                  defaultValue={product.productType}
                  required
                  className="border p-3 rounded-lg w-full focus:outline-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Select Type</option>
                  <option value="Lipstick">Lipstick</option>
                  <option value="Foundation">Foundation</option>
                  <option value="Perfume">Perfume</option>
                  <option value="Skincare">Skincare</option>
                </select>
                <input
                  type="text"
                  name="color"
                  defaultValue={product.color}
                  placeholder="Color / Shade"
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
                  className="border p-3 rounded-lg w-full"
                />

                <div className="flex gap-3 mt-3">
                  <button
                    type="submit"
                    className="flex-1 bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingId(null)}
                    className="flex-1 bg-gray-400 text-white py-3 rounded-xl hover:bg-gray-500 transition"
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

export default BeautyProductCard;
