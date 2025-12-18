import { Mail, MapPinHouse, Phone } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-linear-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] flex items-center justify-center px-4 py-10">
      <div className="backdrop-blur-md bg-white/10  border border-white/20 rounded-2xl shadow-2xl p-10 w-full max-w-5xl">
        <h2 className="text-4xl font-bold  text-white text-center mb-10">
          Get in Touch with <span className="text-red-400">Zink</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="text-white space-y-6">
            <div>
              <h3 className="text-2xl font-semibold">Contact Info</h3>
              <p className="text-gray-300">
                Have a question or need support? We're here to help you with
                your electronics journey.
              </p>
            </div>

            <div>
              <p>
                <span className="font-bold">
                  <MapPinHouse size={16} />
                  Address:
                </span>
                123 Teach line, Gujrat, India
              </p>
              <p>
                <span className="font-bold">
                  <Mail size={16} />
                  Email:
                </span>
                suppor@zink.com
              </p>
              <p>
                <span className="font-bold">
                  <Phone size={16} />
                  Phone:
                </span>
                +91 9574880493
              </p>
            </div>
          </div>

          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-white mb-1">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Sohil Hingora"
                className="w-full px-4 py-2 bg-white/20 border border-white/30 text-white rounded-xl placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-white mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="sohil@example.com"
                className="w-full px-4 py-2 bg-white/20 border border-white/30 text-white rounded-xl placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-white mb-1">
                Your Massege
              </label>

              <textarea
                rows="4"
                placeholder="Type your message..."
                name="message"
                id="message"
                className="w-full px-4 py-2 bg-white/20 border border-white/30 text-white rounded-xl placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            <button type="submit" className="w-full bg-linear-to-r from-red-500 to-purple-500 text-white font-semibold py-2 rounded-xl hover:opacity-90 transition-all duration-300">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
