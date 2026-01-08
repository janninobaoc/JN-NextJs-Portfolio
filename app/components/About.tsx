"use client";

import { useEffect, memo, useMemo } from "react";
import Image from "next/image";
import { FileText, Code, Award, Globe, LucideIcon, ArrowUpRight, Sparkles } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import ThemedGradient from "./ThemedGradient";
import { useTheme } from "next-themes";

interface StatCardProps {
  icon: LucideIcon;        // Type for Lucide icons
  color: string;           // Tailwind gradient classes
  value: number | string;  // The value to display
  label: string;           // Label text
  description: string;     // Description text
  animation?: string;      // Optional AOS animation
}

const Header = memo(() => (
  <div className="text-center lg:mb-8 mb-2 px-[5%]">
    <div className="inline-block relative group">
      <h2
        className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]"
        data-aos="zoom-in-up"
        data-aos-duration="600"
      >
        About Me
      </h2>
    </div>
    <p
      className="mt-2 text-gray-400 max-w-2xl mx-auto text-base sm:text-lg flex items-center justify-center gap-2"
      data-aos="zoom-in-up"
      data-aos-duration="800"
    >
      <Sparkles className="w-5 h-5 text-purple-400" />
      <ThemedGradient>
        Bringing ideas to life through digital experiences
      </ThemedGradient>
      <Sparkles className="w-5 h-5 text-purple-400" />
    </p>
  </div>
));


