import React, { useRef } from "react";
import AnimatedCard from "../components/AnimatedCard";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const position = [
  {
    logo: "/images/collegeLogo.png",
    title: "Btech - Information Technology",
    timeline: "Aug 2024 - 2028",
  },
  {
    logo: "/images/gdg.png",
    title: "Member at Google Developer Group",
    timeline: "Aug 2025 - Present",
  },
  {
    logo: "/images/iisf-logo.png",
    title: "Member at IISF",
    timeline: "Nov 2024 - Present",
  },
];

const About = () => {
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const cardsRef = useRef(null);

  useGSAP(() => {
    // Animate left side content from left on scroll
    gsap.fromTo(
      leftRef.current,
      { opacity: 0, x: -100 },
      {
        opacity: 1,
        x: 0,
        duration: 1.5,
        scrollTrigger: {
          trigger: leftRef.current,
          start: "top 80%",
          once: true,
        },
      },
    );

    // Animate right side image from right on scroll
    gsap.fromTo(
      rightRef.current,
      { opacity: 0, x: 100 },
      {
        opacity: 1.5,
        x: 0,
        duration: 1,
        scrollTrigger: {
          trigger: rightRef.current,
          start: "top 80%",
          once: true,
        },
      },
    );

    // Stagger animation for cards on scroll
    gsap.fromTo(
      cardsRef.current?.querySelectorAll(".card-item"),
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 80%",
          once: true,
        },
      },
    );
  });

  return (
    <section className="w-full" id="about">
      <div className="flex flex-col md:flex-row gap-8 mt-10 w-full items-center">
        <div className="md:w-4/6 w-full">
          <div className="flex justify-center">
            <h2 className="text-4xl font-semibold">About me</h2>
          </div>
          <div ref={leftRef} className="md:w-5/6 md:px-20 px-5 mt-10">
            <p className="md:text-xl text-base">
              Hi! I'm Om Maheshwari, a full Stack Developer specializing in
              building modern applications with Nextjs, React, Node.js, Express,
              and MongoDB. I craft efficient, scalable solutions that bridge
              ideas and reality.
            </p>
            <br />
            <p className="md:text-xl text-base">
              Beyond web development, I'm deeply immersed in mastering Data
              Structures & Algorithms to build a rock-solid foundation in
              optimized problem-solving. This dual focus helps me write cleaner
              code and design performance-critical systems.
            </p>
          </div>
          <div className="mt-10 flex flex-center">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              <a href="#projects">View Projects</a>
            </button>
          </div>
        </div>
        <div
          ref={rightRef}
          className="md:w-2/6 flex justify-center mt-6 w-full"
        >
          <div className="w-48 h-48 md:w-80 md:h-80 rounded-full overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src="/images/profile.jpeg"
              alt="Profile"
            />
          </div>
        </div>
      </div>
      <div
        ref={cardsRef}
        className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 md:p-10"
      >
        {position.map((pos, index) => (
          <div key={index} className="card-item">
            <AnimatedCard
              logo={pos.logo}
              title={pos.title}
              timeline={pos.timeline}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default About;
