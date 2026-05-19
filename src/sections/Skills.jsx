import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Achievements = [
  {
    imagePath: "/images/leetcode.png",
    title: "Solved 300+ DSA Problems",
  },
  {
    imagePath: "/images/hactoberfest.png",
    title: "Merged 6+ PRs in Hactoberfest 2025",
  },
  {
    imagePath: "/images/openai.png",
    title: "OpenAixNxtwave 2025 hackathon state level selection",
  },
  {
    imagePath: "/images/sih.png",
    title: "Nominated for SIH 2025",
  },
];
const skills = [
  {
    imagePath: "/images/ec2.png",
    title: "AWS EC2",
  },
  {
    imagePath: "/images/nextjs.png",
    title: "Next.js",
  },
  {
    imagePath: "/images/react.png",
    title: "React",
  },
  {
    imagePath: "/images/nodejs.png",
    title: "Node.js",
  },
  {
    imagePath: "/images/mongodb.png",
    title: "MongoDB",
  },
  {
    imagePath: "/images/postgres.png",
    title: "PostgreSQL",
  },
  {
    imagePath: "/images/javascript.png",
    title: "JavaScript",
  },
  {
    imagePath: "/images/docker.png",
    title: "Docker",
  },
];

const Skills = () => {
  const trackRef = useRef(null);
  const sectionRef = useRef(null);
  const lineRef = useRef(null);

  useGSAP(() => {
    const track = trackRef.current;
    const section = sectionRef.current;
    const line = lineRef.current;
    if (!track) return;

    const marqueeTween = gsap.to(track, {
      xPercent: -50,
      repeat: -1,
      duration: 15,
      ease: "none",
    });

    const onMouseEnter = () => marqueeTween.pause();
    const onMouseLeave = () => marqueeTween.play();

    track.addEventListener("mouseenter", onMouseEnter);
    track.addEventListener("mouseleave", onMouseLeave);

    const achievementCards = gsap.utils.toArray(
      section?.querySelectorAll(".achievement-card") || [],
    );

    gsap.set(achievementCards, { x: 0, opacity: 0 });

    achievementCards.forEach((card, index) => {
      const fromX = index % 2 === 0 ? -120 : 120;

      gsap.fromTo(
        card,
        { x: fromX, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            once: true,
          },
        },
      );
    });

    if (line && section) {
      gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            end: "bottom 20%",
            scrub: true,
          },
        },
      );
    }

    return () => {
      marqueeTween.kill();
      track.removeEventListener("mouseenter", onMouseEnter);
      track.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="mt-15 w-full px-4 sm:px-6 lg:px-0"
    >
      <div className="flex flex-center text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl text-white-50 font-semibold">
          Skills & Achievements
        </h2>
      </div>
      <div className="mt-8 sm:mt-10 w-full overflow-hidden flex items-center py-2 sm:py-0">
        {/* Main Track - Isme se gap aur padding hata di hai */}
        <div ref={trackRef} className="flex shrink-0 w-max cursor-pointer">
          {/* Set 1: Original Skills */}
          {/* Padding px-8 lagayi hai taaki last item (Docker) ke baad 8px aur Set 2 ke first item se pehle 8px milkar total 16px ka gap ban jaye (jo gap-16 ke barabar hai) */}
          <div className="flex gap-10 sm:gap-14 lg:gap-16 px-4 sm:px-6 lg:px-8">
            {skills.map((skill, index) => (
              <div
                key={`set1-${index}`}
                className="flex flex-col items-center justify-center gap-2 sm:gap-3 w-20 sm:w-24"
              >
                <img
                  src={skill.imagePath}
                  alt={skill.title}
                  className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
                />
                <span className="text-gray-300 font-medium text-xs sm:text-sm whitespace-nowrap">
                  {skill.title}
                </span>
              </div>
            ))}
          </div>

          {/* Set 2: Duplicated Skills (Loop seamlessly merge karne ke liye) */}
          <div className="flex gap-10 sm:gap-14 lg:gap-16 px-4 sm:px-6 lg:px-8">
            {skills.map((skill, index) => (
              <div
                key={`set2-${index}`}
                className="flex flex-col items-center justify-center gap-2 sm:gap-3 w-20 sm:w-24"
              >
                <img
                  src={skill.imagePath}
                  alt={skill.title}
                  className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
                />
                <span className="text-gray-300 font-medium text-xs sm:text-sm whitespace-nowrap">
                  {skill.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="relative mt-16 sm:mt-20 py-6 sm:py-10">
        {/* Left rail on small screens, centered timeline on md+ */}
        <div className="absolute z-30 top-0 bottom-0 left-4 sm:left-6 md:left-1/2 md:-translate-x-1/2">
          <div ref={lineRef} className="gradient-line w-1 h-full" />
        </div>

        <div className="flex flex-col gap-8 sm:gap-10 md:gap-14 pl-12 sm:pl-16 md:pl-0">
          {Achievements.map((achievement, index) => (
            <div
              key={index}
              data-side={index % 2 === 0 ? "left" : "right"}
              className={`flex w-full ${
                index % 2 === 0
                  ? "justify-start md:justify-start"
                  : "justify-start md:justify-end"
              }`}
            >
              {/* On mobile cards sit to the right of the rail; on md+ they alternate. */}
              <div className="w-full md:w-1/2 flex justify-start md:justify-center">
                <div className="achievement-card w-[calc(100%-0.5rem)] sm:w-[calc(100%-1rem)] md:w-full max-w-md md:max-w-xs p-4 sm:p-5 rounded-xl border border-gray-700 backdrop-blur-sm shadow-lg shadow-black/20">
                  <div className="flex flex-col items-center gap-4">
                    <img
                      src={achievement.imagePath}
                      alt={achievement.title}
                      className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg"
                    />
                    <div>
                      <h1 className="text-base sm:text-lg font-bold text-white text-center">
                        {achievement.title}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
