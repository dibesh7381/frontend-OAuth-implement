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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <div key={product._id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition flex flex-col overflow-hidden">
          {product.image && (
            <div className="w-full p-4 flex justify-center items-center bg-gray-100">
              <img
                src={product.image || "/placeholder.png"}
                alt={`${product.brand || ""} ${product.model || ""}`}
                className="max-h-48 w-auto object-contain"
              />
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
                <input type="number" name="price" defaultValue={product.price} placeholder="Price" required className="border p-2 rounded" />
                <input type="file" name="image" accept="image/*" className="border p-2 rounded" />
                <div className="flex gap-2 mt-2">
                  <button type="submit" className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 cursor-pointer transition">Save</button>
                  <button type="button" onClick={() => setEditingId(null)} className="flex-1 bg-gray-400 text-white cursor-pointer py-2 rounded hover:bg-gray-500 transition">Cancel</button>
                </div>
              </form>
            ) : (
              <>
                <h3 className="text-lg font-semibold mb-1">{product.brand} {product.model}</h3>
                <p className="text-gray-600 text-sm mb-1">{product.color} | {product.storage} | {product.ram}</p>
                <p className="text-gray-800 font-bold text-lg mb-1">₹{product.price}</p>
                <p className="text-gray-500 text-sm mb-3">From: {product.shopName}</p>
                <div className="mt-auto flex gap-2">
                  <button onClick={() => setEditingId(product._id)} className="flex-1 cursor-pointer bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Edit</button>
                  <button onClick={() => handleDelete(product._id)} className="flex-1 cursor-pointer bg-red-600 text-white py-2 rounded hover:bg-red-700 transition">Delete</button>
                </div>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MobileCard;

