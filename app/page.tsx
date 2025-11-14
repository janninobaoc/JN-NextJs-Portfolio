'use client';

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import WelcomeScreen from "./components/WelcomeScreen";
import Background from "./components/Background";
import Home from "./components/Home";
import About from "./components/About";
import Portfolio from "./components/Portfolio";
import Contact from "./components/Contact";

export default function LandingPage() {
  const [showWelcome, setShowWelcome] = useState(true);

  return (
    <>
      {/* Welcome Animation */}
      <AnimatePresence mode="wait">
        {showWelcome && (
          <WelcomeScreen onLoadingComplete={() => setShowWelcome(false)} />
        )}
      </AnimatePresence>

      {/* Main Page Sections */}
      {!showWelcome && (
        <>
          <Background />
          <main>
            <Home />
            <About />
            <Portfolio />
            <Contact />
          </main>
        </>
      )}
    </>
  );
}
