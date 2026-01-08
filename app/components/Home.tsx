"use client";

import { useState, useEffect, useCallback, memo } from "react";
import { Github, Linkedin, Mail, ExternalLink, Instagram, Sparkles } from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useTheme } from 'next-themes';
import ThemedGradient from "./ThemedGradient";
// Memoized Components
const StatusBadge = memo(() => {
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === 'dark';

    return (
        <div className="inline-block animate-float lg:mx-0" data-aos="zoom-in" data-aos-delay="400">
            <div className="relative group">
                {/* Gradient glow behind */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-full blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>

                {/* Main badge container */}
                <div
                    className={`relative px-3 sm:px-4 py-2 rounded-full backdrop-blur-xl border transition-colors
            ${isDark ? 'bg-black/40 border-white/10' : 'bg-white/40 border-black/10'}
          `}
                >
                    <ThemedGradient className="sm:text-sm text-[0.7rem] font-medium flex items-center">
                        <Sparkles className="sm:w-4 sm:h-4 w-3 h-3 mr-2 text-blue-400" />
                        Ready to Innovate
                    </ThemedGradient>
                </div>
            </div>
        </div>
    );
});

const MainTitle = memo(() => (
    <div className="space-y-2" data-aos="fade-up" data-aos-delay="600">
        <h1 className="text-5xl sm:text-6xl md:text-6xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
            <span className="relative inline-block">
                <span className="absolute -inset-2 bg-gradient-to-r from-[#6366f1] to-[#a855f7] blur-2xl opacity-20"></span>
                <span className="relative bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                    <ThemedGradient>
                        FullStack
                    </ThemedGradient>
                </span>
            </span>
            <br />
            <span className="relative inline-block mt-2">
                <span className="absolute -inset-2 bg-gradient-to-r from-[#6366f1] to-[#a855f7] blur-2xl opacity-20"></span>
                <span className="relative bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent">
                    Developer
                </span>
            </span>
        </h1>
    </div>
));


const TechStack = ({ tech }: { tech: string }) => {
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === 'dark';

    return (
        <div
            className={`px-4 py-2 hidden sm:block rounded-full backdrop-blur-sm border text-sm transition-colors
        ${isDark ? 'bg-white/5 border-white/10 hover:bg-white/10 text-gray-300' : 'bg-black/5 border-black/20 hover:bg-black/10 text-gray-900'}
      `}
        >
            <ThemedGradient>{tech}</ThemedGradient>
        </div>
    );
};

const CTAButton = memo(({ href, text, icon: Icon }: { href: string; text: string; icon: any }) => {
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === "dark";

    // Adjust background and text gradients based on theme
    const buttonBg = isDark
        ? "bg-[#030014]"
        : "bg-white shadow-sm";

    const borderColor = isDark
        ? "border-white/10"
        : "border-black/10";

    const iconColor = isDark
        ? "text-gray-200"
        : "text-gray-800";

    const iconHover = isDark
        ? "group-hover:text-white"
        : "group-hover:text-black";

    const glowOpacity = isDark
        ? "opacity-50 group-hover:opacity-90"
        : "opacity-30 group-hover:opacity-60";

    const gradientOuter = isDark
        ? "from-[#4f52c9] to-[#8644c5]" // dark gradient
        : "from-[#a3a3ff] to-[#c084fc]"; // light gradient

    const gradientOverlay = isDark
        ? "from-[#4f52c9]/20 to-[#8644c5]/20"
        : "from-[#a3a3ff]/20 to-[#c084fc]/20";

    const textGradient = isDark
        ? "from-gray-200 to-white"
        : "from-black to-gray-700";

    return (
        <a href={href}>
            <button className="group relative w-[160px]">
                {/* Outer glow gradient */}
                <div
                    className={`absolute -inset-0.5 bg-gradient-to-r ${gradientOuter} rounded-xl blur-md ${glowOpacity} transition-all duration-700`}
                ></div>


                {/* Inner button */}
                <div
                    className={`relative h-11 ${buttonBg} backdrop-blur-xl rounded-lg border ${borderColor} leading-none overflow-hidden`}
                >
                    {/* Hover overlay */}
                    <div
                        className={`absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 bg-gradient-to-r ${gradientOverlay}`}
                    ></div>

                    {/* Content */}
                    <span className="absolute inset-0 flex items-center justify-center gap-2 group-hover:gap-3 transition-all duration-300">
                        <span
                            className={`bg-gradient-to-r ${textGradient} bg-clip-text text-transparent font-medium z-10`}
                        >
                            {text}
                        </span>
                        <Icon
                            className={`w-4 h-4 ${iconColor} ${iconHover} ${text === "Contact"
                                ? "group-hover:translate-x-1"
                                : "group-hover:rotate-45"} transform transition-all duration-300 z-10`}
                        />
                    </span>
                </div>
            </button>
        </a>
    );
});

const SocialLink = memo(
    ({ icon: Icon, link }: { icon: any; link: string }) => {
        const { resolvedTheme } = useTheme();
        const isDark = resolvedTheme === "dark";

        // THEME CONTROLS
        const outerGlow = isDark
            ? "from-[#6366f1] to-[#a855f7]"
            : "from-[#a5b4fc] to-[#c4b5fd]";

        const innerBg = isDark
            ? "bg-black/50"
            : "bg-white/70";

        const borderColor = isDark
            ? "border-white/10 group-hover:border-white/20"
            : "border-black/10 group-hover:border-black/20";

        const iconColor = isDark
            ? "text-gray-400 group-hover:text-white"
            : "text-gray-700 group-hover:text-black";

        return (
            <a href={link} target="_blank" rel="noopener noreferrer">
                <button className="group relative p-3">
                    {/* Glow */}
                    <div
                        className={`absolute inset-0 bg-gradient-to-r ${outerGlow} rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-300`}
                    ></div>

                    {/* Button */}
                    <div
                        className={`relative rounded-xl ${innerBg} backdrop-blur-xl p-2 
              flex items-center justify-center border ${borderColor}
              transition-all duration-300`}
                    >
                        <Icon
                            className={`w-5 h-5 ${iconColor} transition-colors duration-300`}
                        />
                    </div>
                </button>
            </a>
        );
    }
);

// Constants
const TYPING_SPEED = 100;
const ERASING_SPEED = 50;
const PAUSE_DURATION = 2000;
const WORDS = ["CCT Graduate Major in Web Development", "Tech Enthusiast", "UI/UX Designer", "Lifelong Learner"];
const TECH_STACK = ["HTML", "CSS", "Javascript", "React", "Tailwind", "NextJS", "Laravel", "MySQL", "VueJS", "Java", "Selenium", "WordPress"];
const SOCIAL_LINKS = [
    { icon: Github, link: "https://github.com/janninobaoc" },
    { icon: Linkedin, link: "https://www.linkedin.com/in/jan-nino-baoc-8ba6602a4/" },
    { icon: Instagram, link: "https://www.instagram.com/janninobaoc/" },
];

const Home = () => {
    const [text, setText] = useState("");
    const [isTyping, setIsTyping] = useState(true);
    const [wordIndex, setWordIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    // Optimize AOS initialization
    useEffect(() => {
        const initAOS = () => {
            AOS.init({
                once: true,
                offset: 10,

            });
        };

        initAOS();
        window.addEventListener('resize', initAOS);
        return () => window.removeEventListener('resize', initAOS);
    }, []);

    useEffect(() => {
        setIsLoaded(true);
        return () => setIsLoaded(false);
    }, []);

    // Typing effect
    const handleTyping = useCallback(() => {
        if (isTyping) {
            if (charIndex < WORDS[wordIndex].length) {
                setText((prev) => prev + WORDS[wordIndex][charIndex]);
                setCharIndex((prev) => prev + 1);
            } else {
                setTimeout(() => setIsTyping(false), PAUSE_DURATION);
            }
        } else {
            if (charIndex > 0) {
                setText((prev) => prev.slice(0, -1));
                setCharIndex((prev) => prev - 1);
            } else {
                setWordIndex((prev) => (prev + 1) % WORDS.length);
                setIsTyping(true);
            }
        }
    }, [charIndex, isTyping, wordIndex]);

    useEffect(() => {
        const timeout = setTimeout(handleTyping, isTyping ? TYPING_SPEED : ERASING_SPEED);
        return () => clearTimeout(timeout);
    }, [handleTyping, isTyping]);

    // Lottie
    const lottieOptions = {
        src: "https://lottie.host/4953c6ff-f8b0-45cd-b667-baf472bba2ae/EHnn08K4mW.lottie",
        loop: true,
        autoplay: true,
        style: { width: "100%", height: "100%" },
        className: `w-full h-full transition-all duration-500 ${isHovering
            ? "scale-[180%] sm:scale-[160%] md:scale-[150%] lg:scale-[145%] rotate-2"
            : "scale-[175%] sm:scale-[155%] md:scale-[145%] lg:scale-[140%]"
            }`,
    };
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === "dark";

    return (
        <div

            className="min-h-screen overflow-hidden px-[5%] sm:px-[5%] lg:px-[10%]"
            id="Home"
        >
            <div
                className={`relative z-10 transition-all duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"
                    }`}
            >
                <div className="container mx-auto min-h-screen">
                    <div className="flex flex-col lg:flex-row items-center justify-center h-screen md:justify-between gap-0 sm:gap-12 lg:gap-20">
                        {/* Left Column */}
                        <div
                            className="w-full lg:w-1/2 space-y-6 sm:space-y-8 text-left lg:text-left order-1 lg:order-1 lg:mt-0"
                            data-aos="fade-right"
                            data-aos-delay="200"
                        >
                            <div className="space-y-4 sm:space-y-6">
                                <StatusBadge />
                                <MainTitle />

                                {/* Typing Effect */}
                                <div className="h-8 flex items-center" data-aos="fade-up" data-aos-delay="800">
                                    <span className="text-xl md:text-2xl bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent font-light">
                                        <ThemedGradient>
                                            {text}
                                        </ThemedGradient>
                                    </span>
                                    <span className="w-[3px] h-6 bg-gradient-to-t from-[#6366f1] to-[#a855f7] ml-1 animate-blink"></span>
                                </div>

                                {/* Description */}
                                <p
                                    className="text-base md:text-lg text-gray-400 max-w-xl leading-relaxed font-light"
                                    data-aos="fade-up"
                                    data-aos-delay="1000"
                                >
                                    <ThemedGradient>
                                        Building innovative, functional, and user-friendly websites that deliver effective digital solutions.
                                    </ThemedGradient>
                                </p>

                                {/* Tech Stack */}
                                <div className="flex flex-wrap gap-3 justify-start" data-aos="fade-up" data-aos-delay="1200">
                                    {TECH_STACK.map((tech, index) => (
                                        <TechStack key={index} tech={tech} />
                                    ))}
                                </div>

                                {/* CTA Buttons */}
                                <div className="flex flex-row gap-3 w-full justify-start" data-aos="fade-up" data-aos-delay="1400">
                                    <CTAButton href="#Portfolio" text="Projects" icon={ExternalLink} />
                                    <CTAButton href="#Contact" text="Contact" icon={Mail} />
                                </div>

                                {/* Social Links */}
                                <div className="hidden sm:flex gap-4 justify-start" data-aos="fade-up" data-aos-delay="1600">
                                    {SOCIAL_LINKS.map((social, index) => (
                                        <SocialLink key={index} {...social} />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Lottie */}
                        <div
                            className="w-full py-[10%] sm:py-0 lg:w-1/2 h-auto lg:h-[600px] xl:h-[750px] relative flex items-center justify-center order-2 lg:order-2 mt-8 lg:mt-0"
                            onMouseEnter={() => setIsHovering(true)}
                            onMouseLeave={() => setIsHovering(false)}
                            data-aos="fade-left"
                            data-aos-delay="600"
                        >
                            <div className="relative w-full opacity-90">
                                <div
                                    className={`absolute inset-0 rounded-3xl blur-3xl transition-all duration-700 ease-in-out
                                        ${isDark
                                            ? "bg-gradient-to-r from-[#6366f1]/10 to-[#a855f7]/10"
                                            : "bg-gradient-to-r from-indigo-300/20 to-purple-300/20"}
                                            ${isHovering ? "opacity-50 scale-105" : "opacity-20 scale-100"}`}
                                ></div>

                                <div
                                    className={`relative lg:left-12 z-10 w-full opacity-90 transform transition-transform duration-500 ${isHovering ? "scale-105" : "scale-100"
                                        }`}
                                >
                                    <DotLottieReact {...lottieOptions} />
                                </div>

                                <div
                                    className={`absolute inset-0 pointer-events-none transition-all duration-700 ${isHovering ? "opacity-50" : "opacity-20"
                                        }`}
                                >
                                    <div
                                        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                                             w-[400px] h-[400px] blur-3xl animate-[pulse_6s_cubic-bezier(0.4,0,0.6,1)_infinite]
                                              transition-all duration-700
                                               ${isDark
                                                ? "bg-gradient-to-br from-indigo-500/10 to-purple-500/10"
                                                : "bg-gradient-to-br from-indigo-300/20 to-purple-300/20"}
                                                 ${isHovering ? "scale-110 opacity-50" : "scale-100 opacity-20"} `}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(Home);
