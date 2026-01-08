"use client";

import { useEffect, useState, useCallback, useRef, useMemo, ReactNode } from "react";
import { supabase } from "@/lib/supabase";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views-react-18-fix";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardProject from "../components/CardProject";
import TechStackIcon from "../components/TechStackIcon";
import Certificate from "../components/Certificate";
import { dummyProjects, dummyCertificates, techStacks } from "@/lib/dummyData";
import AOS from "aos";
import "aos/dist/aos.css";
import { Code, Award, Boxes } from "lucide-react";
import { useSearchParams } from 'next/navigation';
import ThemedGradient from "./ThemedGradient";

type ToggleButtonProps = {
    onClick: () => void;
    isShowingMore: boolean;
};

interface TabPanelProps {
    children?: ReactNode;
    index: number;
    value: number;
    [key: string]: any; // allows passing extra props like {...other}
}


// :white_check_mark: Reusable toggle button
const ToggleButton = ({ onClick, isShowingMore }: ToggleButtonProps) => {
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';
    const textColor = isDark ? 'text-gray-300 hover:text-white' : 'text-gray-800 hover:text-black';
    const bgColor = isDark ? 'bg-white/5 hover:bg-white/10 border-white/10 hover:border-white/20' : 'bg-black/5 hover:bg-black/10 border-black/10 hover:border-black/20';
    const underlineColor = isDark ? 'bg-purple-500/50' : 'bg-purple-400/50';
    const arrowStroke = isDark ? 'stroke-current text-gray-300' : 'stroke-current text-gray-800';

    return (
        <button
            onClick={onClick}
            className={`
        px-3 py-1.5 
        ${textColor} 
        text-sm font-medium 
        transition-all duration-300 ease-in-out
        flex items-center gap-2
        ${bgColor}
        rounded-md
        backdrop-blur-sm
        group
        relative
        overflow-hidden
      `}
        >
            <span className="relative z-10 flex items-center gap-2">
                {isShowingMore ? 'See Less' : 'See More'}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`
            transition-transform duration-300 ${arrowStroke} 
            ${isShowingMore ? 'group-hover:-translate-y-0.5' : 'group-hover:translate-y-0.5'}
          `}
                >
                    <polyline points={isShowingMore ? '18 15 12 9 6 15' : '6 9 12 15 18 9'}></polyline>
                </svg>
            </span>
            <span className={`absolute bottom-0 left-0 w-0 h-0.5 ${underlineColor} transition-all duration-300 group-hover:w-full`}></span>
        </button>
    );
};

function TabPanel({ children, value, index, ...other }: TabPanelProps) {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: { xs: 1, sm: 3 } }}>
                    <Typography component="div">{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index: number) {
    return {
        id: `full-width-tab-${index}`,
        "aria-controls": `full-width-tabpanel-${index}`,
    };
}

