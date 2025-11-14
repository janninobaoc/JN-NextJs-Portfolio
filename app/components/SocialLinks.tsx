"use client";

import { useEffect } from "react";
import {
  Linkedin,
  Github,
  Instagram,
  Youtube,
  ExternalLink,
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const socialLinks = [
  {
    name: "LinkedIn",
    displayName: "Let's Connect",
    subText: "on LinkedIn",
    icon: Linkedin,
    url: "#",
    color: "#0A66C2",
    gradient: "from-[#0A66C2] to-[#0077B5]",
    isPrimary: true,
  },
  {
    name: "Instagram",
    displayName: "Instagram",
    subText: "@jn",
    icon: Instagram,
    url: "#",
    color: "#E4405F",
    gradient: "from-[#833AB4] via-[#E4405F] to-[#FCAF45]",
  },
  {
    name: "YouTube",
    displayName: "YouTube",
    subText: "@jn",
    icon: Youtube,
    url: "#",
    color: "#FF0000",
    gradient: "from-[#FF0000] to-[#CC0000]",
  },
  {
    name: "GitHub",
    displayName: "GitHub",
    subText: "@jn",
    icon: Github,
    url: "#",
    color: "#ffffff",
    gradient: "from-[#333] to-[#24292e]",
  },
  {
    name: "TikTok",
    displayName: "Tiktok",
    subText: "@jn",
    icon: ({ className, ...props }: { className?: string; [key: string]: any }) => (
      <svg
        width="24px"
        height="24px"
        viewBox="0 0 45 45"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <g fill="none" fillRule="evenodd">
          <g transform="translate(8 6)">
            <path
              d="M29.52 9.44c-1.44-.4-2.76-1.15-3.84-2.19-.17-.16-.33-.33-.49-.5C23.9 5.28 23.2 3.38 23.23 1.42h-5.87v22.28c0 4.08-2.21 6.24-4.94 6.24-.72.01-1.44-.14-2.1-.45a5.1 5.1 0 0 1-1.7-1.29c-.47-.55-.81-1.2-.99-1.9a5.2 5.2 0 0 1 .2-3.21 5.3 5.3 0 0 1 2.36-2.46c.62-.36 1.32-.59 2.02-.66.7-.07 1.4 0 2.1.23v-6c-.53-.12-1.07-.18-1.62-.18-2.13 0-4.22.64-5.98 1.83A11.9 11.9 0 0 0 2.42 20.88c-.81 1.97-1.02 4.14-.6 6.24.42 2.09 1.45 4.02 2.97 5.52 1.53 1.52 3.46 2.5 5.57 2.93 2.11.42 4.29.22 6.27-.62a11.8 11.8 0 0 0 4.85-4.33c1.18-1.76 1.81-3.86 1.81-6.03V12.82c2.28 1.58 5 2.33 7.9 2.39V9.68c-.54-.02-1.07-.1-1.63-.24"
              fill="#FE2C55"
            />
            <path
              d="M25.19 6.75a8 8 0 0 1-1.13-.92 8.1 8.1 0 0 1-2.32-4.4c-.08-.47-.12-.95-.12-1.43h-5.88v22.64c0 4.87-2.21 5.88-4.94 5.88-.72 0-1.43-.15-2.1-.44a5 5 0 0 1-1.71-1.28 5.24 5.24 0 0 1-.99-1.89 5.1 5.1 0 0 1 2.6-6.07 5.4 5.4 0 0 1 2.03-.66 5.5 5.5 0 0 1 2.13.26V12.93C5.4 11.82 0 17.48 0 23.58c0 2.87 1.14 5.62 3.17 7.65C5.2 33.24 7.94 34.39 10.81 34.39c5.96 0 10.81-3.65 10.81-10.81V11.39a12.3 12.3 0 0 0 7.9 2.37V8.26c-1.55-.07-3.05-.6-4.31-1.51"
              fill="#25F4EE"
            />
            <path
              d="M21.62 23.58V11.39c2.28 1.59 5 2.33 7.91 2.38V9.45c-1.44-.4-2.76-1.15-3.84-2.19-.18-.16-.35-.33-.52-.5a8.1 8.1 0 0 1-2.32-4.4h-3.87v22.28c0 4.09-2.21 6.27-4.94 6.27-.77 0-1.54-.18-2.24-.53a5 5 0 0 1-1.75-1.5c-.96-.56-1.72-1.36-2.22-2.33a5.1 5.1 0 0 1 1.78-6.01 5.4 5.4 0 0 1 2.13-.66c.55 0 1.1.07 1.62.23v-4.73a11.9 11.9 0 0 0-5.92 1.78c-1.76 1.16-3.14 2.8-3.98 4.74C1.67 22.63 1.42 24.76 1.78 26.84c.34 2.07 1.3 3.97 2.75 5.5 1.83 1.32 4.03 2.03 6.28 2.03 5.96 0 10.81-3.64 10.81-10.79"
              fill="#000"
            />
          </g>
        </g>
      </svg>
    ),
    url: "#",
    color: "black",
    gradient: "from-[#000000] via-[#25F4EE] to-[#FE2C55]",
  },
];

const SocialLinks = () => {
  const linkedIn = socialLinks.find((l) => l.isPrimary);
  const otherLinks = socialLinks.filter((l) => !l.isPrimary);
  const [instagram, youtube, github, tiktok] = otherLinks;

  useEffect(() => {
    AOS.init({ offset: 10 });
  }, []);

  if (!linkedIn) {
    return null;
  }

  return (
    <div className="w-full bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-6 py-8 backdrop-blur-xl">
      <h3
        className="text-xl font-semibold text-white mb-6 flex items-center gap-2"
        data-aos="fade-down" 
      >
        <span className="inline-block w-8 h-1 bg-indigo-500 rounded-full"></span>
        Connect With Me
      </h3>

      <div className="flex flex-col gap-4">
        {/* LinkedIn - Primary Row */}
        <a
          href={linkedIn?.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-between p-4 rounded-lg 
                     bg-white/5 border border-white/10 overflow-hidden
                     hover:border-white/20 transition-all duration-500"
          data-aos="fade-up"
          data-aos-delay="100" 
        >
          {/* Hover Gradient Background */}
          <div
            className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500
                       bg-gradient-to-r ${linkedIn?.gradient}`}
          />

          {/* Content Container */}
          <div className="relative flex items-center gap-4">
            {/* Icon Container */}
            <div className="relative flex items-center justify-center">
              <div
                className="absolute inset-0 opacity-20 rounded-md transition-all duration-500
                               group-hover:scale-110 group-hover:opacity-30"
                style={{ backgroundColor: linkedIn?.color }}
              />
              <div className="relative p-2 rounded-md">
                <linkedIn.icon
                  className="w-6 h-6 transition-all duration-500 group-hover:scale-105"
                  style={{ color: linkedIn?.color }}
                />
              </div>
            </div>

            {/* Text Container */}
            <div className="flex flex-col">
              <span className="text-lg font-bold pt-[0.2rem] text-gray-200 tracking-tight leading-none group-hover:text-white transition-colors duration-300">
                {linkedIn?.displayName}
              </span>
              <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                {linkedIn?.subText}
              </span>
            </div>
          </div>

          {/* External Link */}
          <ExternalLink
            className="relative w-5 h-5 text-gray-500 group-hover:text-white
                       opacity-0 group-hover:opacity-100 transition-all duration-300
                       transform group-hover:translate-x-0 -translate-x-1"
          />

          {/* Shine Effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none overflow-hidden">
            <div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent
                               translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"
            />
          </div>
        </a>

        {/* Second Row - Instagram & YouTube */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[instagram, youtube].map((link, index) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center gap-3 p-4 rounded-xl 
                               bg-white/5 border border-white/10 overflow-hidden
                               hover:border-white/20 transition-all duration-500"
              data-aos="fade-up" 
              data-aos-delay={200 + index * 100} 
            >
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500
                                     bg-gradient-to-r ${link.gradient}`}
              />

              <div className="relative flex items-center justify-center">
                <div
                  className="absolute inset-0 opacity-20 rounded-lg transition-all duration-500
                                       group-hover:scale-125 group-hover:opacity-30"
                  style={{ backgroundColor: link.color }}
                />
                <div className="relative p-2 rounded-lg">
                  <link.icon
                    className="w-5 h-5 transition-all duration-500 group-hover:scale-110"
                    style={{ color: link.color }}
                  />
                </div>
              </div>

              {/* Text Container */}
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-bold text-gray-200 group-hover:text-white transition-colors duration-300">
                  {link.displayName}
                </span>
                <span className="text-xs text-gray-400 truncate group-hover:text-gray-300 transition-colors duration-300">
                  {link.subText}
                </span>
              </div>

              <ExternalLink
                className="w-4 h-4 text-gray-500 group-hover:text-white ml-auto
                                       opacity-0 group-hover:opacity-100 transition-all duration-300
                                       transform group-hover:translate-x-0 -translate-x-2"
              />

              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none overflow-hidden">
                <div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent
                                       translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"
                />
              </div>
            </a>
          ))}
        </div>

        {/* Third Row - GitHub & TikTok */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[github, tiktok].map((link, index) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center gap-3 p-4 rounded-xl 
                               bg-white/5 border border-white/10 overflow-hidden
                               hover:border-white/20 transition-all duration-500"
              data-aos="fade-up" 
              data-aos-delay={400 + index * 100}
            >
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500
                                     bg-gradient-to-r ${link.gradient}`}
              />

              <div className="relative flex items-center justify-center">
                <div
                  className="absolute inset-0 opacity-20 rounded-lg transition-all duration-500
                                       group-hover:scale-125 group-hover:opacity-30"
                  style={{ backgroundColor: link.color }}
                />
                <div className="relative p-2 rounded-lg">
                  <link.icon
                    className="w-5 h-5 transition-all duration-500 group-hover:scale-110"
                    style={{ color: link.color }}
                  />
                </div>
              </div>

              {/* Text Container */}
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-bold text-gray-200 group-hover:text-white transition-colors duration-300">
                  {link.displayName}
                </span>
                <span className="text-xs text-gray-400 truncate group-hover:text-gray-300 transition-colors duration-300">
                  {link.subText}
                </span>
              </div>

              <ExternalLink
                className="w-4 h-4 text-gray-500 group-hover:text-white ml-auto
                                       opacity-0 group-hover:opacity-100 transition-all duration-300
                                       transform group-hover:translate-x-0 -translate-x-2"
              />

              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none overflow-hidden">
                <div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent
                                       translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialLinks;
