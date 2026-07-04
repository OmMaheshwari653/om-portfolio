import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Tutor-Personalized Learning Platform",
    imagePath: "/images/project1.png",
    Link: "https://tutor-client-three.vercel.app",
  },
  {
    title: "Canopy-Chatting Application",
    imagePath: "/images/project2.png",
    Link: "https://canopy-client.vercel.app",
  },
  {
    title: "Stayhub-Hotel Booking Platform",
    imagePath: "/images/project3.png",
    Link: "https://stayhub-cobo.onrender.com",
  },
];

const Projects = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll(".project-card");

    cards.forEach((card, index) => {
      const fromX = index === 0 ? -120 : 120;

      gsap.fromTo(
        card,
        { x: fromX, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            once: true,
          },
        },
      );
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="mt-24 w-full px-4 sm:px-6 lg:px-0"
    >
      <div className="flex flex-center text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-5xl font-semibold text-white-50">
          Projects
        </h2>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-3 lg:grid-rows-2 lg:h-180">
        <a
          href={projects[0].Link}
          target="_blank"
          rel="noreferrer"
          className="project-card group overflow-hidden rounded-2xl bg-white/5 shadow-lg shadow-black/20 lg:col-span-2 lg:row-span-2"
        >
          <div className=" flex h-full flex-col gap-4">
            <div className="flex items-center justify-center overflow-hidden rounded-xl bg-black-100 min-h-44 sm:min-h-56 lg:min-h-64 p-4">
              <img
                src={projects[0].imagePath}
                alt={projects[0].title}
                className="max-h-full max-w-full w-auto h-auto object-contain transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-white">
                {projects[0].title}
              </h3>
            </div>
          </div>
        </a>

        {projects.slice(1).map((project) => (
          <a
            key={project.title}
            href={project.Link}
            target="_blank"
            rel="noreferrer"
            className="project-card group overflow-hidden rounded-2xl bg-black-100/80 shadow-lg shadow-black/20"
          >
            <div className="flex h-full flex-col gap-4">
              <div className="flex items-center justify-center overflow-hidden rounded-xl bg-black-100 min-h-36 sm:min-h-44 p-3">
                <img
                  src={project.imagePath}
                  alt={project.title}
                  className="max-h-full max-w-full w-auto h-auto object-contain transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="space-y-2">
                <h3 className="text-lg sm:text-xl font-semibold text-white">
                  {project.title}
                </h3>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Projects;
