import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";

const SERVICE_ID = "service_9yd1n4p";         
const ADMIN_TEMPLATE_ID = "template_hjl2usu"; 
const REPLY_TEMPLATE_ID = "template_kpvwb8m";  
const PUBLIC_KEY = "D9EU6dPNWw6qO0DF7";             

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEmail = async (templateId, variables) => {
    return emailjs.send(SERVICE_ID, templateId, variables, PUBLIC_KEY);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("Please fill all required fields.");
      return;
    }

    setLoading(true);
    setStatus("");

    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone || "Not provided",
      message: formData.message,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    };

    try {
      await sendEmail(ADMIN_TEMPLATE_ID, payload);
      await sendEmail(REPLY_TEMPLATE_ID, payload);

      setStatus("Thank you! We sent you a confirmation email.");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      setStatus("Failed to send. Try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id='contact' className="relative min-h-screen flex items-center justify-center overflow-hidden py-16 md:py-20 px-4">
      {/* Responsive Glow Effects - Scaled down for mobile */}
      <div className="absolute top-10 left-10 md:top-20 md:left-20 w-48 h-48 md:w-96 md:h-96 bg-purple-500/10 md:bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 right-10 md:bottom-20 md:right-20 w-48 h-48 md:w-96 md:h-96 bg-blue-500/10 md:bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />

      <motion.div
        initial={{ opacity: 0, x: window.innerWidth < 768 ? 50 : 200 }} // Smaller x offset for mobile
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.2 }} // Triggers earlier on mobile
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-2xl mx-auto px-4 md:px-6"
      >
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-blue-200">
            Get in Touch
          </h2>
          <p className="mt-2 md:mt-3 text-purple-300/70 text-sm md:text-base">We'll reply in 24 hours</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <Input label="Name *" name="name" value={formData.name} onChange={handleChange} />
            <Input label="Email *" type="email" name="email" value={formData.email} onChange={handleChange} />
          </div>

          <Input label="Phone (Optional)" name="phone" value={formData.phone} onChange={handleChange} />

          <div>
            <label className="block text-xs md:text-sm font-medium text-purple-200 mb-2">Message *</label>
            <textarea
              name="message"
              rows={4}
              required
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-white/5 text-white placeholder-purple-300/50 border border-purple-500/20 focus:ring-2 focus:ring-purple-500/40 focus:border-transparent backdrop-blur-sm resize-none text-sm md:text-base"
              placeholder="Type your message..."
            />
          </div>

          {status && (
            <p className={`text-center text-xs md:text-sm font-medium ${status.includes("Thank") ? "text-green-400" : "text-red-400"}`}>
              {status}
            </p>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full py-3 md:py-4 text-base md:text-lg font-bold bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 rounded-xl text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all disabled:opacity-70"
          >
            {loading ? "Sending..." : "Send Message"}
          </motion.button>
        </form>
      </motion.div>
    </section>
  );
}

function Input({ label, name, type = "text", value, onChange }) {
  return (
    <div>
      <label className="block text-xs md:text-sm font-medium text-purple-200 mb-2">{label}</label>
      <input
        type={type}
        name={name}
        required={label.includes("*")}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 rounded-xl bg-white/5 text-white placeholder-purple-300/50 border border-purple-500/20 focus:ring-2 focus:ring-purple-500/40 focus:border-transparent backdrop-blur-sm text-sm md:text-base"
        placeholder={label.replace("*", "")}
      />
    </div>
  );
}