import React from "react";

const AnimatedCard = ({ logo, title, timeline }) => {
  return (
    <div className="relative overflow-hidden rounded-lg p-[2px] flex flex-col items-center">
      {/* 1. Animated Glowing Light Background */}
      <div className="absolute inset-[-100%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_70%,#FDE047_100%)]"></div>

      {/* 2. Inner Card Content - Background made purely black */}
      <div className="relative z-10 bg-black w-full h-full flex flex-col items-center gap-3 p-4 rounded-lg">
        <div className="w-36 h-36 md:w-40 md:h-40 rounded-md overflow-hidden">
          <img className="object-cover w-full h-full" src={logo} alt={title} />
        </div>

        <div className="mt-3 text-center">
          <h2 className="text-lg md:text-xl font-semibold text-white">
            {title}
          </h2>
        </div>

        <div className="text-gray-500 text-sm">{timeline}</div>
      </div>
    </div>
  );
};

export default AnimatedCard;
