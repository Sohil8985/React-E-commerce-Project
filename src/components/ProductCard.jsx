import { IoCartOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart, cartItem } = useCart();
  console.log(cartItem);
  
  return (
    <div className="border relative border-gray-100 rounded-2xl cursor-pointer hover:scale-105 hover:shadow-2xl transition-all p-2 h-max">
      <img
        src={product.images[0]}
        alt=""
        className="bg-gray-100 aspect-square "
        onClick={() => navigate(`/products/${product.id}`)}
      />
      <div className="h-10 my-3">
        <h1 className="line-clamp-2 p-1 font-semibold">{product.title}</h1>
      </div>
      <div>
        <p className="my-1 text-lg text-gray-800 font-bold">${product.price}</p>
      </div>
      <button
        className="bg-red-500 px-3 py-2 text-lg rounded-md text-white w-full cursor-pointer  flex gap-1 items-center justify-center font-semibold hover:bg-red-600"
        onClick={() => addToCart(product)}
      >
        <IoCartOutline className="w-6 h-6" />
        Add to cart
      </button>
    </div>
  );
};

export default ProductCard;
