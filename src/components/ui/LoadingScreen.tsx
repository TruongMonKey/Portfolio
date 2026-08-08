"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2000; // 2 seconds total loading
    const intervalTime = 20; // 20ms steps
    const step = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step;
        if (next >= 100) {
          clearInterval(timer);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const timeout = setTimeout(() => {
        onComplete();
      }, 600);
      return () => clearTimeout(timeout);
    }
  }, [progress, onComplete]);

  // Round progress to integer
  const displayProgress = Math.min(Math.floor(progress), 100);

  // Derive status message dynamically based on progress
  let status = "Đang kết nối server...";
  if (displayProgress < 20) {
    status = "[SYSTEM] Khởi động JVM & Nạp thư viện Spring Boot...";
  } else if (displayProgress < 40) {
    status = "[DATABASE] Kết nối cơ sở dữ liệu PostgreSQL & Redis...";
  } else if (displayProgress < 65) {
    status = "[COMPILER] Quét gói tin (Package Scanning) & Khởi tạo Beans...";
  } else if (displayProgress < 85) {
    status = "[SECURITY] Cấu hình Spring Security & Cơ chế JWT...";
  } else if (displayProgress < 100) {
    status = "[SERVER] Khởi động Embedded Tomcat Port 8080...";
  } else {
    status = "[SUCCESS] Spring Boot Application started successfully! (0.082s)";
  }

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#09090b] text-[#fafafa] font-mono select-none"
    >
      <div className="w-full max-w-md px-6 flex flex-col gap-6">
        {/* Glowing Java/System Logo Placeholder */}
        <div className="flex justify-center items-center mb-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0.5 }}
            animate={{ scale: [0.8, 1, 0.8], opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/30"
          >
            {/* Java-like steaming cup silhouette or tech symbol */}
            <span className="text-xl font-bold text-blue-500">☕</span>
            <div className="absolute inset-0 rounded-2xl bg-blue-500/20 blur-md -z-10" />
          </motion.div>
        </div>

        {/* Monospace Glowing Number */}
        <div className="text-center">
          <motion.h1 
            className="text-7xl font-extrabold tracking-tighter tabular-nums text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-violet-500 drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]"
          >
            {displayProgress}%
          </motion.h1>
        </div>

        {/* Progress Bar Container */}
        <div className="w-full h-[3px] bg-white/5 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-violet-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
            initial={{ width: "0%" }}
            animate={{ width: `${displayProgress}%` }}
            transition={{ ease: "easeOut" }}
          />
        </div>

        {/* Console Log status message */}
        <div className="h-6 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={status}
              initial={{ y: 5, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -5, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="text-xs text-zinc-400 text-center font-medium max-w-sm overflow-hidden text-ellipsis whitespace-nowrap"
            >
              {status}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
