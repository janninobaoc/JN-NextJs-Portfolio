"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink, ArrowRight } from "lucide-react";
import { useTheme } from "next-themes";
import ThemedGradient from "./ThemedGradient";

interface CardProjectProps {
  img: string;
  title: string;
  description: string;
  link?: string;
  github?: string;
  TeckStack?: Array<string>;
  Features: Array<string>;
  id?: string | number;
}


const CardProject: React.FC<CardProjectProps> = ({ img, title, description, link, id }) => {
  const handleLiveDemo = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (!link) {
      e.preventDefault();
      alert("Live demo link is not available");
    }
  };

  const handleDetails = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (!id) {
      e.preventDefault();
      alert("Project details are not available");
    }
  };
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <div className="group relative w-full">
      <div
        className={`
    relative overflow-hidden rounded-xl backdrop-blur-lg border shadow-2xl
    transition-all duration-300 hover:shadow-purple-500/20
    ${isDark
            ? "bg-gradient-to-br from-slate-900/90 to-slate-800/90 border-white/10"
            : "bg-white/50 border-black/10 shadow-lg"}
  `}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>

        <div className="relative p-5 z-10">
          <div className="relative overflow-hidden rounded-lg">
            <Image
              src={img}
              alt={title}
              width={500}
              height={300}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          <div className="mt-4 space-y-3">
            <h3
              className={`text-xl font-semibold bg-clip-text text-transparent ${isDark
                ? 'bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200'
                : 'bg-gradient-to-r from-blue-300 via-purple-400 to-pink-300'
                }`}
            >
              {title}
            </h3>

            <p className="text-gray-300/80 text-sm leading-relaxed line-clamp-2">
              <ThemedGradient>
                {description}
              </ThemedGradient>
            </p>

            <div className="pt-4 flex items-center justify-between">
              {link ? (
                <a
                  href={link || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLiveDemo}
                  className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors duration-200"
                >
                  <span className="text-sm font-medium">Live Demo</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              ) : (
                <span className="text-gray-500 text-sm">Demo Not Available</span>
              )}

              {id ? (
                <Link
                  href={`/project/${id}`}
                  onClick={handleDetails}
                  className={`
        inline-flex items-center space-x-2 px-4 py-2 rounded-lg
        transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-500/50
        ${isDark
                      ? "bg-white/5 hover:bg-white/10 text-white/90"
                      : "bg-white border-gray-300 text-gray-900"}
      `}
                >
                  <span className="text-sm font-medium">
                    <ThemedGradient>
                      Details
                    </ThemedGradient>
                  </span>
                  <ArrowRight
                    className="w-4 h-4"
                    style={{ color: isDark ? '#FFFFFF' : '#000000' }}
                  />
                </Link>
              ) : (
                <span className="text-gray-500 text-sm">Details Not Available</span>
              )}
            </div>
          </div>

          <div className="absolute inset-0 border border-white/0 group-hover:border-purple-500/50 rounded-xl transition-colors duration-300 -z-50"></div>
        </div>
      </div>
    </div>
  );
};

export default CardProject;
