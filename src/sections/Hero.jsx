import React from "react";
import Button from "../components/Button";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const words = [
  { text: "Ideas", imgPath: "/images/ideas.svg" },
  { text: "Concepts", imgPath: "/images/concepts.svg" },
  { text: "Designs", imgPath: "/images/designs.svg" },
  { text: "Code", imgPath: "/images/code.svg" },
  { text: "Ideas", imgPath: "/images/ideas.svg" },
  { text: "Concepts", imgPath: "/images/concepts.svg" },
  { text: "Designs", imgPath: "/images/designs.svg" },
  { text: "Code", imgPath: "/images/code.svg" },
];

const Hero = () => {
  useGSAP(() => {
    gsap.fromTo(
      ".hero-text h1",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: "power2.inOut" },
    );
    gsap.from("#video", {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power2.inOut",
      delay: 0.5,
    });
  });

  return (
    <section id="hero" className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-0 z-10">
        <img src="/images/bg.png" alt="" />
      </div>

      {/* Main hero row */}
      <div className="hero-layout flex flex-col xl:flex-row xl:items-center">
        {/* LEFT: Text content */}
        <header className="flex flex-col justify-center xl:w-1/2 w-full md:px-20 px-5 z-10">
          <div className="flex flex-col gap-7">
            <div className="hero-text">
              <h1>
                Shaping
                <span className="slide">
                  <span className="wrapper">
                    {words.map((word, index) => (
                      <span
                        key={index}
                        className="flex items-center md:gap-3 gap-1 pb-2"
                      >
                        <img
                          src={word.imgPath}
                          alt={word.text}
                          className="xl:size-12 md:size-10 size-7 md:p-2 p-1 rounded-full bg-white-50"
                        />
                        <span>{word.text}</span>
                      </span>
                    ))}
                  </span>
                </span>
              </h1>
              <h1>into Real Projects</h1>
              <h1>that Deliver Results</h1>
            </div>

            <p className="text-white-50 md:text-xl relative z-10 pointer-events-none">
              Hi, I'm Om, an IT undergrad passionable about crafting innovative
              solutions through design and code.
            </p>

            <Button
              text="See My Work"
              className="md:w-80 md:h-16 w-60 h-12"
              id="counter"
            />
          </div>
        </header>

        {/* RIGHT: Video */}
        <div
          id="video"
          className="xl:w-1/2 w-full flex items-center justify-center xl:justify-center mt-10 xl:mt-0 z-10 px-5 md:px-10 xl:px-10"
        >
          <video
            src="/videos/Video.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full max-w-80 md:max-w-140 xl:max-w-200 h-auto shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
