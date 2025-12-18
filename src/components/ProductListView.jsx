import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { IoCartOutline } from "react-icons/io5";

const ProductListView = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const OriginalPrice = Math.round(
    product.price + (product.price * product.discountPercentage) / 100
  );
  return (
    <div className="rounded-md mt-3">
      <div className="bg-gray-100  flex flex-col md:flex-row gap-5 md:gap-7 items-center md:items-start p-3 rounded-md">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-40 w-40 sm:w-48 sm:h-48 md:w-60 md:h-60 rounded-md bg-white cursor-pointer shadow object-cover"
          onClick={() => navigate(`/product/${product.id}`)}
        />
        <div className="space-y-3 w-full">
          <h1 className="font-bold text-lg sm:text-xl line-clamp-3 hover:text-red-400">
            {product.title} • {product.sku}{" "}
          </h1>
          <p className="text-gray-600 mt-2">{product.description}</p>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xl sm:text-2xl font-bold text-red-600">
              ${product.price}
            </span>
            <span className="text-lg text-gray-500 line-through">
              ${OriginalPrice}
            </span>
            <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-sm font-medium">
              {product.discountPercentage}% OFF
            </span>
          </div>
          <p className="text-sm sm:text-base text-gray-700">
            Free delivery <span className="font-semibold"> Fri, 18 Nov</span>{" "}
            <br />
            Or fastest delivery{" "}
            <span className="font-semibold"> Tomorrow, 17 Nov</span>
          </p>

          <div>
            <button
              onClick={() => addToCart({ ...product })}
              disabled={product.stock === 0}
              className="px-4 flex items-center gap-2 py-2 text-base sm:text-lg bg-red-500 text-white rounded-md hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
            >
              <IoCartOutline className="w-6 h-6" />
              {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListView;
