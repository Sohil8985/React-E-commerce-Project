import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../assets/Loading4.webm";
import Breadcrums from "../components/Breadcrums";
import { IoCartOutline } from "react-icons/io5";
import { Package, RotateCcw, Shield, Star, Truck } from "lucide-react";
import { useCart } from "../context/CartContext";

const SingleProduct = () => {
  const params = useParams();
  const [singleProduct, setSingleProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const {addToCart} = useCart();
  const navigate = useNavigate();

  const getSingleProduct = async () => {
    try {
      const res = await axios.get(
        `https://dummyjson.com/products/${params.id}`
      );
      const product = res.data;
      setSingleProduct(product);
      console.log(product);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleProduct();
  }, []);

  if (!singleProduct) {
    return (
      <div>
        <div className="flex items-center justify-center h-[400px]">
          <video muted autoPlay loop>
            <source src={Loading} type="video/webm"></source>
          </video>
        </div>
      </div>
    );
  }
  const OriginalPrice = Math.round(
    singleProduct.price +
      (singleProduct.price * singleProduct.discountPercentage) / 100
  );

  return (
    <div className="px-4 pb-8 md:px-0 flex line-clamp-2">
      <Breadcrums title={singleProduct.title} />
      <div className="max-w-7xl mx-auto md:p-6 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Product Image */}
        <div className="w-full">
          <div className="mb-4">
            <img
              src={singleProduct.images[selectedImage]}
              alt={singleProduct.title}
              className="rounded-2xl w-full  object-cover"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto">
            {singleProduct.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${singleProduct.title} ${index + 1}`}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 ${
                  selectedImage === index ? "border-red-500" : "border-gray-200"
                }`}
                onClick={() => setSelectedImage(index)}
              />
            ))}
          </div>

          {singleProduct.thumbnail && (
            <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
              <Package size={16} />
              <span>Thumbnail available</span>
            </div>
          )}
        </div>

        {/* Product details */}

        <div className="flex flex-col gap-6">
          <div>
            <h1 className="md:text-3xl text-xl font-bold text-gray-800">
              {singleProduct.title}
            </h1>
            <p className="text-gray-600 mt-2">{singleProduct.description}</p>
          </div>

          {/* Rating and Brand */}
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 bg-green-100 text-gray-800 rounded-full px-3 py-1">
              <Star size={16} fill="currentColor" />
              <span className="font-medium">{singleProduct.rating}</span>
            </div>

            <span className="text-gray-700 font-medium">
              {singleProduct.brand}
            </span>
            <span className="text-gray-500">•</span>
            <span className="text-gray-600">{singleProduct.category}</span>
            <span className="text-gray-500">•</span>
            <span className="text-gray-600">SKU: {singleProduct.sku}</span>
          </div>

          {/* Price Section */}
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-red-600">
              ${singleProduct.price}
            </span>
            <span className="text-lg text-gray-500 line-through">
              ${OriginalPrice}
            </span>
            <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-sm font-medium">
              {singleProduct.discountPercentage}% OFF
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${
                singleProduct.stock > 10
                  ? "bg-green-500"
                  : singleProduct.stock > 0
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
            ></div>
            <span
              className={`font-medium ${
                singleProduct.stock > 10
                  ? "text-green-600"
                  : singleProduct.stock > 0
                  ? "text-yellow-500"
                  : "text-red-500"
              }`}
            >
              {singleProduct.stock > 10
                ? "In Stock"
                : singleProduct.stock > 0
                ? "Low Stock"
                : "Out of Stock"}
            </span>
            <span className="text-gray-500">
              ({singleProduct.stock} available)
            </span>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
            {singleProduct.warrantyInformation && (
              <div className="flex items-center gap-2">
                <Shield size={18} className="text-green-600" />
                <span className="text-sm">
                  {singleProduct.warrantyInformation}
                </span>
              </div>
            )}
            {singleProduct.shippingInformation && (
              <div className="flex items-center gap-2">
                <Truck size={18} className="text-blue-600" />
                <span className="text-sm">
                  {singleProduct.shippingInformation}
                </span>
              </div>
            )}

            {singleProduct.returnPolicy && (
              <div className="flex items-center gap-2">
                <RotateCcw size={18} className="text-purple-600" />
                <span className="text-sm">{singleProduct.returnPolicy}</span>
              </div>
            )}
          </div>

          {/* product specification */}

          <div className="border-t pt-4">
            <h3 className="font-semibold text-gray-800 mb-3">Specifications</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-gray-600">Brand:</span>
                <span className="font-medium ml-2">{singleProduct.brand}</span>
              </div>

              <div>
                <spam className="text-gray-600">Category:</spam>
                <spam className="font-medium ml-2">
                  {singleProduct.category}
                </spam>
              </div>

              <div>
                <span className="text-gray-600">SKU:</span>
                <span className="font-medium ml-2">{singleProduct.sku}</span>
              </div>

              <div>
                <span className="text-gray-600">Weight:</span>
                <span className="font-medium ml-2">
                  {singleProduct.weight || "N/A"}
                </span>
              </div>
              {singleProduct.dimensions && (
                <>
                  <div>
                    <span className="text-gray-600">Dimensions:</span>
                    <span className="font-medium ml-2">
                      {singleProduct.dimensions.width} x{" "}
                      {singleProduct.dimensions.height} x{" "}
                      {singleProduct.dimensions.depth}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Review Preview */}
          {singleProduct.reviews && singleProduct.reviews.length > 0 && (
            <div className="border-t pt-4">
              <h3 className="font-semibold text-gray-800 mb-3">
                Recent Review
              </h3>
              <div className="space-y-3">
                {singleProduct.reviews.slice(0, 2).map((review, index) => (
                  <div key={index} className="text-sm">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{review.reviewerName}</span>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={
                              i < review.rating
                                ? "bg-yellow-400 fill-current"
                                : "text-gray-300"
                            }
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 mt-1">{review.comment}</p>
                    <span className="text-gray-400 text-xs">{review.data}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quantety */}
          <div className="border-t pt-6">
            <div className="flex items-center gap-4 mb-4">
              <label
                htmlFor="quantity"
                className="text-sm font-medium text-gray-600"
              >
                Quantuty
              </label>
              <input
                type="number"
                id="quantity"
                min={1}
                max={singleProduct.stock}
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="w-20 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              />

              <span className="text-sm text-gray-500">
                Max: {singleProduct.stock}
              </span>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => addToCart({...singleProduct, quantity})}
                disabled={singleProduct.stock === 0}
                className="px-6 flex gap-2 py-3 text-lg bg-red-500 text-white rounded-md hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                <IoCartOutline className="w-6 h-6" />
                {singleProduct.stock === 0 ? "Out of Stock" : "Add to Cart"}
              </button>

              <button
                disabled={singleProduct.stock === 0}
                className="px-6 py-3 text-lg border border-red-500 text-red-500  rounded-md hover:bg-red-50 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                onClick={() => { 
                  addToCart({...singleProduct, quantity});
                  navigate("/cart");
                }
               }
              >
                Buy Now
              </button>
            </div>
            <div className="mt-4 text-sm text-gray-600">
              <p>{singleProduct.availabilityStatus}</p>
            </div>
          </div>
        </div>
      </div>

      {/* tags */}
    </div>
  );
};

export default SingleProduct;
