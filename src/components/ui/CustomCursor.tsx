"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [hidden, setHidden] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  // Mouse coordinates using motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring animations for a smooth trailing effect
  const springConfig = { damping: 30, stiffness: 250, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check if the device is a desktop/laptop (has hover capability)
    const checkDevice = () => {
      const hasHover = window.matchMedia("(hover: hover)").matches;
      setIsMobile(!hasHover);
      if (hasHover) {
        document.body.classList.add("custom-cursor-active");
      } else {
        document.body.classList.remove("custom-cursor-active");
      }
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (hidden) setHidden(false);
    };

    const handleMouseLeave = () => {
      setHidden(true);
    };

    const handleMouseEnter = () => {
      setHidden(false);
    };

    // Monitor hover elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const isInteractive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") !== null ||
        target.closest("button") !== null ||
        target.getAttribute("role") === "button" ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.classList.contains("interactive");

      setHovered(!!isInteractive);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("resize", checkDevice);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseover", handleMouseOver);
      document.body.classList.remove("custom-cursor-active");
    };
  }, [mouseX, mouseY, hidden]);

  if (isMobile || hidden) return null;

  return (
    <>
      {/* Outer Spring Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: hovered ? 1.5 : 1,
          borderColor: hovered ? "var(--primary)" : "rgba(150, 150, 150, 0.5)",
          backgroundColor: hovered ? "rgba(59, 130, 246, 0.1)" : "rgba(0, 0, 0, 0)",
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.2 }}
      />
      {/* Inner Dot (instant response) */}
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"
        style={{
          x: mouseX,
          y: mouseY,
        }}
        animate={{
          scale: hovered ? 0.6 : 1,
        }}
        transition={{ type: "tween", duration: 0.1 }}
      />
    </>
  );
}
