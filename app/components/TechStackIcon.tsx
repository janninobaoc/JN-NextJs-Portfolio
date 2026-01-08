"use client";

import React from "react";
import Image from "next/image";
import { useTheme } from "next-themes";

interface TechStackIconProps {
  TechStackIcon: string; // URL or path to icon
  Language: string;
}

const TechStackIcon = ({ TechStackIcon, Language }: TechStackIconProps) => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  // Theme-based classes
  const bgClass = isDark
    ? "bg-slate-800/50 hover:bg-slate-700/50"
    : "bg-white/50 hover:bg-gray-100";
  const shadowClass = isDark
    ? "shadow-lg hover:shadow-xl"
    : "shadow-md hover:shadow-lg";
  const textClass = isDark
    ? "text-slate-300 group-hover:text-white"
    : "text-gray-800 group-hover:text-black";
  const overlayGradient = isDark
    ? "from-blue-500 to-purple-500"
    : "from-indigo-300 to-pink-300";

  return (
    <div
      className={`group p-6 rounded-2xl ${bgClass} transition-all duration-300 ease-in-out flex flex-col items-center justify-center gap-3 hover:scale-105 cursor-pointer ${shadowClass}`}
    >
      <div className="relative">
        {/* Hover gradient overlay */}
        <div
          className={`absolute -inset-1 bg-gradient-to-r ${overlayGradient} rounded-full opacity-0 group-hover:opacity-50 blur transition duration-300`}
        ></div>

        <Image
          src={TechStackIcon}
          alt={`${Language} icon`}
          width={80} // adjust size as needed
          height={80}
          className="relative transform transition-transform duration-300"
        />
      </div>

      <span
        className={`font-semibold text-sm md:text-base tracking-wide transition-colors duration-300 ${textClass}`}
      >
        {Language}
      </span>
    </div>
  );
};

export default TechStackIcon;
