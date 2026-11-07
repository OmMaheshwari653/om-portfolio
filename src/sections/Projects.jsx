import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "FlowHub",
    subtitle: "Workflow Automation Platform",
    description:
      "A visual workflow builder in the spirit of n8n: drag nodes onto a canvas, wire them together, and let each run execute durably in the background with retries and live status streamed back to the editor.",
    tech: ["Next.js", "Inngest", "Prisma", "PostgreSQL", "tRPC"],
    imagePath: "/images/project4.png",
    link: "https://flowhub-rosy.vercel.app",
  },
  {
    title: "Tutor",
    subtitle: "Personalized Learning Platform",
    description:
      "A learning platform that adapts to each student: curated study material, structured courses and progress tracking, with separate flows for tutors and learners.",
    tech: ["React", "Node.js", "Express", "MongoDB"],
    imagePath: "/images/project1.png",
    link: "https://tutor-client-three.vercel.app",
  },
  {
    title: "Canopy",
    subtitle: "Chatting Application",
    description:
      "A real-time chat application with instant messaging, live presence and persistent conversation history, built on a WebSocket connection rather than polling.",
    tech: ["React", "Socket.IO", "Node.js", "MongoDB"],
    imagePath: "/images/project2.png",
    link: "https://canopy-client.vercel.app",
  },
  {
    title: "Stayhub",
    subtitle: "Hotel Booking Platform",
    description:
      "A hotel booking platform covering search and filtering, room availability, and the full booking flow from listing through to confirmation.",
    tech: ["React", "Node.js", "Express", "MongoDB"],
    imagePath: "/images/project3.png",
    link: "https://stayhub-cobo.onrender.com",
  },
];

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const ProjectPanel = ({ project, index, total }) => (
  <div className="project-panel flex h-full w-screen flex-shrink-0 items-center px-4 sm:px-8 lg:px-16">
    <div className="panel-inner grid w-full gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-12">
      <div className="flex flex-col gap-4 lg:gap-6">
        <span className="font-display text-xs tracking-[0.25em] text-blue-50 sm:text-sm">
          {String(index + 1).padStart(2, "0")} /{" "}
          {String(total).padStart(2, "0")}
        </span>

        <div>
          <h3 className="text-3xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
            {project.title}
          </h3>
          <p className="mt-1 text-base text-white-50 sm:text-xl">
            {project.subtitle}
          </p>
        </div>

        <p className="max-w-xl text-sm leading-relaxed text-white/70 sm:text-base">
          {project.description}
        </p>

        {project.tech?.length > 0 && (
          <ul className="flex flex-wrap gap-2">
            {project.tech.map((item) => (
              <li
                key={item}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white-50 sm:text-sm"
              >
                {item}
              </li>
            ))}
          </ul>
        )}

        <a
          href={project.link}
          target="_blank"
          rel="noreferrer"
          className="inline-flex w-fit items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-black transition-colors duration-300 hover:bg-white-50 sm:text-base"
        >
          View project
          <span aria-hidden="true">&rarr;</span>
        </a>
      </div>

      <a
        href={project.link}
        target="_blank"
        rel="noreferrer"
        className="panel-image group flex items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-black-100 p-3 shadow-2xl shadow-black/60 sm:p-4"
      >
        <img
          src={project.imagePath}
          alt={`${project.title} — ${project.subtitle}`}
          loading={index === 0 ? "eager" : "lazy"}
          className="max-h-[32svh] w-auto max-w-full rounded-lg object-contain transition-transform duration-500 group-hover:scale-[1.03] lg:max-h-[62svh]"
        />
      </a>
    </div>
  </div>
);

