"use client";

import { useEffect, useState } from "react";
import { ArrowUp, Github, Linkedin, Facebook } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="w-full bg-background border-t border-card-border/50 py-12 relative">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Copyright */}
        <div className="text-center md:text-left text-sm text-muted-text font-medium">
          <p>© {new Date().getFullYear()} Copy right Truse.work</p>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-5 text-muted-text">
          <a
            href="https://github.com/TruongMonKey"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors duration-200"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/th%C3%A2n-v%C4%83n-tr%C6%B0%E1%BB%9Dng-5a6842304/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors duration-200"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="https://www.facebook.com/than.truong.503092/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors duration-200"
            aria-label="Facebook"
          >
            <Facebook className="w-5 h-5" />
          </a>
        </div>

      </div>

      {/* Floating Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.25 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-30 flex items-center justify-center w-11 h-11 rounded-full text-white bg-blue-600 hover:bg-blue-700 active:scale-95 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/35 transition-all duration-200 cursor-pointer"
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5" style={{ strokeWidth: 2.5 }} />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}
