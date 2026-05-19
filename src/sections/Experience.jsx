import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const [glowPosition, setGlowPosition] = useState({
    x: 50,
    y: 50,
    active: false,
  });

  useGSAP(() => {
    if (!cardRef.current) return;

    gsap.fromTo(
      cardRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      },
    );
  }, []);

  const handleMouseMove = (event) => {
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    setGlowPosition({ x, y, active: true });
  };

  const handleMouseLeave = () => {
    setGlowPosition((currentPosition) => ({
      ...currentPosition,
      active: false,
    }));
  };

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="mt-20 w-full px-4 sm:px-6 lg:px-0"
    >
      <div className="flex flex-center text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-white-50">
          Experience
        </h2>
      </div>
      <div className="mt-10 mx-auto flex w-full sm:w-[95%] md:w-[90%] lg:w-[80%] justify-center border border-white-200 rounded-2xl">
        <div
          ref={cardRef}
          className="group relative w-full overflow-hidden rounded-3xl p-6 sm:p-8 lg:p-10"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className="pointer-events-none absolute inset-0 transition-opacity duration-300"
            style={{
              opacity: glowPosition.active ? 1 : 0,
              background: `radial-gradient(260px circle at ${glowPosition.x}% ${glowPosition.y}%, rgba(217, 236, 255, 0.18), rgba(98, 224, 255, 0.08) 30%, transparent 65%)`,
            }}
          />

          <div className="relative z-10 flex flex-col gap-6">
            <div className="flex flex-col gap-3 sm:gap-4">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-white">
                  Freelance Web Developer
                </h3>
                <span className="text-sm sm:text-base text-white/70">
                  Dr. Veda Health Care
                </span>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-sm sm:text-base text-white/60">
                <span>Mar 2026 - Present</span>
                <span>Next.js · Framer Motion · REST APIs</span>
                <a
                  href="https://drvedahealthcare.in"
                  target="_blank"
                  rel="noreferrer"
                  className="text-white transition-colors hover:text-white/70"
                >
                  drvedahealthcare.in
                </a>
              </div>
            </div>

            <div className="space-y-4 text-sm sm:text-base leading-7 text-white/80">
              <p>
                Architected a comprehensive healthcare platform with a custom
                Admin Panel, patient-facing scheduling workflows, and messaging
                systems, reducing administrative overhead.
              </p>
              <p>
                Implemented production-grade Framer Motion animations and
                optimized Core Web Vitals via Next.js SSR, ensuring fast load
                times and strong SEO performance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