const Projects = () => {
  const [reduceMotion] = useState(prefersReducedMotion);
  const stageRef = useRef(null);
  const trackRef = useRef(null);
  const progressRef = useRef(null);
  const dotsRef = useRef([]);

  useGSAP(
    () => {
      if (reduceMotion) return;

      const stage = stageRef.current;
      const track = trackRef.current;
      if (!stage || !track) return;

      const panels = gsap.utils.toArray(".project-panel", track);
      if (panels.length === 0) return;

      // Function-based so a resize recomputes it instead of baking in the
      // width measured on first paint.
      const distance = () => track.scrollWidth - window.innerWidth;

      const scrollTween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: stage,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          anticipatePin: 1,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressRef.current) {
              gsap.set(progressRef.current, { scaleX: self.progress });
            }

            const active = Math.min(
              panels.length - 1,
              Math.floor(self.progress * panels.length),
            );

            dotsRef.current.forEach((dot, dotIndex) => {
              if (!dot) return;
              dot.style.opacity = dotIndex === active ? "1" : "0.3";
              dot.style.width = dotIndex === active ? "28px" : "8px";
            });
          },
        },
      });

      // `containerAnimation` lets each panel have its own ScrollTrigger even
      // though it travels horizontally — this is what makes the panels animate
      // as they cross the middle of the screen rather than all at once.
      panels.forEach((panel) => {
        const inner = panel.querySelector(".panel-inner");
        const image = panel.querySelector(".panel-image");

        gsap.fromTo(
          inner,
          { opacity: 0.15, y: 40 },
          {
            opacity: 1,
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: scrollTween,
              start: "left right",
              end: "left center",
              scrub: true,
            },
          },
        );

        // Image drifts against the rail, so the layers separate instead of
        // sliding as one flat sheet.
        gsap.fromTo(
          image,
          { xPercent: 12, scale: 0.94 },
          {
            xPercent: 0,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: scrollTween,
              start: "left right",
              end: "center center",
              scrub: true,
            },
          },
        );
      });
    },
    { dependencies: [reduceMotion] },
  );

  // Without the pinned rail, the same panels become a native swipeable
  // carousel so the content is still fully reachable.
  if (reduceMotion) {
    return (
      <section id="projects" className="mt-24 w-full">
        <div className="flex-center px-4 text-center sm:px-6">
          <h2 className="text-2xl font-semibold text-white-50 sm:text-3xl lg:text-5xl">
            Projects
          </h2>
        </div>

        <div className="mt-10 flex snap-x snap-mandatory overflow-x-auto">
          {projects.map((project, index) => (
            <div key={project.title} className="h-[100svh] snap-start">
              <ProjectPanel
                project={project}
                index={index}
                total={projects.length}
              />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="mt-24 w-full">
      {/* The pinned element is this stage, not the section: pinning an element
          that carries a margin confuses ScrollTrigger's pin-spacer. */}
      <div ref={stageRef} className="relative h-[100svh] w-full overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-center justify-between px-4 pt-6 sm:px-8 lg:px-16">
          <h2 className="font-display text-sm tracking-[0.3em] text-white-50 sm:text-base">
            PROJECTS
          </h2>
          <span className="font-display text-xs tracking-[0.2em] text-white/40 sm:text-sm">
            SCROLL
          </span>
        </div>

        <div ref={trackRef} className="flex h-full w-max will-change-transform">
          {projects.map((project, index) => (
            <ProjectPanel
              key={project.title}
              project={project}
              index={index}
              total={projects.length}
            />
          ))}
        </div>

        <div className="absolute inset-x-0 bottom-0 z-20 flex flex-col gap-4 px-4 pb-6 sm:px-8 lg:px-16">
          <div className="flex items-center gap-2">
            {projects.map((project, index) => (
              <span
                key={project.title}
                ref={(element) => {
                  dotsRef.current[index] = element;
                }}
                className="h-2 rounded-full bg-white-50 transition-[width,opacity] duration-300"
                style={{
                  width: index === 0 ? "28px" : "8px",
                  opacity: index === 0 ? 1 : 0.3,
                }}
              />
            ))}
          </div>

          <div className="h-px w-full bg-white/10">
            <div
              ref={progressRef}
              className="h-px w-full origin-left bg-white-50"
              style={{ transform: "scaleX(0)" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
