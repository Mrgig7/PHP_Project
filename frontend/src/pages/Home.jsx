// Home.jsx

import { useEffect, useState, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import CountUp from "react-countup";
import ProductCard from "../components/ProductCard";
import CardSection from "../components/CardSection";

const Home = () => {
  const [isInView, setIsInView] = useState(false);
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    phone: "",
  });
  const [formMessage, setFormMessage] = useState("");
  const navigate = useNavigate();
  const statsRef = useRef(null);

  // Define product information based on catalog details
  const products = useMemo(() => [
    {
      title: "Seed Starter / Coco Disc",
      description:
        "Specially formulated and pH-balanced for germination with options for buffered or triple-washed material.",
    },
    {
      title: "Coco Cube / Grow Cube",
      description:
        "100% coco coir cubes with various sizes, ideal for multiple grow systems with no switching costs.",
    },
    {
      title: "Open Top / Grow Pot",
      description:
        "Pre-mixed coco blend for indoor, greenhouse, and outdoor growth with options for plastic or non-woven containers.",
    },
    {
      title: "Grow Bags",
      description:
        "Moisture-manage technology ensuring uniform moisture content, minimizing run-off and enhancing crop quality.",
    },
    {
      title: "Coco Brick",
      description: "5 kg compressed coco blocks for versatile use.",
    },
    {
      title: "Coco Heart",
      description:
        "Blocks with embedded names and logos, customized as per requirements.",
    },
    {
      title: "Coco Mix",
      description: "Custom coco mix options for specific grow requirements.",
    },
    {
      title: "Coco Supreme",
      description: "Premium coco coir with customized material options.",
    },
  ], []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email
    if (!formData.email.includes("@")) {
      setFormMessage("Please enter a valid email address.");
      return;
    }

    try {
      const response = await fetch("http://localhost/React/enquiry_form.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
        }),
        credentials: "include",
      });

      if (response.ok) {
        setFormMessage("Form submitted successfully!");
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      } else {
        const errorData = await response.json();
        setFormMessage(`Failed to submit the form. ${errorData.message}`);
      }
    } catch (error) {
      setFormMessage("An error occurred. Please try again later.");
    }
  };

  // Rotate products every few seconds
  useEffect(() => {
    const rotateProducts = setInterval(() => {
      setVisibleProducts((prevProducts) => {
        const start = products.indexOf(prevProducts[0]) + 4;
        return products
          .slice(start, start + 4)
          .concat(
            products.slice(
              0,
              start > products.length - 4 ? start + 4 - products.length : 0
            )
          );
      });
    }, 5000); // Rotate every 5 seconds

    return () => clearInterval(rotateProducts);
  }, []);

  // Intersection observer for stats animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) observer.unobserve(statsRef.current);
    };
  }, []);

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full h-screen bg-cover bg-center bg-hero-pattern flex items-center justify-center text-white text-center relative px-4 sm:px-6 animate-fade-in">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative max-w-lg animate-fade-in">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-3 sm:mb-4 tracking-wider animate-slide-down">
            Eco-Friendly Coir Solutions
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-4 sm:mb-6 animate-fade-in-delay px-2">
            Enhancing sustainable agriculture with high-quality coco coir products.
          </p>
          <button
            onClick={() => navigate("/products")}
            className="bg-green-500 text-white py-3 px-6 rounded hover:bg-green-600 transition transform hover:scale-105 animate-bounce text-lg"
          >
            Explore Products
          </button>
        </div>
      </section>

      {/* New Card Layout Section */}
      <CardSection />

      {/* Stats Section */}
      <section
        ref={statsRef}
        className="py-8 sm:py-10 w-full bg-gray-100 flex flex-col sm:flex-row justify-around items-center text-center space-y-6 sm:space-y-0 px-4"
      >
        <div className="flex flex-col items-center">
          <h3 className="text-3xl sm:text-4xl font-bold text-green-500">
            {isInView && <CountUp start={0} end={50} duration={2.5} />}+
          </h3>
          <p className="text-base sm:text-lg text-gray-700 mt-2">Customers</p>
        </div>
        <div className="flex flex-col items-center">
          <h3 className="text-3xl sm:text-4xl font-bold text-green-500">
            {isInView && <CountUp start={0} end={100} duration={2.5} />}+
          </h3>
          <p className="text-base sm:text-lg text-gray-700 mt-2">Tons of Products</p>
        </div>
        <div className="flex flex-col items-center">
          <h3 className="text-3xl sm:text-4xl font-bold text-green-500">
            {isInView && <CountUp start={0} end={5} duration={2.5} />}+
          </h3>
          <p className="text-base sm:text-lg text-gray-700 mt-2">Countries Served</p>
        </div>
      </section>

      {/* Product Showcase */}
      <section className="py-8 sm:py-10 w-full flex flex-col items-center px-4">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-6 sm:mb-8 text-green-500">
          Our Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full max-w-6xl animate-slide-up">
          {visibleProducts.map((product, index) => (
            <ProductCard
              key={index}
              title={product.title}
              description={product.description}
              imageUrl="https://via.placeholder.com/150" // Add a placeholder image or actual image URL
            />
          ))}
        </div>
        <button
          onClick={() => navigate("/products")}
          className="bg-green-500 text-white py-3 px-6 mt-4 rounded hover:bg-green-600 transition text-lg"
        >
          See All Products
        </button>
      </section>

      {/* Contact Form Section */}
      <div className="w-full max-w-4xl mx-auto px-4 py-8 sm:py-10">
        <div className="bg-white rounded-lg shadow-xl p-4 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Contact Info */}
            <div className="bg-green-50 p-4 sm:p-6 rounded-lg">
              <h3 className="text-xl sm:text-2xl font-bold text-green-800 mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="text-gray-600">123 Business Street, City, Country</p>
                </div>
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <p className="text-gray-600">contact@example.com</p>
                </div>
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <p className="text-gray-600">+1 234 567 890</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-4">
                <div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <input
                    id="phone"
                    name="phone"
                    type="text"
                    required
                    className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows="4"
                    className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-2 sm:py-3 px-4 sm:px-6 text-white bg-green-600 hover:bg-green-700 rounded-md transition duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 text-sm sm:text-base"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
      {formMessage && <p className="text-green-500 mt-4">{formMessage}</p>}
    </div>
  );
};

export default Home;
 