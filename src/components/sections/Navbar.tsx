"use client";

import { useState, useEffect } from "react";
import { Menu, X, Terminal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollActive } from "@/hooks/useScrollActive";
import ThemeToggle from "../ui/ThemeToggle";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { id: "trang-chu", label: "Trang chủ" },
  { id: "gioi-thieu", label: "Giới thiệu" },
  { id: "ky-nang", label: "Kỹ năng" },
  { id: "kinh-nghiem", label: "Kinh nghiệm" },
  { id: "du-an", label: "Dự án" },
  { id: "lien-he", label: "Liên hệ" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  const sectionIds = NAV_ITEMS.map((item) => item.id);
  const activeSection = useScrollActive(sectionIds);

  // Monitor scroll for header background opacity and scroll progress
  useEffect(() => {
    const handleScroll = () => {
      // Background styling
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Scroll progress
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const offset = 80; // height of navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setIsOpen(false);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-40 transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-card-border shadow-sm"
          : "bg-transparent border-b border-transparent"
      )}
    >
      {/* Scroll Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-card-border/10">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-violet-500 transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#trang-chu"
          onClick={(e) => handleNavClick(e, "trang-chu")}
          className="flex items-center gap-2 group text-foreground font-mono font-bold text-lg tracking-tight"
        >
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/30 group-hover:bg-blue-500/20 transition-colors">
            <Terminal className="w-5 h-5 text-blue-500" />
          </div>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground to-muted-text group-hover:text-blue-500 transition-colors duration-300">
            DevJava<span className="text-blue-500">.</span>
          </span>
        </a>

        {/* Desktop Navigation Menu */}
        <nav className="hidden md:flex items-center gap-1 bg-card-bg/20 border border-card-border/40 p-1.5 rounded-full">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 hover:text-foreground/90",
                  isActive ? "text-foreground" : "text-muted-text"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabPill"
                    className="absolute inset-0 bg-card-bg border border-card-border shadow-[0_1px_3px_rgba(0,0,0,0.05)] rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          <a
            href="#lien-he"
            onClick={(e) => handleNavClick(e, "lien-he")}
            className="px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-foreground hover:bg-foreground/90 dark:bg-foreground dark:text-background dark:hover:bg-foreground/90 border border-transparent transition-all duration-300"
          >
            Liên Hệ
          </a>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-center w-10 h-10 rounded-full border border-card-border bg-card-bg/20 text-foreground transition-all duration-300 hover:bg-card-bg"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden border-b border-card-border bg-background/95 backdrop-blur-lg overflow-hidden"
          >
            <nav className="flex flex-col px-6 py-8 gap-4">
              {NAV_ITEMS.map((item, index) => {
                const isActive = activeSection === item.id;
                return (
                  <motion.a
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => handleNavClick(e, item.id)}
                    className={cn(
                      "flex items-center py-2.5 px-4 text-base font-semibold rounded-xl border border-transparent transition-all duration-300",
                      isActive
                        ? "bg-primary/10 text-primary border-primary/20"
                        : "text-muted-text hover:text-foreground hover:bg-card-bg"
                    )}
                  >
                    {item.label}
                  </motion.a>
                );
              })}
              <div className="h-[1px] bg-card-border my-2" />
              <a
                href="#lien-he"
                onClick={(e) => handleNavClick(e, "lien-he")}
                className="w-full text-center py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-blue-500 to-violet-500 text-white shadow-lg shadow-blue-500/20"
              >
                Liên hệ ngay
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
