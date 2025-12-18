import { FaRegTrashAlt } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { LuNotebookText } from "react-icons/lu";
import { MdDeliveryDining } from "react-icons/md";
import { GiShoppingBag } from "react-icons/gi";
import emptyCart from "../assets/empty-cart.png";
const Cart = ({ location, getLocation }) => {
  const { cartItem, deleteItem, updateQuantity } = useCart();
  const { user } = useUser();
  const navigate = useNavigate();

  const totalPrice = Number(
    cartItem.reduce((total, item) => total + item.price * item.quantity, 0)
  ).toFixed(2);

  return (
    <div className="mt-20 max-w-6xl mx-auto px-3 md:px-0  mb-10">
      {cartItem.length > 0 ? (
        <div>
          <div>
            <div className="mt-5 space-y-4">
              {cartItem.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="bg-gray-100 p-4 rounded-md flex flex-col md:flex-row items-center justify-between mt-3 gap-4"
                  >
                    <div className="flex items-center gap-4 w-full md:w-auto">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-20 h-20 rounded-md object-cover"
                      />
                      <div>
                        <h1 className="w-[250px] md:w-[300px] font-medium line-clamp-2">{item.title}</h1>
                        <p className="text-red-500 font-semibold text-lg">
                          ${item.price}
                        </p>
                      </div>
                    </div>
                    <div className="bg-red-500 text-white flex  items-center gap-4 px-4 py-2 rounded-md font-bold text-lg">
                      <button
                        className="cursor-pointer"
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            Math.max(1, item.quantity - 1)
                          )
                        }
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            Math.min(item.stock, item.quantity + 1)
                          )
                        }
                        className="cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                    <span
                      onClick={() => deleteItem(item.id)}
                      className="hover:bg-white/70 transition-all rounded-full p-2 hover:shadow-2xl cursor-pointer"
                    >
                      <FaRegTrashAlt className="text-red-500 text-2xl" />
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
              <div className="bg-gray-100 rounded-md p-6 mt-4 space-y-4">
                <h1 className="text-gray-800 font-bold text-xl">
                  Delivery Info
                </h1>
                <div className="flex flex-col space-y-1">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter Your Name"
                    className="p-2 rounded-md w-full"
                    defaultValue={user?.fullName}
                  />
                </div>

                <div className="flex flex-col space-y-1">
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    placeholder="Enter Your Address"
                    className="p-2 rounded-md w-full"
                    defaultValue={location?.city || location?.town ||location?.village || location?.county}
                  />
                </div>

                <div className="flex flex-col md:flex-row gap-5 w-full">
                  <div className="flex flex-col space-y-1 w-full">
                    <label htmlFor="state">State</label>
                    <input
                      type="text"
                      name="state"
                      id="state"
                      placeholder="Enter Your State"
                      className="p-2 rounded-md"
                      defaultValue={location?.state}
                    />
                  </div>

                  <div className="flex flex-col space-y-1 w-full">
                    <label htmlFor="post">PostCode</label>
                    <input
                      type="text"
                      name="post"
                      id="post"
                      placeholder="Enter Your State"
                      className="p-2 rounded-md"
                      defaultValue={location?.postcode}
                    />
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-5 w-full">
                  <div className="flex flex-col space-y-1 w-full">
                    <label htmlFor="country">Country</label>
                    <input
                      type="text"
                      name="country"
                      id="country"
                      placeholder="Enter your country"
                      className="p-2 rounded-md"
                      defaultValue={location?.country}
                    />
                  </div>

                  <div className="flex flex-col space-y-1 w-full">
                    <label htmlFor="phone">Phone No.</label>
                    <input
                      type="number"
                      name="phone"
                      id="phone"
                      placeholder="Enter your Phone Number"
                      className="p-2 rounded-md"
                    />
                  </div>
                </div>
                
                  <button
                    type="submit"
                    className="bg-red-500 w-full text-white py-2 rounded-md"
                  >
                    Submit
                  </button>
                
                <div className="text-center text-gray-700">
                  ---------OR---------
                </div>
                
                  <button
                    onClick={getLocation}
                    className="bg-red-500 w-full text-white px-3 py-2 rounded-md"
                  >
                    Detect Location
                  </button>
                
              </div>

              <div className="bg-white border border-gray-100 shadow-xl rounded-md p-6 mt-4 space-y-4 h-max">
                <h1 className="text-gray-800 font-bold text-xl">
                  Bill details
                </h1>
                <div className="flex justify-between">
                  <p className="flex gap-1 items-center">
                      <LuNotebookText /> Item total
                  </p>
                  <p>${totalPrice}</p>
                </div>

                <div className="flex justify-between">
                  <p className="flex gap-1 items-center text-gray-700">
                    
                      <MdDeliveryDining /> Delivery Charge
                  </p>
                  <p className="text-red-500 font-semibold">
                    <span className="text-gray-600 line-through">$25</span> Free
                  </p>
                </div>
                <div className="flex justify-between">
                  <h1 className="flex gap-1 items-center text-gray-700">
                    
                      <GiShoppingBag /> Handling Charge
                  </h1>
                  <p className="text-red-500 font-semibold">$5</p>
                </div>
                <hr />

                <div className="flex justify-between  font-semibold text-lg">
                  <p className="font-semibold text-lg">Grand total</p>
                  <p className="font-semibold text-lg">
                    ${ (Number(totalPrice) + 5).toFixed(2 )}
                    </p>
                </div>
                <div>
                  <h1 className="font-semibold text-gray-700 mb-2">
                    Apply Promo Code
                  </h1>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      placeholder="Enter  code"
                      className="p-2 rounded-md w-full"
                    />
                    <button className="bg-white border px-4 cursor-pointer py-1 rounded-md">
                      Apply
                    </button>
                  </div>
                </div>
                <button className="bg-red-500 text-white py-2 rounded-md  w-full cursor-pointer">
                  Product to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-5 justify-center items-center h-[600px]">
          <h1 className="text-red-500 font-bold text-4xl md:text-5xl">
            Oh no! Your Cart is empty
          </h1>
          <img src={emptyCart}  className="w-64 md:w-96" />
          <button
            onClick={() => navigate("/products")}
            className="bg-red-500 text-white px-4 py-2 rounded-md cursor-pointer"
          >
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
