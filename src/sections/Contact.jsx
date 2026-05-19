import { useGSAP } from "@gsap/react";
import emailjs from "@emailjs/browser";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const panelRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  useGSAP(() => {
    const section = sectionRef.current;
    const panel = panelRef.current;
    if (!section || !panel) return;

    const elements = section.querySelectorAll(".contact-field, .contact-panel");

    gsap.set(elements, { opacity: 0, y: 24 });

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        once: true,
      },
    });

    timeline
      .to(panel, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      })
      .to(
        section.querySelectorAll(".contact-field"),
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.08,
          ease: "power2.out",
        },
        "-=0.2",
      )
      .to(section.querySelector(".contact-stamp"), {
        opacity: 1,
        y: 0,
        duration: 0.45,
        ease: "power2.out",
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null); // Clear previous messages

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY,
      );

      // Show success message
      setMessage({
        type: "success",
        text: "Message sent successfully! I'll get back to you soon.",
      });

      // Reset form
      setForm({ name: "", email: "", message: "" });

      // Clear success message after 5 seconds
      setTimeout(() => setMessage(null), 5000);
    } catch (error) {
      console.error("EmailJS Error:", error);
      setMessage({
        type: "error",
        text: "Failed to send message. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="mt-40 mb-40 w-full px-4 sm:px-6 lg:px-0"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-center text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white-50">
            Get in touch - Let's Connect
          </h2>
        </div>

        <div className="mt-10 flex justify-center">
          <div
            ref={panelRef}
            className="contact-panel w-full max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-black-100/60 p-5 sm:p-8 lg:p-10"
          >
            <div className="min-h-14 w-full">
              {message ? (
                <div
                  className={`w-full rounded-2xl px-4 py-3 text-center text-sm sm:text-base font-semibold ${
                    message.type === "success"
                      ? "bg-green-500/15 text-green-300"
                      : "bg-red-500/15 text-red-300"
                  }`}
                >
                  {message.text}
                </div>
              ) : null}
            </div>

            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="mt-2 flex w-full flex-col gap-5"
            >
              <div className="contact-field flex flex-col gap-2">
                <label
                  htmlFor="name"
                  className="text-sm font-semibold text-white/80"
                >
                  Your name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="What's your good name?"
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition-colors placeholder:text-white/30 focus:border-white/25"
                />
              </div>

              <div className="contact-field flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="text-sm font-semibold text-white/80"
                >
                  Your email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="What's your email address?"
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition-colors placeholder:text-white/30 focus:border-white/25"
                />
              </div>

              <div className="contact-field flex flex-col gap-2">
                <label
                  htmlFor="message"
                  className="text-sm font-semibold text-white/80"
                >
                  Your message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="How can I help you?"
                  rows="6"
                  required
                  className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition-colors placeholder:text-white/30 focus:border-white/25"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="contact-field mt-2 w-full disabled:cursor-not-allowed disabled:opacity-70"
              >
                <div className="cta-button group w-full">
                  <div className="bg-circle" />
                  <p className="text">
                    {loading ? "Sending..." : "Send Message"}
                  </p>
                  <div className="arrow-wrapper">
                    <img src="/images/arrow-down.svg" alt="arrow" />
                  </div>
                </div>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
