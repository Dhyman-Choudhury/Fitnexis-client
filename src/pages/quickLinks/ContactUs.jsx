import React, { useEffect, useState } from "react";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.title = "Contact Us | Techory";
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="bg-gray-200 min-h-screen py-10 px-2  md:px-6 my-10">
      <div className=" mx-auto bg-white shadow-lg rounded-xl p-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-8">
          Contact <span className="text-primary">Us</span>
        </h1>
        <p className="text-center text-gray-600 mb-10">
          Have a question, suggestion, or collaboration idea? We’d love to hear from you.
        </p>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Information */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <FaMapMarkerAlt className="text-primary text-2xl" />
              <p className="text-gray-700">123 AI Innovation Street, Dhaka, Bangladesh</p>
            </div>
            <div className="flex items-center gap-4">
              <FaPhoneAlt className="text-primary text-2xl" />
              <p className="text-gray-700">+88 0 123-4567</p>
            </div>
            <div className="flex items-center gap-4">
              <FaEnvelope className="text-primary text-2xl" />
              <p className="text-gray-700">support@fitnexis.ai</p>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="input input-bordered w-full px-4 py-2 rounded-lg bg-gray-100"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="input input-bordered w-full px-4 py-2 rounded-lg bg-gray-100"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
              className="textarea textarea-bordered w-full px-4 py-2 rounded-lg h-32 bg-gray-100"
            />
            <button
              type="submit"
              className="btn btn-primary w-full py-2 rounded-lg"
            >
              Send Message
            </button>
            {submitted && (
              <p className="text-green-600 text-center font-semibold">
                ✅ Message sent successfully!
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
