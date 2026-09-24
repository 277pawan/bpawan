import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PandaImage from "../../Assets/profile.png";

const channels = [
  {
    label: "Email",
    value: "bpawan277@gmail.com",
    href: "mailto:bpawan277@gmail.com",
    icon: "✉",
  },
  {
    label: "Phone",
    value: "+91 9068509220",
    href: "tel:+919068509220",
    icon: "📞",
  },
  {
    label: "Location",
    value: "Kotdwara, Uttarakhand, India",
    href: null,
    icon: "📍",
  },
];

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function sendMessage(e) {
    e.preventDefault();
    if (!email || !message) return;

    setIsLoading(true);
    const data = { name, email, message };

    try {
      const res = await fetch("https://port-back-mail.vercel.app/sec", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setShowSuccess(true);
        setSuccess("Message sent — I'll get back to you soon.");
        setName("");
        setEmail("");
        setMessage("");
        setTimeout(() => setShowSuccess(false), 5000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  const inputClass =
    "w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-gray-100 placeholder:text-gray-600 focus:outline-none focus:border-[#7843e9]/60 focus:ring-1 focus:ring-[#7843e9]/40 transition-colors disabled:opacity-50";

  return (
    <section
      id="contact"
      className="relative scroll-mt-24 py-20 md:py-28 bg-[#050505] overflow-hidden"
      aria-labelledby="contact-heading"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,67,233,0.15),transparent)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6">
        <header className="text-center mb-14">
          <p className="text-[#7843e9] text-xs uppercase tracking-[0.35em] mb-3">
            Contact
          </p>
          <h2
            id="contact-heading"
            className="text-3xl md:text-5xl font-display font-bold text-white"
          >
            Let&apos;s build something
          </h2>
          <p className="mt-4 text-gray-400 max-w-xl mx-auto text-lg">
            Open to full-time roles, freelance, and open-source collabs. Send a
            message or reach out directly.
          </p>
        </header>

        <div className="grid lg:grid-cols-5 gap-10 lg:gap-12 items-start">
          <aside className="lg:col-span-2 space-y-6">
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-br from-[#7843e9] to-indigo-600 rounded-full blur opacity-40" />
                <img
                  src={PandaImage}
                  alt="Pawan Bisht"
                  className="relative w-40 h-40 md:w-48 md:h-48 rounded-full object-cover border-2 border-white/10"
                />
              </div>
              <p className="mt-5 text-white font-semibold text-lg">Pawan Bisht</p>
              <p className="text-sm text-[#a78bfa]">Full Stack · Open Source</p>
              <span className="mt-3 inline-flex items-center gap-2 text-xs font-mono px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Open to opportunities
              </span>
            </div>

            <ul className="space-y-3">
              {channels.map((c) => (
                <li key={c.label}>
                  {c.href ? (
                    <a
                      href={c.href}
                      className="flex gap-4 p-4 rounded-2xl border border-white/10 bg-white/[0.03] hover:border-[#7843e9]/40 transition-colors group"
                    >
                      <span className="text-xl" aria-hidden>
                        {c.icon}
                      </span>
                      <div>
                        <p className="text-xs uppercase tracking-wider text-gray-500">
                          {c.label}
                        </p>
                        <p className="text-sm text-gray-200 group-hover:text-white">
                          {c.value}
                        </p>
                      </div>
                    </a>
                  ) : (
                    <div className="flex gap-4 p-4 rounded-2xl border border-white/10 bg-white/[0.03]">
                      <span className="text-xl" aria-hidden>
                        {c.icon}
                      </span>
                      <div>
                        <p className="text-xs uppercase tracking-wider text-gray-500">
                          {c.label}
                        </p>
                        <p className="text-sm text-gray-200">{c.value}</p>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>

            <div className="flex gap-3 justify-center lg:justify-start">
              <a
                href="https://github.com/277pawan"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl border border-white/10 text-sm text-gray-300 hover:text-white hover:border-[#7843e9]/50"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/pawan-bisht-a943161b9/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl border border-white/10 text-sm text-gray-300 hover:text-white hover:border-[#7843e9]/50"
              >
                LinkedIn
              </a>
              <Link
                to="/engineering"
                className="px-4 py-2 rounded-xl border border-white/10 text-sm text-gray-300 hover:text-white hover:border-[#7843e9]/50"
              >
                Engineering
              </Link>
            </div>
          </aside>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-sm p-6 md:p-10 shadow-[0_0_80px_-20px_rgba(120,67,233,0.25)]"
          >
            <h3 className="text-xl font-display font-bold text-white mb-1">
              Send a message
            </h3>
            <p className="text-sm text-gray-500 mb-8">
              Usually reply within 1–2 business days.
            </p>

            <form onSubmit={sendMessage} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="contact-name" className="block text-sm text-gray-400 mb-2">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={inputClass}
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-sm text-gray-400 mb-2">
                    Email <span className="text-[#7843e9]">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={inputClass}
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-sm text-gray-400 mb-2">
                  Message <span className="text-[#7843e9]">*</span>
                </label>
                <textarea
                  id="contact-message"
                  rows={6}
                  placeholder="What are you building? How can I help?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  disabled={isLoading}
                  className={`${inputClass} resize-y min-h-[140px]`}
                />
              </div>

              {showSuccess && (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm">
                  {success}
                </div>
              )}

              <motion.button
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="w-full sm:w-auto min-w-[200px] px-8 py-3.5 rounded-xl bg-[#7843e9] hover:bg-[#6a35d9] text-white font-semibold disabled:opacity-60 flex items-center justify-center gap-2 transition-colors"
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      aria-hidden
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Sending…
                  </>
                ) : (
                  "Send message"
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