export default function FullWidthTabs() {
    const theme = useTheme();
    const [value, setValue] = useState(0);
    const [projects, setProjects] = useState<any[]>([]);
    const [certificates, setCertificates] = useState<any[]>([]);
    // const [stack, setStack] = useState<any[]>([]);
    const [showAllProjects, setShowAllProjects] = useState(false);
    const [showAllCertificates, setShowAllCertificates] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const searchParams = useSearchParams();
    const portfolioRef = useRef<HTMLDivElement>(null);

    // :white_check_mark: Handle window safely in Next.js


    useEffect(() => {
        const scrollToProjectsHandler = () => {
            if (portfolioRef.current) {
                portfolioRef.current.scrollIntoView({ behavior: "smooth" });
                setValue(0); // Activate Projects tab
            }
        };

        window.addEventListener("scrollToProjects", scrollToProjectsHandler);

        return () => {
            window.removeEventListener("scrollToProjects", scrollToProjectsHandler);
        };
    }, []);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setIsMobile(window.innerWidth < 768);
        }
    }, []);

    const initialItems = isMobile ? 4 : 6;

    useEffect(() => {
        AOS.init({ once: false });
    }, []);

    const fetchData = useCallback(async () => {
        try {
            const [projectsResponse, certificatesResponse] = await Promise.all([
                supabase.from("projects").select("*").order("id", { ascending: true }),
                supabase.from("certificates").select("*").order("id", { ascending: true }),
            ]);

            if (projectsResponse.error) throw projectsResponse.error;
            if (certificatesResponse.error) throw certificatesResponse.error;

            const projectData = projectsResponse.data || [];
            const certificateData = certificatesResponse.data || [];

            setProjects(projectData);
            setCertificates(certificateData);

            localStorage.setItem("projects", JSON.stringify(projectData));
            localStorage.setItem("certificates", JSON.stringify(certificateData));
        } catch (error: any) {
            console.error("Error fetching data from Supabase:", error.message);
        }
    }, []);

    useEffect(() => {
        const cachedProjects = localStorage.getItem("projects");
        const cachedCertificates = localStorage.getItem("certificates");

        if (cachedProjects && cachedCertificates) {
            setProjects(JSON.parse(cachedProjects));
            setCertificates(JSON.parse(cachedCertificates));
        }

        fetchData();
    }, [fetchData]);


    const handleChange = (event: React.SyntheticEvent, newValue: number) => setValue(newValue);

    const toggleShowMore = useCallback((type: "projects" | "certificates") => {
        if (type === "projects") {
            setShowAllProjects((prev) => !prev);
        } else {
            setShowAllCertificates((prev) => !prev);
        }
    }, []);

    const displayedProjects = showAllProjects ? projects : projects.slice(0, initialItems);
    const displayedCertificates = showAllCertificates ? certificates : certificates.slice(0, initialItems);
    return (
        <div className="md:px-[10%] px-[5%] w-full sm:mt-0 mt-[3rem] overflow-x-hidden" id="Portfolio">
            {/* Header */}
            <div className="text-center pb-10" data-aos="fade-up" data-aos-duration="1000">
                <h2 className="inline-block text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
                    Portfolio Showcase
                </h2>
                <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2">
                    <ThemedGradient>
                        Explore the projects, certifications, and technologies that define my professional growth.
                    </ThemedGradient>
                </p>
            </div>

            <Box sx={{ width: "100%" }}>
                <AppBar
                    position="static"
                    elevation={0}
                    sx={(theme) => ({
                        bgcolor: "transparent",
                        border:
                            theme.palette.mode === "dark"
                                ? "1px solid rgba(255,255,255,0.1)"
                                : "1px solid rgba(0,0,0,0.08)",
                        borderRadius: "20px",
                        position: "relative",
                        overflow: "hidden",
                        "&::before": {
                            content: '""',
                            position: "absolute",
                            inset: 0,
                            background:
                                theme.palette.mode === "dark"
                                    ? "linear-gradient(180deg, rgba(139,92,246,0.03), rgba(59,130,246,0.03))"
                                    : "linear-gradient(180deg, rgba(99,102,241,0.06), rgba(59,130,246,0.04))",
                            backdropFilter: "blur(10px)",
                            zIndex: 0,
                        },
                    })}
                    className="md:px-4"
                >
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        textColor="secondary"
                        indicatorColor="secondary"
                        variant="fullWidth"
                        sx={{
                            minHeight: "70px",
                            "& .MuiTab-root": {
                                fontSize: { xs: "0.9rem", md: "1rem" },
                                fontWeight: "600",
                                color: "#94a3b8",
                                textTransform: "none",
                                padding: "20px 0",
                                margin: "8px",
                                borderRadius: "12px",
                                transition: "all 0.4s",
                                "&:hover": {
                                    color: "#fff",
                                    backgroundColor: "rgba(139,92,246,0.1)",
                                    transform: "translateY(-2px)",
                                },
                                "&.Mui-selected": {
                                    color: "#fff",
                                    background: "linear-gradient(135deg, rgba(139,92,246,0.2), rgba(59,130,246,0.2))",
                                },
                            },
                            "& .MuiTabs-indicator": { height: 0 },
                            "& .MuiTabs-flexContainer": { gap: "8px" },
                        }}
                    >
                        <Tab icon={<Code className="mb-2 w-5 h-5" />} label="Projects" {...a11yProps(0)} />
                        <Tab icon={<Award className="mb-2 w-5 h-5" />} label="Certificates" {...a11yProps(1)} />
                        <Tab icon={<Boxes className="mb-2 w-5 h-5" />} label="Tech Stack" {...a11yProps(2)} />
                    </Tabs>
                </AppBar>

                <SwipeableViews
                    axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                    index={value}
                    onChangeIndex={setValue}
                    style={{ height: "fit-content", overflow: "hidden" }}
                >
                    {/* Projects */}
                    <TabPanel value={value} index={0} dir={theme.direction}>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {displayedProjects.map((project, index) => (
                                <div key={project.id || index} data-aos="fade-up" data-aos-duration="1000">
                                    <CardProject {...project} />
                                </div>
                            ))}
                        </div>
                        {projects.length > initialItems && (
                            <div className="mt-6 flex justify-start">
                                <ToggleButton onClick={() => toggleShowMore("projects")} isShowingMore={showAllProjects} />
                            </div>
                        )}
                    </TabPanel>

                    {/* Certificates */}
                    <TabPanel value={value} index={1} dir={theme.direction}>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            {displayedCertificates.map((cert, index) => (
                                <div key={cert.id || index} data-aos="fade-up" data-aos-duration="1000">
                                    <Certificate img={cert.img} />
                                </div>
                            ))}
                        </div>
                        {certificates.length > initialItems && (
                            <div className="mt-6 flex justify-start">
                                <ToggleButton onClick={() => toggleShowMore("certificates")} isShowingMore={showAllCertificates} />
                            </div>
                        )}
                    </TabPanel>

                    {/* Tech Stack */}
                    <TabPanel value={value} index={2} dir={theme.direction}>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 pb-[5%]">
                            {techStacks.map((stack, index) => (
                                <div key={index} data-aos="fade-up" data-aos-duration="1000">
                                    <TechStackIcon TechStackIcon={stack.icon} Language={stack.language} />
                                </div>
                            ))}
                        </div>
                    </TabPanel>
                </SwipeableViews>
            </Box>
        </div>
    );
}