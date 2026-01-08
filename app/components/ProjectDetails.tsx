"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  ArrowLeft, ExternalLink, Github, Code2, Star,
  ChevronRight, Layers, Layout, Globe, Package, Cpu, Code,
} from "lucide-react";
import Swal from "sweetalert2";
import ThemedGradient from "./ThemedGradient";
import { useTheme } from 'next-themes';

const TECH_ICONS: any = {
  HTML: "/svg/html.svg",
  CSS: "/svg/css.svg",
  Javascript: "/svg/javascript.svg",
  Tailwind: "/svg/tailwind.svg",
  NextJs: "/svg/nextjs.svg",
  ReactJs: "/svg/reactjs.svg",
  VueJs: "/svg/vuejs.svg",
  Laravel: "/svg/laravel.svg",
  MySQL: "/svg/mysql.svg",
  Java: "/svg/java.svg",
  default: Package,
};

// ---------------------- BADGE ----------------------
const TechBadge = ({ tech }: { tech: string }) => {
  const Icon = TECH_ICONS[tech] || TECH_ICONS["default"];
  const isImage = typeof Icon === "string";

  return (
    <div className="group relative overflow-hidden px-3 py-2 md:px-4 md:py-2.5 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-xl border border-blue-500/10 hover:border-blue-500/30 transition-all duration-300 cursor-default">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-500" />
      <div className="relative flex items-center gap-1.5 md:gap-2">

        {/* If icon is a path → show <img> */}
        {isImage ? (
          <img
            src={Icon}
            alt={tech}
            className="w-3.5 h-3.5 md:w-4 md:h-4"
          />
        ) : (
          <Icon className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-400 group-hover:text-blue-300 transition-colors" />
        )}

        <span className="text-xs md:text-sm font-medium text-blue-300/90 group-hover:text-blue-200 transition-colors">
          {tech}
        </span>
      </div>
    </div>
  );
};

// ---------------------- FEATURE ----------------------
const FeatureItem = ({ feature }: { feature: string }) => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <li
      className={`group flex items-start space-x-3 p-2.5 md:p-3.5 rounded-xl
        transition-all duration-300 border
        ${isDark
          ? "hover:bg-white/5 hover:border-white/10 border-transparent"
          : "hover:bg-gray-100 hover:border-gray-300 border-gray-200"
        }`}
    >
      {/* Dot Indicator */}
      <div className="relative mt-2">
        <div
          className={`absolute -inset-1 rounded-full blur transition-opacity duration-300
            ${isDark
              ? "bg-gradient-to-r from-blue-600/20 to-purple-600/20 group-hover:opacity-100 opacity-0"
              : "bg-gradient-to-r from-blue-200/30 to-purple-200/30 group-hover:opacity-100 opacity-0"
            }`}
        />
        <div className={`relative w-1.5 h-1.5 md:w-2 md:h-2 rounded-full
          ${isDark
            ? "bg-gradient-to-r from-blue-400 to-purple-400"
            : "bg-gradient-to-r from-blue-500 to-purple-500"
          } group-hover:scale-125 transition-transform duration-300`}
        />
      </div>

      {/* Feature Text */}
      <span className={`text-sm md:text-base transition-colors
        ${isDark ? "text-gray-300 group-hover:text-white" : "text-gray-800 group-hover:text-gray-900"}
      `}>
        <ThemedGradient>
          {feature}
        </ThemedGradient>
      </span>
    </li>
  );
};

