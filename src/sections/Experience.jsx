import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    role: "Software Development Intern",
    company: "NextGen Automation Technologies",
    period: "Aug 2026 - Present",
    stack: "Node.js · React · PostgreSQL · REST APIs",
    location: "Remote · Hathras, Uttar Pradesh",
    points: [
      "Selected as a Software Development Intern after a technical assessment and interview, building on a Task Tracker assignment recognized for its architecture and backend fundamentals.",
      "Work across backend and frontend development, testing and documentation on the company's products, following their coding standards, review process and security practices.",
      "Collaborate remotely through daily stand-ups and code reviews, tracking progress in the company's task and version-control systems.",
    ],
  },
  {
    role: "Freelance Web Developer",
    company: "Dr. Veda Health Care",
    period: "Mar 2026 - Present",
    stack: "Next.js · Framer Motion · REST APIs",
    link: "https://drvedahealthcare.in",
    linkLabel: "drvedahealthcare.in",
    points: [
      "Architected a comprehensive healthcare platform with a custom Admin Panel, patient-facing scheduling workflows, and messaging systems, reducing administrative overhead.",
      "Implemented production-grade Framer Motion animations and optimized Core Web Vitals via Next.js SSR, ensuring fast load times and strong SEO performance.",
    ],
  },
];

const ExperienceCard = ({ experience, cardRef }) => {
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
    <div className="mx-auto flex w-full sm:w-[95%] md:w-[90%] lg:w-[80%] justify-center border border-white-200 rounded-2xl">
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
                {experience.role}
              </h3>
              <span className="text-sm sm:text-base text-white/70">
                {experience.company}
              </span>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-sm sm:text-base text-white/60">
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
          </div>

          <div className="space-y-4 text-sm sm:text-base leading-7 text-white/80">
            {experience.points.map((point) => (
              <p key={point}>{point}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Experience = () => {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  useGSAP(() => {
    const cards = cardRefs.current.filter(Boolean);
    if (!cards.length) return;

    gsap.fromTo(
      cards,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      },
    );
  }, []);

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
      <div className="mt-10 flex flex-col gap-8">
        {experiences.map((experience, index) => (
          <ExperienceCard
            key={experience.company}
            experience={experience}
            cardRef={(element) => {
              cardRefs.current[index] = element;
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Experience;
