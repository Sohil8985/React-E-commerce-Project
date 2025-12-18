import { useEffect } from "react";
import { getData } from "../context/DataContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import Category from "./Category";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { toast } from "react-toastify";

const Carousel = () => {
  const { data, fetchAllProducts } = getData();
  const {addToCart} = useCart();
  const {user} = useUser()
  const navigate = useNavigate()
  console.log(data);
  useEffect(() => {
    fetchAllProducts();
  }, []);

  const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        onClick={onClick}
        className={`arrow ${className} `}
        style={{ zIndex: 3 }}
      >
        <AiOutlineArrowLeft
          className="arrows"
          style={{
            ...style,
            display: "block",
            borderRadius: "50px",
            background: "#f53347",
            color: "white",
            pauseOnHover: false,
            position: "absolute",
            padding: "2px",
            left: "50px",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "red")}
        />
      </div>
    );
  };

  const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div onClick={onClick} className={`arrow ${className}`}>
        <AiOutlineArrowRight
          className="arrows"
          style={{
            ...style,
            display: "block",
            borderRadius: "50px",
            background: "#f53347",
            color: "white",
            position: "absolute",
            padding: "2px",
            right: "50px",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "red")}
        />
      </div>
    );
  };

  var settings = {
    dots: false,
    autoplay: true,
    autoplaySpeed: 2000,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow to="next" />,
    prevArrow: <SamplePrevArrow to="prev" />,
  };

 const  handleShopButton = (item) => {
  if (user) {
      addToCart({ ...item });
      toast.success("Add to cart")
      navigate("/cart");
  }else {
      toast.error("Please login to countinue")
  }
 } 

  return (
    <div>
      <Slider {...settings}>
        {data?.slice(0, 7)?.map((item, index) => {
          return (
            <div
              key={index}
              className="bg-linear-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] -z-10"
            >
              <div className="flex flex-col md:flex-row justify-center h-[600px] items-center px-10 md:px-20  gap-10">
                <div className="flex-1 space-y-1 md:space-y-6">
                  <h3 className="text-gray-300 font-semibold text-xs mt-10 mmd:text-sm">
                    Powering Your World with Best in Electronics
                  </h3>
                  <h1 className="text-2xl md:text-4xl font-bold uppercase text-white line-clamp-2">
                    {item.title}
                  </h1>
                  <p className="md:w-[450px] text-sm md:text-base text-gray-300 pr-7">
                    {item.description}
                  </p>
                  <button
                    onClick={() => handleShopButton(item)}
                    className="bg-linear-to-r from-red-500 to-purple-500 text-white px-3 py-2 rounded-md cursor-pointer mt-2"
                  >
                    Shop Now
                  </button>
                </div>
                <div className="flex-1 flex justify-center mb-8 md:mb-0">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="bg-blue-50 rounded-full md:w-[450px] w-[250px] lg:w=[550px] hover:scale-105 transition-all shadow-2xl shadow-red-00"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
      <Category />
    </div>
  );
};

export default Carousel;
