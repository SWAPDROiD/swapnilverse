"use client";

import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import Section from "@/components/Section";
import SocialLinks from "@/components/SocialLinks";
import { EMAIL, MAILTO, PHONE, TEL, ZENDESK } from "@/constants/links";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

interface StatusMessage {
  type: "success" | "error";
  msg: string;
}

const sectionVariant = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const field = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } };

function getEmailConfig() {
  return {
    serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
    templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",
    publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "",
    contactTarget: process.env.NEXT_PUBLIC_CONTACT_TO_EMAIL || EMAIL,
  };
}

export default function Contact() {
  const [form, setForm] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<StatusMessage | null>(null);
  const [toast, setToast] = useState<StatusMessage | null>(null);
  const toastTimeoutRef = useRef<number | null>(null);

  const validEmail = (mail: string) => /^\S+@\S+\.\S+$/.test(mail);

  const showToast = (message: StatusMessage) => {
    setToast(message);
    if (toastTimeoutRef.current) {
      window.clearTimeout(toastTimeoutRef.current);
    }
    toastTimeoutRef.current = window.setTimeout(() => setToast(null), 4000);
  };

  useEffect(() => {
    const { publicKey } = getEmailConfig();

    if (publicKey) {
      emailjs.init({
        publicKey,
        blockHeadless: true,
      });
    }

    return () => {
      if (toastTimeoutRef.current) {
        window.clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { serviceId, templateId, publicKey, contactTarget } = getEmailConfig();

    if (!form.name || !form.email || !form.message) {
      const nextStatus = { type: "error", msg: "Please fill all fields" } satisfies StatusMessage;
      setStatus(nextStatus);
      showToast(nextStatus);
      return;
    }

    if (!validEmail(form.email)) {
      const nextStatus = {
        type: "error",
        msg: "Please enter a valid email",
      } satisfies StatusMessage;
      setStatus(nextStatus);
      showToast(nextStatus);
      return;
    }

    if (!serviceId || !templateId || !publicKey) {
      const nextStatus = {
        type: "error",
        msg: "EmailJS is not configured. Add NEXT_PUBLIC_EMAILJS_* variables to .env.local.",
      } satisfies StatusMessage;
      setStatus(nextStatus);
      showToast(nextStatus);
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
          to_email: contactTarget,
        },
        publicKey,
      );

      const nextStatus = {
        type: "success",
        msg: "Message sent successfully! I will reply soon.",
      } satisfies StatusMessage;
      setStatus(nextStatus);
      showToast(nextStatus);
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      const nextStatus = {
        type: "error",
        msg: error instanceof Error ? error.message : "Failed to send message. Please try again.",
      } satisfies StatusMessage;
      setStatus(nextStatus);
      showToast(nextStatus);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section id="contact" className="relative overflow-hidden py-20">
      <motion.div
        className="absolute left-0 top-0 h-72 w-72 -translate-x-1/3 -translate-y-1/3 rounded-full bg-gradient-to-br from-purple-600 via-pink-500 to-indigo-400 opacity-20 blur-3xl"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-4 right-0 h-96 w-96 translate-x-1/3 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-600 to-pink-400 opacity-20 blur-3xl"
        animate={{ scale: [1, 1.04, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="relative mx-auto max-w-6xl px-6">
        {toast ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed right-4 top-4 z-50"
            aria-live="polite"
          >
            <div
              className={`max-w-xs rounded-lg px-4 py-3 text-white shadow-lg ${
                toast.type === "success" ? "bg-green-600" : "bg-red-600"
              }`}
            >
              {toast.msg}
            </div>
          </motion.div>
        ) : null}

        <motion.h2
          className="mb-6 text-3xl font-bold text-slate-950 dark:text-white"
          variants={sectionVariant}
        >
          Let&apos;s Build Something Amazing
        </motion.h2>

        <motion.div
          className="grid items-start gap-8 lg:grid-cols-2"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.div className="min-w-0 space-y-4" variants={field}>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
              Open to full-time roles, freelance work, and collaborations.
            </p>

            <div className="mt-4 mb-4 flex flex-wrap gap-3">
              <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium backdrop-blur-sm">
                10+ Years Experience
              </div>
              <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium backdrop-blur-sm">
                20+ Applications Delivered
              </div>
              <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium backdrop-blur-sm">
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

            <div className="mt-8 pt-4">
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                Reach me directly
              </p>
              <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={MAILTO}
                  className="inline-flex min-w-0 items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-900 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:border-primary/50 dark:text-white"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <FaEnvelope aria-hidden="true" />
                  </span>
                  <span className="flex min-w-0 flex-col">
                    <span className="text-xs uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                      Email
                    </span>
                    <span className="break-all hover:underline">{EMAIL}</span>
                  </span>
                </a>

                <a
                  href={TEL}
                  className="inline-flex min-w-0 items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-900 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:border-primary/50 dark:text-white"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <FaPhoneAlt aria-hidden="true" />
                  </span>
                  <span className="flex min-w-0 flex-col">
                    <span className="text-xs uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                      Phone
                    </span>
                    <span className="hover:underline">{PHONE}</span>
                  </span>
                </a>
              </div>
            </div>

            <SocialLinks size="lg" variant="rounded" showTooltip />
          </motion.div>

          <motion.div variants={field} className="relative mt-4 min-w-0 lg:mt-6">
            <form
              onSubmit={submit}
              className="glass relative rounded-2xl border border-white/10 p-6 shadow-lg"
            >
              <motion.div variants={stagger} className="grid gap-4">
                <div className="relative">
                  <input
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder=" "
                    className="peer w-full rounded-lg border border-white/10 bg-transparent px-4 py-3 outline-none transition-transform duration-300 ease-in-out focus:scale-[1.02] focus:shadow-[0_0_18px_rgba(139,92,246,0.18)]"
                  />
                  {!form.name ? (
                    <label
                      htmlFor="name"
                      className="pointer-events-none absolute left-4 top-[calc(50%+2px)] -translate-y-1/2 text-sm text-slate-500 transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:-translate-y-4 peer-focus:text-xs dark:text-slate-400"
                    >
                      Name
                    </label>
                  ) : null}
                </div>

                <div className="relative">
                  <input
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder=" "
                    className="peer w-full rounded-lg border border-white/10 bg-transparent px-4 py-3 outline-none transition-transform duration-300 ease-in-out focus:scale-[1.02] focus:shadow-[0_0_18px_rgba(236,72,153,0.14)]"
                  />
                  {!form.email ? (
                    <label
                      htmlFor="email"
                      className="pointer-events-none absolute left-4 top-[calc(50%+2px)] -translate-y-1/2 text-sm text-slate-500 transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:-translate-y-4 peer-focus:text-xs dark:text-slate-400"
                    >
                      Email
                    </label>
                  ) : null}
                </div>

                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder=" "
                    rows={6}
                    className="peer w-full resize-none rounded-lg border border-white/10 bg-transparent px-4 py-3 outline-none transition-transform duration-300 ease-in-out focus:scale-[1.01] focus:shadow-[0_0_22px_rgba(99,102,241,0.12)]"
                  />
                  {!form.message ? (
                    <label
                      htmlFor="message"
                      className="pointer-events-none absolute left-4 top-[calc(1rem+2px)] text-sm text-slate-500 transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:-translate-y-4 peer-focus:text-xs dark:text-slate-400"
                    >
                      Message
                    </label>
                  ) : null}
                </div>

                <div className="flex items-center justify-between gap-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`inline-flex items-center justify-center gap-3 rounded-full px-6 py-3 text-white transition-all duration-300 ${
                      loading ? "cursor-not-allowed opacity-70" : "hover:scale-105"
                    }`}
                    style={{
                      background:
                        "linear-gradient(90deg,#6366F1 0%,#7C3AED 50%,#EC4899 100%)",
                    }}
                  >
                    {loading ? (
                      <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
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
                    ) : null}
                    <span className="font-medium">{loading ? "Sending..." : "Send Message"}</span>
                  </button>
                </div>

              </motion.div>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
}