// ---------------------- STATS ----------------------
const ProjectStats = ({ project }: { project: any }) => {
  const techStackCount = project?.TechStack?.length || 0;
  const featuresCount = project?.Features?.length || 0;

  return (
    <div className="grid grid-cols-2 gap-3 md:gap-4 p-3 md:p-4 bg-[#0a0a1a] rounded-xl overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20 opacity-50 blur-2xl z-0" />

      <div className="relative z-10 flex items-center space-x-2 md:space-x-3 bg-white/5 p-2 md:p-3 rounded-lg border border-blue-500/20 transition-all duration-300 hover:scale-105 hover:border-blue-500/50 hover:shadow-lg">
        <div className="bg-blue-500/20 p-1.5 md:p-2 rounded-full">
          <Code2 className="text-blue-300 w-4 h-4 md:w-6 md:h-6" strokeWidth={1.5} />
        </div>
        <div className="flex-grow">
          <div className="text-lg md:text-xl font-semibold text-blue-200">
            {techStackCount}
          </div>
          <div className="text-[10px] md:text-xs text-gray-400">Total Technology</div>
        </div>
      </div>

      <div className="relative z-10 flex items-center space-x-2 md:space-x-3 bg-white/5 p-2 md:p-3 rounded-lg border border-purple-500/20 transition-all duration-300 hover:scale-105 hover:border-purple-500/50 hover:shadow-lg">
        <div className="bg-purple-500/20 p-1.5 md:p-2 rounded-full">
          <Layers className="text-purple-300 w-4 h-4 md:w-6 md:h-6" strokeWidth={1.5} />
        </div>
        <div className="flex-grow">
          <div className="text-lg md:text-xl font-semibold text-purple-200">
            {featuresCount}
          </div>
          <div className="text-[10px] md:text-xs text-gray-400">Key Features</div>
        </div>
      </div>
    </div>
  );
};

// ---------------------- ALERT HANDLER ----------------------
const handleGithubClick = (githubLink: string) => {
  if (githubLink === "Private") {
    Swal.fire({
      icon: "info",
      title: "Source Code Private",
      text: "Sorry, the source code for this project is private.",
      confirmButtonText: "Understand",
      confirmButtonColor: "#3085d6",
      background: "#030014",
      color: "#ffffff",
    });

    return false;
  }
  return true;
};

