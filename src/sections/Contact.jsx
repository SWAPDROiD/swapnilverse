import React, { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import {
  MAILTO,
  TEL,
  ZENDESK,
  EMAIL,
  PHONE,
} from "../constants/links";
import SocialLinks from "../common/SocialLinks";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "";
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "";
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "";

const sectionVariant = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const field = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } };

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [toast, setToast] = useState(null);

  // initialize emailjs if a public key is provided
  React.useEffect(() => {
    if (PUBLIC_KEY) {
      try {
        emailjs.init(PUBLIC_KEY);
      } catch (e) {
        console.warn("emailjs init failed", e);
      }
    }
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const validEmail = (mail) => /^\S+@\S+\.\S+$/.test(mail);

  const showToast = (s) => {
    setToast(s);
    try {
      window.clearTimeout(window._cv_toast_timeout);
    } catch (e) {}
    window._cv_toast_timeout = setTimeout(() => setToast(null), 4000);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      const s = { type: "error", msg: "Please fill all fields" };
      setStatus(s);
      showToast(s);
      return;
    }
    if (!validEmail(form.email)) {
      const s = { type: "error", msg: "Please enter a valid email" };
      setStatus(s);
      showToast(s);
      return;
    }
    setLoading(true);
    setStatus(null);
    // If EmailJS isn't configured, gracefully fallback to mailto so user can still contact
    const emailjsConfigured = SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY;
    if (!emailjsConfigured) {
      console.warn("EmailJS not configured - falling back to mailto");
      const subject = encodeURIComponent(`Contact from ${form.name}`);
      const body = encodeURIComponent(
        `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`,
      );
      window.location.href = `${MAILTO}?subject=${subject}&body=${body}`;
      const s = {
        type: "success",
        msg: "Opened mail client as fallback. Please send the message.",
      };
      setStatus(s);
      showToast(s);
      setLoading(false);
      return;
    }

    try {
      const res = await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          message: `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`,
          to_email: EMAIL,
        },
        PUBLIC_KEY,
      );
      console.debug("EmailJS send response", res);
      const s = {
        type: "success",
        msg: "Message sent successfully! I will reply soon.",
      };
      setStatus(s);
      showToast(s);
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("EmailJS Error:", err);
      const msg =
        err?.text ||
        err?.statusText ||
        (err?.message && String(err.message)) ||
        "Failed to send message. Please try again.";
      const s = { type: "error", msg };
      setStatus(s);
      showToast(s);
      // fallback: open mail client with prefilled content so user can still send
      try {
        const subject = encodeURIComponent(`Contact from ${form.name}`);
        const body = encodeURIComponent(
          `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`,
        );
        // Delay slightly so error message is visible before navigating
        setTimeout(() => {
          window.location.href = `${MAILTO}?subject=${subject}&body=${body}`;
        }, 800);
      } catch (e) {
        console.warn("mailto fallback failed", e);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.section
      id="contact"
      className="py-20 relative overflow-hidden"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={sectionVariant}
    >
      {/* subtle animated background blobs */}
      <div className="absolute -left-20 -top-20 w-72 h-72 bg-gradient-to-br from-purple-600 via-pink-500 to-indigo-400 opacity-20 rounded-full blur-3xl animate-[pulse_6s_ease-in-out_infinite]" />
      <div className="absolute -right-28 bottom-4 w-96 h-96 bg-gradient-to-tr from-indigo-500 via-purple-600 to-pink-400 opacity-18 rounded-full blur-3xl animate-[pulse_8s_ease-in-out_infinite]" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Toast (top-right) */}
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed right-4 top-4 z-50"
          >
            <div
              className={`max-w-xs px-4 py-3 rounded-lg shadow-lg text-white ${toast.type === "success" ? "bg-green-600" : "bg-red-600"}`}
            >
              {toast.msg}
            </div>
          </motion.div>
        )}
        <motion.h2
          className="text-3xl font-bold mb-6 text-white"
          variants={sectionVariant}
        >
          Let's Build Something Amazing 🚀
        </motion.h2>

        <motion.div
          className="grid lg:grid-cols-2 gap-8 items-start"
          variants={stagger}
        >
          {/* LEFT SIDE */}
          <motion.div className="space-y-4" variants={field}>
            <p className="mt-4 text-lg text-[#cbd5e1]">
              Open to full-time roles, freelance work, and collaborations.
            </p>

            <div className="flex flex-wrap gap-3 mt-4">
              <div className="px-4 py-2 rounded-full bg-white/6 backdrop-blur-sm border border-white/6 text-sm font-medium">
                10+ Years Experience
              </div>
              <div className="px-4 py-2 rounded-full bg-white/6 backdrop-blur-sm border border-white/6 text-sm font-medium">
                20+ Applications Delivered
              </div>
              <div className="px-4 py-2 rounded-full bg-white/6 backdrop-blur-sm border border-white/6 text-sm font-medium">
                Currently at{" "}
                <a
                  href={ZENDESK}
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary hover:underline"
                >
                  Zendesk Pune
                </a>
              </div>
            </div>

            <div className="mt-8">
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-[#94A3B8]">
                Reach me directly
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={MAILTO}
                  className="inline-flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:border-primary/50"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <FaEnvelope aria-hidden="true" />
                  </span>
                  <span className="flex flex-col">
                    <span className="text-xs uppercase tracking-[0.16em] text-[#94A3B8]">
                      Email
                    </span>
                    <span className="hover:underline">{EMAIL}</span>
                  </span>
                </a>
                <a
                  href={TEL}
                  className="inline-flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:border-primary/50"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <FaPhoneAlt aria-hidden="true" />
                  </span>
                  <span className="flex flex-col">
                    <span className="text-xs uppercase tracking-[0.16em] text-[#94A3B8]">
                      Phone
                    </span>
                    <span className="hover:underline">{PHONE}</span>
                  </span>
                </a>
              </div>
            </div>
            
            <SocialLinks size="lg" variant="default" showTooltip />
          </motion.div>

          {/* RIGHT SIDE - FORM */}
          <motion.div variants={field} className="relative mt-4 lg:mt-6">
            <form
              onSubmit={submit}
              className="relative glass p-6 rounded-2xl backdrop-blur-md border border-white/6 shadow-lg"
            >
              <motion.div variants={stagger} className="grid gap-4">
                <div className="relative">
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder=" "
                    className="peer w-full bg-transparent border border-white/8 rounded-lg px-4 py-3 outline-none transition-transform duration-300 ease-in-out transform focus:scale-[1.02] focus:shadow-[0_0_18px_rgba(139,92,246,0.18)]"
                  />
                  {!form.name && (
                    <label className="absolute left-4 top-[calc(50%+2px)] -translate-y-1/2 text-sm text-[#94A3B8] pointer-events-none transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:-translate-y-4 peer-focus:text-xs">
                      Name
                    </label>
                  )}
                </div>

                <div className="relative">
                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder=" "
                    className="peer w-full bg-transparent border border-white/8 rounded-lg px-4 py-3 outline-none transition-transform duration-300 ease-in-out transform focus:scale-[1.02] focus:shadow-[0_0_18px_rgba(236,72,153,0.14)]"
                  />
                  {!form.email && (
                    <label className="absolute left-4 top-[calc(50%+2px)] -translate-y-1/2 text-sm text-[#94A3B8] pointer-events-none transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:-translate-y-4 peer-focus:text-xs">
                      Email
                    </label>
                  )}
                </div>

                <div className="relative">
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder=" "
                    rows={6}
                    className="peer w-full bg-transparent border border-white/8 rounded-lg px-4 py-3 outline-none resize-none transition-transform duration-300 ease-in-out transform focus:scale-[1.01] focus:shadow-[0_0_22px_rgba(99,102,241,0.12)]"
                  />
                  {!form.message && (
                    <label className="absolute left-4 top-[calc(1rem+2px)] text-sm text-[#94A3B8] pointer-events-none transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:-translate-y-4 peer-focus:text-xs">
                      Message
                    </label>
                  )}
                </div>

                <div className="flex items-center justify-between gap-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`inline-flex items-center justify-center gap-3 px-6 py-3 rounded-full text-white transform transition-all duration-300 ${loading ? "opacity-70 cursor-not-allowed" : "hover:scale-105"}`}
                    style={{
                      background:
                        "linear-gradient(90deg,#6366F1 0%,#7C3AED 50%,#EC4899 100%)",
                    }}
                  >
                    {loading && (
                      <svg
                        className="w-4 h-4 animate-spin"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="rgba(255,255,255,0.25)"
                          strokeWidth="4"
                        />
                        <path
                          d="M22 12a10 10 0 00-10-10"
                          stroke="#fff"
                          strokeWidth="4"
                          strokeLinecap="round"
                        />
                      </svg>
                    )}
                    <span className="font-medium">
                      {loading ? "Sending..." : "Send Message 🚀"}
                    </span>
                  </button>
                </div>
              </motion.div>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
