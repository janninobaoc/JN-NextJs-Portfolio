'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Code2, Github, Globe, User } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

interface WelcomeScreenProps {
  onLoadingComplete?: () => void;
}

const TypewriterEffect = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= text.length) {
        setDisplayText(text.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 260);

    return () => clearInterval(timer);
  }, [text]);

  return (
    <span className="inline-block">
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

const BackgroundEffect = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute -top-40 right-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
      <svg
        className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
        viewBox="0 0 1155 678"
      >
        <path
          fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
          fillOpacity=".1"
          d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
        />
        <defs>
          <linearGradient
            id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
            x1="1155.49"
            x2="-78.208"
            y1=".177"
            y2="474.645"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#7980fe" />
            <stop offset={1} stopColor="#f0fff7" />
          </linearGradient>
        </defs>
      </svg>
    </div>
    <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.19_0.03_264.18_/0.2)] to-[hsl(260,50%,40%)/0.2] blur-3xl animate-pulse" />
    <div className="absolute inset-0 bg-gradient-to-tr from-[oklch(0.19_0.03_264.18_/0.2)] via-transparent to-[hsl(260,50%,40%)/0.2] blur-2xl animate-float" />
        <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
        <svg
          className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
        >
          <path
            fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
            fillOpacity=".1"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#9A70FF" />
              <stop offset={1} stopColor="#838aff" />
            </linearGradient>
          </defs>
        </svg>
      </div>
  </div>
);

const IconButton = ({ Icon }: { Icon: React.ElementType }) => (
  <div className="relative group hover:scale-110 transition-transform duration-300">
    <div className="absolute -inset-2 bg-gradient-to-r from-[oklch(0.19_0.03_264.18_/0.2)] to-[hsl(260,50%,40%)/0.2] rounded-full blur opacity-30 group-hover:opacity-75 transition duration-300" />
    <div className="relative p-2 sm:p-3 bg-black/50 backdrop-blur-sm rounded-full border border-white/10">
      <Icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" />
    </div>
  </div>
);


const containerVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: {
    opacity: 0,
    scale: 1.1,
    filter: 'blur(10px)',
    transition: { duration: 0.8, ease: 'easeInOut', when: 'beforeChildren', staggerChildren: 0.1 }
  }
};

const childVariants: Variants = {
  initial: { y: -20, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { duration: 0.4, ease: 'easeInOut' } },
  exit: { y: -20, opacity: 0, transition: { duration: 0.4, ease: 'easeInOut' } }
};

const WelcomeScreen = ({ onLoadingComplete }: WelcomeScreenProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 1000, once: false, mirror: false });

    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => {
        onLoadingComplete?.();
      }, 1000);
    }, 6000);

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 bg-[#030014]"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={containerVariants}
        >
          <BackgroundEffect />

          <div className="relative min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-4xl mx-auto">
              {/* Icons */}
              <motion.div className="flex justify-center gap-3 sm:gap-4 md:gap-8 mb-6 sm:mb-8 md:mb-12">
                {[Code2, User, Github].map((Icon, index) => (
                  <motion.div
                    key={index}
                    variants={childVariants}
                    data-aos="fade-down"
                    data-aos-delay={index * 200}
                  >
                    <IconButton Icon={Icon} />
                  </motion.div>
                ))}
              </motion.div>

              {/* Welcome Text */}
              <motion.div className="text-center mb-6 sm:mb-8 md:mb-12" variants={childVariants}>
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold space-y-2 sm:space-y-4">
                  <div className="mb-2 sm:mb-4">
                    <span data-aos="fade-right" data-aos-delay="200" className="inline-block px-2 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                      Welcome
                    </span>{' '}
                    <span data-aos="fade-right" data-aos-delay="400" className="inline-block px-2 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                      To
                    </span>{' '}
                    <span data-aos="fade-right" data-aos-delay="600" className="inline-block px-2 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                      My
                    </span>
                  </div>
                  <div>
                    <span data-aos="fade-up" data-aos-delay="800" className="inline-block px-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      Portfolio
                    </span>{' '}
                    <span data-aos="fade-up" data-aos-delay="1000" className="inline-block px-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      Website
                    </span>
                  </div>
                </h1>
              </motion.div>

              {/* Website Link */}
              <motion.div className="text-center" variants={childVariants} data-aos="fade-up" data-aos-delay={1200}>
                <a
                  href="https://jn-next-js-portfolio-a94s.vercel.app/"
                  className="inline-flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 rounded-full relative group hover:scale-105 transition-transform duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/20 rounded-full blur-md group-hover:blur-lg transition-all duration-300" />
                  <div className="relative flex items-center gap-2 text-lg sm:text-xl md:text-2xl">
                    <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    <span className="bg-gradient-to-r from-white/80 via-white/60 to-white/40 bg-clip-text text-transparent">
                      <TypewriterEffect text="www.jn.portfolio" />
                    </span>
                  </div>
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

};

export default WelcomeScreen;
