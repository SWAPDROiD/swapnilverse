"use client";

import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  FaCheckCircle,
  FaEnvelope,
  FaExclamationTriangle,
  FaPhoneAlt,
  FaTimes,
} from "react-icons/fa";
import Section from "@/components/Section";
import SocialLinks from "@/components/SocialLinks";
import { EMAIL, KOFI, MAILTO, PHONE, TEL, ZENDESK } from "@/constants/links";
import { i18n } from "@/i18n";

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
    const { serviceId, templateId, publicKey, contactTarget } =
      getEmailConfig();

    if (!form.name || !form.email || !form.message) {
      const nextStatus = {
        type: "error",
        msg: i18n.contact.validation.fillAllFields,
      } satisfies StatusMessage;
      setStatus(nextStatus);
      showToast(nextStatus);
      return;
    }

    if (!validEmail(form.email)) {
      const nextStatus = {
        type: "error",
        msg: i18n.contact.validation.validEmail,
      } satisfies StatusMessage;
      setStatus(nextStatus);
      showToast(nextStatus);
      return;
    }

    if (!serviceId || !templateId || !publicKey) {
      const nextStatus = {
        type: "error",
        msg: i18n.contact.validation.configError,
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
        msg: i18n.contact.messages.success,
      } satisfies StatusMessage;
      setStatus(nextStatus);
      showToast(nextStatus);
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      const nextStatus = {
        type: "error",
        msg:
          error instanceof Error
            ? error.message
            : i18n.contact.messages.error,
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
            className="fixed right-4 top-4 z-50 w-[min(92vw,28rem)]"
            aria-live="polite"
          >
            <div
              className={`relative overflow-hidden rounded-2xl border bg-[#121212]/95 p-4 text-white shadow-[0_18px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl ${
                toast.type === "success"
                  ? "border-primary/35"
                  : "border-rose-400/35"
              }`}
            >
              <div
                className={`pointer-events-none absolute inset-0 ${
                  toast.type === "success"
                    ? "bg-[radial-gradient(circle_at_left,rgba(124,58,237,0.14),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent)]"
                    : "bg-[radial-gradient(circle_at_left,rgba(251,113,133,0.16),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent)]"
                }`}
              />
              <div className="relative flex items-start gap-4">
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border ${
                    toast.type === "success"
                      ? "border-primary/30 bg-primary/12 text-primary"
                      : "border-rose-400/30 bg-rose-400/12 text-rose-300"
                  }`}
                >
                  {toast.type === "success" ? (
                    <FaCheckCircle aria-hidden="true" className="h-5 w-5" />
                  ) : (
                    <FaExclamationTriangle
                      aria-hidden="true"
                      className="h-5 w-5"
                    />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p
                        className={`text-xs font-semibold uppercase tracking-[0.28em] ${
                          toast.type === "success"
                            ? "text-primary"
                            : "text-rose-300"
                        }`}
                      >
                        {toast.type === "success"
                          ? "Message Sent"
                          : "Transmission Error"}
                      </p>
                      <p className="mt-1 pr-2 text-base leading-6 text-white/88">
                        {toast.msg}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setToast(null)}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full text-white/45 transition-colors hover:text-white/75"
                      aria-label="Dismiss notification"
                    >
                      <FaTimes aria-hidden="true" className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
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
              {i18n.contact.openTo}
            </p>

            <div className="mt-4 mb-4 flex flex-wrap gap-3">
              <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium backdrop-blur-sm">
                {i18n.contact.experience}
              </div>
              <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium backdrop-blur-sm">
                {i18n.contact.applicationsDelivered}
              </div>
              <div className="inline-flex flex-wrap items-center gap-1 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium backdrop-blur-sm">
                <span>{i18n.contact.currentlyAt}</span>
                <a
                  href={ZENDESK}
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary hover:underline"
                >
                  {i18n.contact.zendesk}
                </a>
              </div>
            </div>

            <div className="mt-8 pt-4">
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                {i18n.contact.reachMeDirectly}
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
                      {i18n.contact.email}
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
                      {i18n.contact.phone}
                    </span>
                    <span className="hover:underline">{PHONE}</span>
                  </span>
                </a>
              </div>
            </div>

            <SocialLinks size="lg" variant="rounded" showTooltip />

            <div className="pt-3">
              <div className="inline-flex max-w-xl flex-col items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-left backdrop-blur-sm">
                <p className="text-sm font-medium text-slate-900 dark:text-white">
                  {i18n.contact.enjoyed}
                </p>
                <a
                  href={KOFI}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_10px_25px_rgba(124,58,237,0.35)]"
                >
                  <span aria-hidden="true">☕</span>
                  <span>{i18n.contact.buyMeCoffee}</span>
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={field}
            className="relative mt-4 min-w-0 lg:mt-6"
          >
            <form
              onSubmit={submit}
              className="glass relative overflow-hidden rounded-2xl border border-white/10 p-6 shadow-lg sm:p-8"
            >
              <motion.div variants={stagger} className="relative grid gap-6">
                <div className="grid gap-5 md:grid-cols-2 md:gap-0">
                  <div className="relative md:border-r md:border-white/5 md:pr-6">
                    <label
                      htmlFor="name"
                      className="mb-4 block text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400"
                    >
                      {i18n.contact.placeholders.name}
                    </label>
                    <input
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      aria-label={i18n.contact.placeholders.name}
                      placeholder="Your name"
                      className="w-full border-b border-white/10 bg-transparent pb-4 text-base text-slate-900 outline-none transition-colors duration-300 placeholder:text-slate-500/70 focus:border-primary/60 dark:text-white dark:placeholder:text-slate-500"
                    />
                  </div>

                  <div className="relative md:pl-6">
                    <label
                      htmlFor="email"
                      className="mb-4 block text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400"
                    >
                      {i18n.contact.placeholders.email}
                    </label>
                    <input
                      id="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      aria-label={i18n.contact.placeholders.email}
                      placeholder="email@domain.com"
                      className="w-full border-b border-white/10 bg-transparent pb-4 text-base text-slate-900 outline-none transition-colors duration-300 placeholder:text-slate-500/70 focus:border-primary/60 dark:text-white dark:placeholder:text-slate-500"
                    />
                  </div>
                </div>

                <div className="relative border-white/5">
                  <label
                    htmlFor="message"
                    className="mb-4 block text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400"
                  >
                    {i18n.contact.placeholders.message}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    aria-label={i18n.contact.placeholders.message}
                    placeholder="Write your message"
                    rows={6}
                    className="min-h-[180px] w-full resize-none border-b border-white/10 bg-transparent pb-4 text-base text-slate-900 outline-none transition-colors duration-300 placeholder:text-slate-500/70 focus:border-primary/60 dark:text-white dark:placeholder:text-slate-500"
                  />
                </div>

                <div className="flex flex-col gap-5 border-white/5 sm:flex-row sm:items-end sm:justify-between">
                  <p className="max-w-sm text-sm leading-6 text-slate-600 dark:text-slate-400">
                    {i18n.contact.form.note}
                  </p>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`inline-flex items-center justify-center gap-3 self-start rounded-full px-6 py-3 text-white transition-all duration-300 sm:self-auto ${
                      loading
                        ? "cursor-not-allowed opacity-70"
                        : "hover:scale-105"
                    }`}
                    style={{
                      background:
                        "linear-gradient(90deg,#6366F1 0%,#7C3AED 50%,#EC4899 100%)",
                    }}
                  >
                    {loading ? (
                      <svg
                        className="h-4 w-4 animate-spin"
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
                    ) : null}
                    <span>{loading ? i18n.contact.form.sending : i18n.contact.form.send}</span>
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
