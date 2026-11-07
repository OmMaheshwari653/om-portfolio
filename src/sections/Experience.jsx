import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    role: "Project Manager Intern",
    company: "NextGen Automation Technologies",
    period: "Nov 2026 - Present",
    stack: "Node.js · React · PostgreSQL · REST APIs",
    location: "Remote · Hathras, Uttar Pradesh",
    logo: "/images/intern1.jpeg",
    points: [
      "Selected after a technical assessment and interview, building on a Task Tracker assignment recognized for its architecture and backend fundamentals.",
      "Work across backend and frontend development, testing and documentation on the company's products, following their coding standards, review process and security practices.",
      "Collaborate remotely through daily stand-ups and code reviews, tracking progress in the company's task and version-control systems.",
    ],
  },
  {
    role: "Full Stack Developer Intern",
    company: "OneVarsity",
    period: "Aug 2026 - Nov 2026",
    stack: "React.js · Node.js · Express.js · MongoDB · Socket.IO · Razorpay",
    link: "https://onevarsity.in",
    linkLabel: "onevarsity.in",
    logo: "/images/intern2.png",
    points: [
      "Built new features on the company's main learning platform end to end, from database schema and API design through to the user-facing interface.",
      "Shipped a Quiz Creator that lets educators author and publish assessments, and an AI Teaching Assistant that answers student questions in context.",
      "Redesigned the premium plan section and integrated Razorpay for the subscription checkout flow.",
      "Worked across the MERN stack with Socket.IO for the platform's real-time features.",
    ],
  },
];

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const ExperienceCard = ({ experience, index, registerCard }) => {
  const [glowPosition, setGlowPosition] = useState({
    x: 50,
    y: 50,
    active: false,
  });

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
    <div className="relative mx-auto w-full sm:w-[95%] md:w-[90%] lg:w-[80%]">
      {/* Node on the rail, lining up with this card. */}
      <span className="rail-node pointer-events-none absolute -left-6 top-10 hidden size-3 rounded-full border-2 border-black bg-white-50 lg:block" />

      <div
        ref={(element) => registerCard(element, index)}
        className="experience-card rounded-2xl border border-white/10 bg-black-100"
      >
        <div
          className="group relative w-full overflow-hidden rounded-2xl p-6 sm:p-8 lg:p-10"
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
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                {experience.logo && (
                  <img
                    src={experience.logo}
                    alt={`${experience.company} logo`}
                    loading="lazy"
                    className="reveal-logo size-12 shrink-0 rounded-xl border border-white/10 bg-black-50 object-contain p-1 sm:size-14"
                  />
                )}

                <span className="block overflow-hidden">
                  <h3 className="reveal-line text-xl font-semibold text-white sm:text-2xl lg:text-3xl">
                    {experience.role}
                  </h3>
                </span>
              </div>

              <span className="block overflow-hidden">
                <span className="reveal-line block text-sm text-white/70 sm:text-base">
                  {experience.company}
                </span>
              </span>
            </div>

            <div className="reveal-meta flex flex-col gap-2 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between sm:text-base">
              <span>{experience.period}</span>
              <span>{experience.stack}</span>
              {experience.link ? (
                <a
                  href={experience.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-white transition-colors hover:text-white/70"
                >
                  {experience.linkLabel}
                </a>
              ) : (
                <span>{experience.location}</span>
              )}
            </div>

            <div className="space-y-4 text-sm leading-7 text-white/80 sm:text-base">
              {experience.points.map((point) => (
                <p key={point} className="reveal-point">
                  {point}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Experience = () => {
  const [reduceMotion] = useState(prefersReducedMotion);
  const listRef = useRef(null);
  const progressRef = useRef(null);
  const cardRefs = useRef([]);

  const registerCard = (element, index) => {
    cardRefs.current[index] = element;
  };

  useGSAP(
    () => {
      const list = listRef.current;
      if (!list) return;

      const cards = cardRefs.current.filter(Boolean);
      if (cards.length === 0) return;

      if (reduceMotion) return;

      // The rail is the one thing that should track the scrollbar directly,
      // so it stays scrubbed — it is a position indicator, not content.
      if (progressRef.current) {
        gsap.fromTo(
          progressRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: list,
              start: "top 70%",
              end: "bottom 70%",
              scrub: true,
            },
          },
        );
      }

      cards.forEach((card) => {
        const wrapper = card.parentElement;

        // One eased timeline per card, played once. Scrubbing text to the
        // scrollbar is what made this feel jerky — reading copy wants its own
        // timing, not the reader's wheel speed.
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            once: true,
          },
        });

        timeline
          // Card wipes open from the top rather than just fading in.
          .fromTo(
            card,
            {
              clipPath: "inset(0% 0% 100% 0% round 16px)",
              y: 48,
            },
            {
              clipPath: "inset(0% 0% 0% 0% round 16px)",
              y: 0,
              duration: 0.9,
              ease: "power3.out",
            },
            0,
          )
          .fromTo(
            wrapper?.querySelector(".rail-node") ?? [],
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(2)" },
            0.35,
          )
          .fromTo(
            card.querySelectorAll(".reveal-logo"),
            { scale: 0.5, opacity: 0, rotate: -12 },
            { scale: 1, opacity: 1, rotate: 0, duration: 0.6, ease: "back.out(1.7)" },
            0.3,
          )
          .fromTo(
            card.querySelectorAll(".reveal-line"),
            { yPercent: 115 },
            { yPercent: 0, duration: 0.7, ease: "power3.out", stagger: 0.08 },
            0.35,
          )
          .fromTo(
            card.querySelectorAll(".reveal-meta"),
            { y: 18, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
            0.5,
          )
          .fromTo(
            card.querySelectorAll(".reveal-point"),
            { y: 24, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease: "power2.out",
              stagger: 0.09,
            },
            0.6,
          );
      });
    },
    { dependencies: [reduceMotion] },
  );

  return (
    <section id="experience" className="relative mt-20 w-full px-4 sm:px-6 lg:px-0">
      <div className="flex-center text-center">
        <h2 className="text-2xl font-bold text-white-50 sm:text-3xl">
          Experience
        </h2>
      </div>

      <div ref={listRef} className="relative mt-12">
        {/* Cards are w-[80%] centred, so their left edge sits at 10%. The
            node is 24px left of that edge and 12px wide, so its centre is at
            10% - 18px — which is exactly where this rail has to sit. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 hidden h-full w-[2px] lg:left-[calc(10%-18px)] lg:block"
        >
          <div className="absolute inset-0 bg-white/10" />
          <div
            ref={progressRef}
            className="gradient-line absolute inset-0 h-full"
            style={{ transform: "scaleY(0)" }}
          />
        </div>

        <div className="flex flex-col gap-10 sm:gap-14">
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={experience.company}
              experience={experience}
              index={index}
              registerCard={registerCard}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
