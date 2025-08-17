import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "flowbite-react";
import { motion } from "framer-motion";

const ErrorPage = () => {
  const navigate = useNavigate();
  const [pulsateGroup, setPulsateGroup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setPulsateGroup(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const left4Variant = {
    hidden: { x: -200, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 100, delay: 0.2 } },
  };
  const zeroVariant = {
    hidden: { y: -300, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 120, delay: 0.4 } },
  };
  const right4Variant = {
    hidden: { x: 200, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 100, delay: 0.6 } },
  };
  const pulsateVariants = {
    initial: { scale: 1, boxShadow: "none" },
    animate: {
      scale: [1, 1.05, 1],
      boxShadow: ["0 0 8px #7f5af0","0 0 20px #7f5af0","0 0 8px #7f5af0"],
      transition: { duration: 2, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" },
    },
  };
  const flickerVariants = {
    flicker: {
      opacity: [1, 0.85, 1, 0.9, 1],
      transition: { duration: 2, repeat: Infinity, repeatType: "mirror" },
    },
  };

  // Common glitch text style (only stroke & user-select inline)
  const glitchTextBase = {
    WebkitTextStroke: "2px #7f5af0",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    userSelect: "none",
    color: "transparent",
    position: "relative",
    fontWeight: 900,
  };
  const glitchLayerTop = {
    position: "absolute",
    top: 0,
    left: 1,
    color: "#0ff",
    opacity: 0.7,
    clipPath: "polygon(0 0, 100% 0, 100% 45%, 0 45%)",
  };
  const glitchLayerBottom = {
    position: "absolute",
    top: 0,
    left: -1,
    color: "#f0f",
    opacity: 0.7,
    clipPath: "polygon(0 55%, 100% 55%, 100% 100%, 0 100%)",
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#0e0e1a] via-[#1a1a2e] to-[#16213e] flex flex-col justify-center items-center px-4 sm:px-6 md:px-8 text-center">
      {/* 404 group */}
      <motion.div
        variants={pulsateVariants}
        initial="initial"
        animate={pulsateGroup ? "animate" : ""}
        className="flex select-none flex-wrap justify-center"
      >
        {/* Left 4 */}
        <motion.div
          variants={left4Variant}
          initial="hidden"
          animate="visible"
          style={glitchTextBase}
          className="text-8xl sm:text-9xl md:text-[10rem] lg:text-[12rem]"
        >
          4
          <span aria-hidden="true" style={glitchLayerTop}>4</span>
          <span aria-hidden="true" style={glitchLayerBottom}>4</span>
        </motion.div>

        {/* Zero */}
        <motion.div
          variants={zeroVariant}
          initial="hidden"
          animate="visible"
          style={glitchTextBase}
          className="mx-4 sm:mx-6 md:mx-8 text-8xl sm:text-9xl md:text-[10rem] lg:text-[12rem]"
        >
          0
          <span aria-hidden="true" style={glitchLayerTop}>0</span>
          <span aria-hidden="true" style={glitchLayerBottom}>0</span>
        </motion.div>

        {/* Right 4 */}
        <motion.div
          variants={right4Variant}
          initial="hidden"
          animate="visible"
          style={glitchTextBase}
          className="text-8xl sm:text-9xl md:text-[10rem] lg:text-[12rem]"
        >
          4
          <span aria-hidden="true" style={glitchLayerTop}>4</span>
          <span aria-hidden="true" style={glitchLayerBottom}>4</span>
        </motion.div>
      </motion.div>

      {/* Message */}
      <motion.p
        variants={flickerVariants}
        animate="flicker"
        className="text-base sm:text-lg md:text-2xl text-white max-w-md sm:max-w-lg md:max-w-xl mb-6 sm:mb-8 font-semibold mt-6 sm:mt-8"
      >
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </motion.p>

      {/* Button */}
      <motion.div variants={pulsateVariants} animate="animate" whileHover={{ scale: 1.1 }}>
        <Button
          pill
          color="purple"
          size="lg"
          onClick={() => navigate("/")}
          className="shadow-lg text-sm sm:text-base md:text-lg"
        >
          Take Me Home
        </Button>
      </motion.div>

      <p className="mt-12 sm:mt-16 text-gray-400 text-xs sm:text-sm select-none">
        &copy; {new Date().getFullYear()} FitNexis. All rights reserved.
      </p>
    </div>
  );
};

export default ErrorPage;
