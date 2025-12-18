import { Link } from "lucide-react";
import {
  FaFacebook,
  FaInstagram,
  FaPinterest,
  FaTwitter,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 py-10">
      <div className="max-w-7xl mx-auto px-4 md:flex md:justify-between ">
        {/* info */}
        <div className="mb-6 md:mb-0 ">
          <Link to="/">
            <h1 className="text-red-500 text-2xl font-bold ">Zink</h1>
          </Link>

          <p className="mt-2 text-sm">
            Powering Your World with the Best in Electronics
          </p>
          <p className="mt-2 text-sm">
            123 Electronics St, Style City, Ny-10001
          </p>
          <p className="text-sm">Email: support@zink.com</p>
          <p className="text-sm">Phone: +91 1234567890</p>
        </div>

        <div className="mb-6 md:mb-0">
          <h3 className="text-xl font-semibold">Customer Service</h3>
          <ul className="mt-2 text-sm space-y-2">
            <li>Contact Us</li>
            <li>Shipping & Return</li>
            <li>FAQs</li>
            <li>Order Tracking</li>
            <li>Size Guide</li>
          </ul>
        </div>
        {/* Social Media Link */}
        <div className="mb-6 md:mb-0">
          <h3 className="text-xl font-semibold">Follow Us</h3>
          <div className="flex space-x-4 mt-2">
            <FaFacebook />
            <FaInstagram />
            <FaTwitter />
            <FaPinterest />
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold ">Stay in the Loop</h3>
          <p className="mt-2 text-sm">
            Subscribe to get special offers, free giveaways, and more
          </p>

          <form className="mt-4 flex">
            <input
              type="email"
              placeholder="Your Email Address"
              className="w-full p-2 rounded-l-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
            <button
              type="submit"
              className="bg-red-600 text-white px-4 rounded-r-md hover:bg-red-700"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-700 pt-6 text-center text-sm">
        <p>
          &copy; {new Date().getFullYear()}
          <span className="text-red-500"> Zink</span>. All right reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
