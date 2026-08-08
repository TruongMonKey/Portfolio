"use client";

import { useEffect, useState } from "react";

export function useScrollActive(sectionIds: string[], offset = 120) {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset;

      // Find which section is currently in the viewport range
      let currentActive = "";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            currentActive = id;
            break;
          }
        }
      }

      // Fallback: If at the top of the page, active the first section
      if (window.scrollY < 50 && sectionIds.length > 0) {
        currentActive = sectionIds[0];
      }

      // Fallback: If scrolled to the bottom of the page, active the last section (Contact)
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 20
      ) {
        currentActive = sectionIds[sectionIds.length - 1];
      }

      if (currentActive) {
        setActiveSection(currentActive);
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Execute immediately on mount
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionIds, offset]);

  return activeSection;
}
