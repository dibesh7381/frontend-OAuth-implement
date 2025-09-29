export default function CustomerBeautyProductCard({ products, disableButtons }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-4">
      {products.map((p) => (
        <div
          key={p._id}
          className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col"
        >
          {/* Product Image */}
          <div className="w-full relative aspect-w-1 aspect-h-1">
            <img
              src={p.image || "/placeholder.png"}
              alt={`${p.brand || "Unknown"} - ${p.productType || "N/A"}`}
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Product Info */}
          <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
            <div className="mb-3">
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 mb-1 truncate">
                {p.brand} {p.productType}
              </h3>
              {p.color && (
                <p className="text-sm sm:text-base text-gray-500 mt-1 truncate">
                  Color: {p.color}
                </p>
              )}
            </div>

            <p className="text-blue-600 font-extrabold text-lg sm:text-xl md:text-2xl mb-4">
              ₹{p.price || "--"}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-auto">
              <button
                onClick={() =>
                  !disableButtons &&
                  alert(`${p.brand} - ${p.productType} added to cart!`)
                }
                disabled={disableButtons}
                className={`flex-1 py-2 rounded-2xl text-white font-semibold transition-colors duration-200 ${
                  disableButtons
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-yellow-500 hover:bg-yellow-600"
                }`}
              >
                Add to Cart
              </button>
              <button
                onClick={() =>
                  !disableButtons &&
                  alert(`Proceeding to buy: ${p.brand} - ${p.productType}`)
                }
                disabled={disableButtons}
                className={`flex-1 py-2 rounded-2xl text-white font-semibold transition-colors duration-200 ${
                  disableButtons
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