// ---------------------- MAIN PAGE ----------------------
export default function ProjectDetails() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [project, setProject] = useState<any>(null);
  console.log(['project', project])
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    if (!id) return;

    const storedProjects = JSON.parse(localStorage.getItem("projects") || "[]");
    const selectedProject = storedProjects.find((p: any) => String(p.id) === id);

    if (selectedProject) {
      setProject({
        ...selectedProject,
        Features: selectedProject.Features || [],
        TechStack: selectedProject.TechStack || [],
        Github: selectedProject.Github || "https://github.com/janninobaoc",
      });
    }
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#030014] flex items-center justify-center">
        <div className="text-center space-y-6 animate-fadeIn">
          <div className="w-16 h-16 md:w-24 md:h-24 mx-auto border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
          <h2 className="text-xl md:text-3xl font-bold text-white">
            Loading Project...
          </h2>
        </div>
      </div>
    );
  }
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <div className="min-h-screen px-[2%] sm:px-0 relative overflow-hidden">

      {/* backgrounds same as original */}
      <div className="fixed inset-0">
        <div className="absolute -inset-[10px] opacity-20">
          <div className="absolute top-0 -left-4 w-72 md:w-96 h-72 md:h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
          <div className="absolute top-0 -right-4 w-72 md:w-96 h-72 md:h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-20 w-72 md:w-96 h-72 md:h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />
        </div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />
      </div>

      {/* CONTENT */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-16">

          {/* Back Button */}
          <div className="flex items-center space-x-2 md:space-x-4 mb-8 md:mb-12 animate-fadeIn">
            <button
              onClick={() => router.back()}
              className={`group inline-flex items-center space-x-1.5 md:space-x-2 px-3 md:px-5 py-2 md:py-2.5 backdrop-blur-xl rounded-xl
                   transition-all duration-300 text-sm md:text-base
                    ${isDark
                  ? "bg-white/5 text-white/90 hover:bg-white/10 border border-white/10 hover:border-white/20"
                  : "bg-white text-gray-900 hover:bg-gray-100 border border-gray-300 hover:border-gray-400"
                }
          `}
            >
              <ArrowLeft
                className={`w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:-translate-x-1
                  ${isDark ? "text-white/80" : "text-gray-800"}
               `}
              />
              <span>
                <ThemedGradient>
                  Back
                </ThemedGradient>
              </span>
            </button>

            <div className="flex items-center space-x-1 md:space-x-2 text-sm md:text-base text-white/50">
              <span>
                <ThemedGradient>
                  Projects
                </ThemedGradient>
              </span>
              <ChevronRight
                className={`w-3 h-3 md:w-4 md:h-4 transition-colors
                   ${isDark ? "text-white/80" : "text-gray-600"}
                   `}
              />
              <span className="text-white/90 truncate">
                <ThemedGradient>
                  {project.title}
                </ThemedGradient>
              </span>
            </div>
          </div>

          {/* GRID */}
          <div className="grid lg:grid-cols-2 gap-8 md:gap-16">

            {/* LEFT SIDE */}
            <div className="space-y-6 md:space-y-10 animate-slideInLeft">

              <h1 className="text-3xl md:text-6xl font-bold bg-gradient-to-r from-blue-300 via-purple-300 to-pink-400 bg-clip-text text-transparent leading-tight">
                {project.title}
              </h1>

              <p className="text-base md:text-lg text-gray-300/90 leading-relaxed">
                <ThemedGradient>
                  {project.description}
                </ThemedGradient>
              </p>

              <ProjectStats project={project} />

              {/* Buttons */}
              <div className="flex flex-wrap gap-3 md:gap-4">
                <a href={project.link} target="_blank" className="group relative inline-flex items-center space-x-2 px-6 py-3 bg-blue-600/10 hover:bg-blue-600/20 rounded-xl text-blue-300 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 backdrop-blur-xl">
                  <ExternalLink className="relative w-4 h-4 group-hover:rotate-12 transition-transform" />
                  <span className="relative font-medium">Live Demo</span>
                </a>

                <a
                  href={project.github}
                  target="_blank"
                  className="group relative inline-flex items-center space-x-2 px-6 py-3 bg-purple-600/10 hover:bg-purple-600/20 rounded-xl text-purple-300 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 backdrop-blur-xl"
                  onClick={(e) => !handleGithubClick(project.github) && e.preventDefault()}
                >
                  <Github className="relative w-4 h-4 group-hover:rotate-12 transition-transform" />
                  <span className="relative font-medium">Github</span>
                </a>
              </div>

              {/* Tech stack */}
              <div className="space-y-4 md:space-y-6">
                <h3 className="text-lg md:text-xl font-semibold text-white/90 flex items-center gap-3">
                  <Code2 className="w-5 h-5 text-blue-400" />
                  <ThemedGradient>
                    Technologies Used
                  </ThemedGradient>
                </h3>

                {project.TechStack.length > 0 ? (
                  <div className="flex flex-wrap gap-3">
                    {project.TechStack.map((tech: string, i: number) => (
                      <TechBadge key={i} tech={tech} />
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 opacity-50">
                    <ThemedGradient>
                      No technologies added.
                    </ThemedGradient>
                  </p>
                )}
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="space-y-6 md:space-y-10 animate-slideInRight">
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
                <img
                  src={project.img}
                  alt={project.title}
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onLoad={() => setIsImageLoaded(true)}
                />
                <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/10 transition-colors duration-300 rounded-2xl" />
              </div>

              {/* FEATURES */}
              <div className={`
              ${isDark
                  ? "bg-white/[0.02] border-white/10 hover:border-white/20"
                  : "bg-white border-gray-300 hover:border-gray/20"}
                backdrop-blur-xl rounded-2xl p-8 border space-y-6 transition-colors`}>
                <h3 className="text-xl font-semibold text-white/90 flex items-center gap-3">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <ThemedGradient>
                    Key Features
                  </ThemedGradient>
                </h3>

                {project.Features.length > 0 ? (
                  <ul className="space-y-2">
                    {project.Features.map((f: string, i: number) => (
                      <FeatureItem key={i} feature={f} />
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-400 opacity-50">
                    <ThemedGradient>
                      No features added.
                    </ThemedGradient>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ANIMATIONS */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob { animation: blob 10s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }

        @keyframes fadeIn { from{opacity:0;} to{opacity:1;} }
        .animate-fadeIn { animation: fadeIn .7s ease-out; }

        @keyframes slideInLeft {
          from{ opacity:0; transform:translateX(-30px); }
          to{ opacity:1; transform:translateX(0); }
        }
        .animate-slideInLeft { animation: slideInLeft .7s ease-out; }

        @keyframes slideInRight {
          from{ opacity:0; transform:translateX(30px); }
          to{ opacity:1; transform:translateX(0); }
        }
        .animate-slideInRight { animation: slideInRight .7s ease-out; }
      `}</style>
    </div >
  );
};