const ProfileImage = memo(() => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <div className="flex justify-end items-center sm:p-12 sm:py-0 sm:pb-0 p-0 py-2 pb-2">
      <div
        className="relative group"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        {/* Glow background (desktop only) */}
        <div className="absolute -inset-6 z-0 hidden sm:block opacity-30">
          <div
            className={`absolute inset-0 rounded-full blur-2xl animate-spin-slower
              ${isDark
                ? "bg-gradient-to-r from-violet-600 via-indigo-500 to-purple-600"
                : "bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300"}
            `}
          />
          <div
            className={`absolute inset-0 rounded-full blur-2xl animate-pulse-slow opacity-50
              ${isDark
                ? "bg-gradient-to-l from-fuchsia-500 via-rose-500 to-pink-600"
                : "bg-gradient-to-l from-pink-300 via-rose-300 to-fuchsia-300"}
            `}
          />
          <div
            className={`absolute inset-0 rounded-full blur-2xl animate-float opacity-40
              ${isDark
                ? "bg-gradient-to-t from-blue-600 via-cyan-500 to-teal-400"
                : "bg-gradient-to-t from-blue-300 via-cyan-300 to-teal-300"}
            `}
          />
        </div>

        <div className="relative">
          <div
            className={`w-72 h-72 sm:w-80 sm:h-80 rounded-full overflow-hidden
              transform transition-all duration-700 group-hover:scale-105
              ${isDark
                ? "shadow-[0_0_40px_rgba(120,119,198,0.3)]"
                : "shadow-[0_20px_40px_rgba(0,0,0,0.15)]"}
            `}
          >
            {/* Border */}
            <div
              className={`absolute inset-0 rounded-full z-20 transition-all duration-700 group-hover:scale-105
                ${isDark
                  ? "border-4 border-white/20 group-hover:border-white/40"
                  : "border-4 border-black/10 group-hover:border-black/20"}
              `}
            />

            {/* Overlays (desktop only) */}
            <div
              className={`absolute inset-0 z-10 transition-opacity duration-700 hidden sm:block
                ${isDark
                  ? "bg-gradient-to-b from-black/20 via-transparent to-black/40 group-hover:opacity-0"
                  : "bg-gradient-to-b from-white/40 via-transparent to-white/20 group-hover:opacity-0"}
              `}
            />

            <div
              className={`absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 hidden sm:block
                ${isDark
                  ? "bg-gradient-to-t from-purple-500/20 via-transparent to-blue-500/20"
                  : "bg-gradient-to-t from-indigo-300/30 via-transparent to-purple-300/30"}
              `}
            />

            <img
              src="/img/profile.png"
              alt="Profile"
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
              loading="lazy"
            />

            {/* Hover shine (desktop only) */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 z-20 hidden sm:block">
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-white/20 to-transparent transform translate-y-full group-hover:-translate-y-full transition-transform duration-1000 delay-100" />
              <div
                className={`absolute inset-0 rounded-full scale-0 group-hover:scale-100 transition-transform duration-700 animate-pulse-slow
                  ${isDark ? "border-8 border-white/10" : "border-8 border-black/5"}
                `}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

const StatCard = memo(
  ({ icon: Icon, color, value, label, description, animation }: StatCardProps) => {
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === "dark";

    return (
      <div data-aos={animation} data-aos-duration={1300} className="relative group">
        <div
          className={`relative z-10 backdrop-blur-lg rounded-2xl p-6 overflow-hidden transition-all duration-300
            hover:scale-105 hover:shadow-2xl h-full flex flex-col justify-between
            ${isDark
              ? "bg-gray-900/50 border border-white/10"
              : "bg-white/70 border border-black/10"}
          `}
        >
          {/* Gradient overlay */}
          <div
            className={`absolute -z-10 inset-0 bg-gradient-to-br ${color}
              ${isDark
                ? "opacity-10 group-hover:opacity-20"
                : "opacity-20 group-hover:opacity-30"}
              transition-opacity duration-300
            `}
          ></div>

          {/* Top row */}
          <div className="flex items-center justify-between mb-4">
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center transition-transform group-hover:rotate-6
                ${isDark ? "bg-white/10" : "bg-black/5"}
              `}
            >
              <Icon
                className={`w-8 h-8 ${isDark ? "text-white" : "text-gray-800"}`}
              />
            </div>

            <span
              className={`text-4xl font-bold
                ${isDark ? "text-white" : "text-gray-900"}
              `}
              data-aos="fade-up-left"
              data-aos-duration="1500"
              data-aos-anchor-placement="top-bottom"
            >
              {value}
            </span>
          </div>

          {/* Bottom content */}
          <div>
            <p
              className={`text-sm uppercase tracking-wider mb-2
                ${isDark ? "text-gray-300" : "text-gray-600"}
              `}
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-anchor-placement="top-bottom"
            >
              {label}
            </p>

            <div className="flex items-center justify-between">
              <p
                className={`text-xs
                  ${isDark ? "text-gray-400" : "text-gray-500"}
                `}
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-anchor-placement="top-bottom"
              >
                {description}
              </p>

              <ArrowUpRight
                className={`w-4 h-4 transition-colors
                  ${isDark
                    ? "text-white/50 group-hover:text-white"
                    : "text-gray-500 group-hover:text-gray-900"}
                `}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
);


const AboutPage = () => {
  const { totalProjects, totalCertificates, YearExperience } = useMemo(() => {
    const storedProjects = JSON.parse(localStorage.getItem("projects") || "[]");
    const storedCertificates = JSON.parse(localStorage.getItem("certificates") || "[]");
    const startDate = new Date("2024-02-12");
    const today = new Date();
    const experience = today.getFullYear() - startDate.getFullYear() -
      (today < new Date(today.getFullYear(), startDate.getMonth(), startDate.getDate()) ? 1 : 0);

    return {
      totalProjects: storedProjects.length,
      totalCertificates: storedCertificates.length,
      YearExperience: experience
    };
  }, []);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  useEffect(() => {
    AOS.init({ once: false });
  }, []);

  const statsData = useMemo(() => [
    { icon: Code, color: "from-[#6366f1] to-[#a855f7]", value: totalProjects, label: "Total Projects", description: "Innovative web solutions crafted", animation: "fade-right" },
    { icon: Award, color: "from-[#a855f7] to-[#6366f1]", value: totalCertificates, label: "Certificates", description: "Professional skills validated", animation: "fade-up" },
    { icon: Globe, color: "from-[#6366f1] to-[#a855f7]", value: YearExperience, label: "Years of Experience", description: "Continuous learning journey", animation: "fade-left" },
  ], [totalProjects, totalCertificates, YearExperience]);

  return (
    <div className="h-auto pb-[10%] text-white overflow-hidden px-[5%] sm:px-[5%] lg:px-[10%] mt-10 sm-mt-0" id="About">
      <Header />
      <div className="w-full mx-auto pt-8 sm:pt-12 relative">
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="space-y-6 text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">Hello, I'm</span>
              <span className="block mt-2 text-gray-200">
                <ThemedGradient>
                  Jan Niño Baoc
                </ThemedGradient>
              </span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-400 leading-relaxed text-justify pb-4 sm:pb-0">
              <ThemedGradient>
                A collaborative and goal-oriented professional striving to make meaningful contributions while developing new capabilities.
              </ThemedGradient>
            </p>

            {/* Quote Section */}
            <div className="relative bg-gradient-to-br from-[#6366f1]/5 via-transparent to-[#a855f7]/5 border border-gradient-to-r border-[#6366f1]/30 rounded-2xl p-4 my-6 backdrop-blur-md shadow-2xl overflow-hidden">
              <div className="absolute top-2 right-4 w-16 h-16 bg-gradient-to-r from-[#6366f1]/20 to-[#a855f7]/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -left-2 w-12 h-12 bg-gradient-to-r from-[#a855f7]/20 to-[#6366f1]/20 rounded-full blur-lg"></div>
              <blockquote
                className={`text-center lg:text-left italic font-medium text-sm relative z-10 pl-6
                  ${isDark ? "text-gray-300" : "text-gray-700"}`}
              >
                "AI as a tool for professionals, not a substitute."
              </blockquote>
            </div>

            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4 lg:gap-4 lg:px-0 w-full">
              <a href="#" className="w-full lg:w-auto">
                <button className="w-full lg:w-auto sm:px-6 py-2 sm:py-3 rounded-lg bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center lg:justify-start gap-2 shadow-lg hover:shadow-xl">
                  <FileText className="w-4 h-4 sm:w-5 sm:h-5" /> Download CV
                </button>
              </a>
              <a href="#Portfolio" className="w-full lg:w-auto">
                <button className="w-full lg:w-auto sm:px-6 py-2 sm:py-3 rounded-lg border border-[#a855f7]/50 text-[#a855f7] font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center lg:justify-start gap-2 hover:bg-[#a855f7]/10">
                  <Code className="w-4 h-4 sm:w-5 sm:h-5" /> View Projects
                </button>
              </a>
            </div>
          </div>
          <ProfileImage />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 cursor-pointer">
          {statsData.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(AboutPage);
