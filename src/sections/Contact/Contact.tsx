"use client";

import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";
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
        msg: error instanceof Error ? error.message : i18n.contact.messages.error,
      } satisfies StatusMessage;
      setStatus(nextStatus);
      showToast(nextStatus);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section id="contact" className="section-shell relative overflow-hidden pb-24">
      <div className="section-container">
        {toast ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed right-4 top-4 z-50"
            aria-live="polite"
          >
            <div
              className={`max-w-xs rounded-2xl border px-4 py-3 text-sm font-medium text-text-primary shadow-lg ${
                toast.type === "success"
                  ? "border-trace/40 bg-[rgba(0,255,159,0.12)]"
                  : "border-progress/40 bg-[rgba(0,172,193,0.14)]"
              }`}
            >
              {toast.msg}
            </div>
          </motion.div>
        ) : null}

        <div className="section-intro">
          <p className="section-label">Contact</p>
          <h2 className="section-heading">Let&apos;s Build Something Amazing</h2>
          <p className="section-copy">{i18n.contact.openTo}</p>
        </div>

        <motion.div
          className="bento-grid items-start"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.div variants={field} className="col-span-1 space-y-5 xl:col-span-5">
            <div className="bento-card space-y-5">
              <div className="flex flex-wrap gap-3">
                <div className="token-pill">{i18n.contact.experience}</div>
                <div className="token-pill">{i18n.contact.applicationsDelivered}</div>
                <div className="token-pill">
                  <span>{i18n.contact.currentlyAt} </span>
                  <a href={ZENDESK} target="_blank" rel="noreferrer" className="ml-1 mr-1 text-accent">
                    {i18n.contact.zendesk}
                  </a>
                  <span>{i18n.contact.zendeskLocation} </span>
                </div>
              </div>

              <div>
                <p className="section-label">Reach me directly</p>
                <div className="mt-4 flex min-w-0 flex-col gap-3">
                  <a href={MAILTO} className="interactive-card rounded-[24px] border border-border bg-[rgba(13,21,38,0.72)] p-4 transition duration-200 ease-out hover:border-accent/40">
                    <div className="flex min-w-0 items-center gap-4">
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-background">
                        <FaEnvelope aria-hidden="true" />
                      </span>
                      <span className="flex min-w-0 flex-col">
                        <span className="text-xs uppercase tracking-[0.22em] text-text-secondary">{i18n.contact.email}</span>
                        <span className="break-all text-text-primary">{EMAIL}</span>
                      </span>
                    </div>
                  </a>

                  <a href={TEL} className="interactive-card rounded-[24px] border border-border bg-[rgba(13,21,38,0.72)] p-4 transition duration-200 ease-out hover:border-accent/40">
                    <div className="flex min-w-0 items-center gap-4">
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-background">
                        <FaPhoneAlt aria-hidden="true" />
                      </span>
                      <span className="flex min-w-0 flex-col">
                        <span className="text-xs uppercase tracking-[0.22em] text-text-secondary">{i18n.contact.phone}</span>
                        <span className="text-text-primary">{PHONE}</span>
                      </span>
                    </div>
                  </a>
                </div>
              </div>

              <SocialLinks size="lg" variant="rounded" showTooltip />
            </div>

            <motion.div variants={field} className="bento-card">
              <p className="text-sm font-medium text-text-primary">{i18n.contact.enjoyed}</p>
              <a
                href={KOFI}
                target="_blank"
                rel="noopener noreferrer"
                className="primary-button mt-4"
              >
                <span aria-hidden="true">☕</span>
                <span>{i18n.contact.buyMeCoffee}</span>
              </a>
            </motion.div>
          </motion.div>

          <motion.div variants={field} className="col-span-1 xl:col-span-7">
            <motion.form
              onSubmit={submit}
              className="relative overflow-hidden rounded-[24px] border border-[#1a2a4a] bg-gradient-to-br from-[#0d1526] to-[#0d1b2e] p-6 md:p-8"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-[-3rem] top-[-2rem] h-40 w-40 rounded-full bg-[#00d4ff] opacity-10 blur-[110px]" />
                <div className="absolute bottom-[-3rem] right-[-1rem] h-48 w-48 rounded-full bg-[#00ffff] opacity-10 blur-[120px]" />
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(0,212,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.05) 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                  }}
                />
              </div>

              <div className="relative">
                <div className="mb-8">
                  <p className="section-label">Message</p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-xs uppercase tracking-[0.34em] text-[#00d4ff]"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder={form.name ? "" : "YOUR NAME"}
                      className="w-full border-b border-[#1a2a4a] bg-transparent py-2 text-white outline-none transition duration-200 ease-out placeholder:text-[#8899aa]/60 focus:border-[#00d4ff] focus:shadow-[0_10px_30px_rgba(0,212,255,0.08)]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-xs uppercase tracking-[0.34em] text-[#00d4ff]"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder={form.email ? "" : "YOUR EMAIL"}
                      className="w-full border-b border-[#1a2a4a] bg-transparent py-2 text-white outline-none transition duration-200 ease-out placeholder:text-[#8899aa]/60 focus:border-[#00d4ff] focus:shadow-[0_10px_30px_rgba(0,212,255,0.08)]"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label
                      htmlFor="message"
                      className="mb-2 block text-xs uppercase tracking-[0.34em] text-[#00d4ff]"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder={form.message ? "" : "YOUR MESSAGE"}
                      rows={6}
                      className="min-h-[120px] w-full resize-none border-b border-[#1a2a4a] bg-transparent py-2 text-white outline-none transition duration-200 ease-out placeholder:text-[#8899aa]/60 focus:border-[#00d4ff] focus:shadow-[0_12px_36px_rgba(0,212,255,0.08)]"
                    />
                  </div>

                  <div className="flex items-end">
                    <p className="text-xs italic text-[#8899aa]">
                      Send a note and I&apos;ll get back to you soon.
                    </p>
                  </div>

                  <div className="flex items-end justify-start md:justify-end">
                    <motion.button
                      type="submit"
                      disabled={loading}
                      className={`inline-flex items-center justify-center rounded-xl bg-[#00d4ff] px-6 py-3 text-sm font-semibold text-[#0a0e1a] transition-colors duration-200 hover:bg-[#00ffff] ${
                        loading ? "cursor-not-allowed opacity-70" : ""
                      }`}
                      whileHover={loading ? undefined : { scale: 1.05, y: -1 }}
                      whileTap={loading ? undefined : { scale: 0.96 }}
                      transition={{ type: "spring", stiffness: 320, damping: 18 }}
                    >
                      {loading ? (
                        <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="10" stroke="rgba(10,14,26,0.2)" strokeWidth="4" />
                          <path d="M22 12a10 10 0 00-10-10" stroke="#0a0e1a" strokeWidth="4" strokeLinecap="round" />
                        </svg>
                      ) : null}
                      <span>{loading ? "Sending..." : "Send Message"}</span>
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.form>
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
}
