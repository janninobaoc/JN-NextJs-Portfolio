"use client";

import React, { useState } from "react";
import { Eye, ArrowRight, ExternalLink } from "lucide-react";
import { useTheme } from "next-themes";

interface ProjectCardModalProps {
  title: string;
  description: string;
  link: string;
}

const ProjectCardModal: React.FC<ProjectCardModalProps> = ({
  title,
  description,
  link,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <>
      <button
        className={`inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg transition-colors duration-200
          ${isDark
            ? "bg-white/5 hover:bg-white/10 text-white/90"
            : "bg-black/5 hover:bg-black/10 text-gray-900"
          }`}
        onClick={() => setIsOpen(true)}
      >
        <span className="text-sm">Details</span>
        <ArrowRight className="w-4 h-4" />
      </button>

      {isOpen && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center animate-fade-in
            ${isDark ? "bg-black/50" : "bg-black/30"}
          `}
          onClick={() => setIsOpen(false)}
        >
          <div
            className={`relative w-full max-w-md rounded-lg p-6 shadow-lg animate-slide-up sm:p-8
              ${isDark ? "bg-gray-900 text-white" : "bg-white text-gray-900"}
            `}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={`absolute top-4 right-4 rounded-md p-2 transition-colors duration-200
                ${isDark ? "hover:bg-gray-800" : "hover:bg-gray-200"}
              `}
              onClick={() => setIsOpen(false)}
            >
              <Eye className="h-5 w-5" />
            </button>

            <h2 className="mb-4 text-2xl font-bold">{title}</h2>

            <p className={`mb-6 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              {description}
            </p>

            <div className="flex justify-end space-x-4">
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md bg-blue-600 px-4 py-2 font-medium hover:bg-blue-700 transition-colors duration-200 text-white"
              >
                Live Demo
                <ExternalLink className="ml-2 inline-block h-5 w-5" />
              </a>

              <button
                className={`rounded-md px-4 py-2 font-medium transition-colors duration-200
                  ${isDark
                    ? "bg-gray-800 hover:bg-gray-700 text-white"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-900"
                  }`}
                onClick={() => setIsOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectCardModal;
