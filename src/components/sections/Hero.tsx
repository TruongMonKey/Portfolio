"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight, Download, Github, Linkedin, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import { getAssetPath } from "@/lib/utils";

const TYPING_TITLES = [
  "Backend Developer",
  "Java & Spring Boot Enthusiast",
  "Microservices Architect",
];

export default function Hero() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentFullText = TYPING_TITLES[titleIndex];
    const typingSpeed = isDeleting ? 30 : 80;

    const handleType = () => {
      if (!isDeleting) {
        // Typing
        setCurrentText(currentFullText.substring(0, currentText.length + 1));
        if (currentText === currentFullText) {
          // Wait before starting to delete
          timer = setTimeout(() => setIsDeleting(true), 2000);
          return;
        }
      } else {
        // Deleting
        setCurrentText(currentFullText.substring(0, currentText.length - 1));
        if (currentText === "") {
          setIsDeleting(false);
          setTitleIndex((prev) => (prev + 1) % TYPING_TITLES.length);
          return;
        }
      }

      timer = setTimeout(handleType, typingSpeed);
    };

    timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, titleIndex]);

  const handleScrollToContact = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const contactSection = document.getElementById("lien-he");
    if (contactSection) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = contactSection.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="trang-chu"
      className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden"
    >
      {/* Animated Glowing Ambient Light */}
      <div className="glow-effect -top-20 -left-20" style={{ "--glow-color": "rgba(59,130,246,0.12)" } as React.CSSProperties} />
      <div className="glow-effect bottom-10 right-10" style={{ "--glow-color": "rgba(139,92,246,0.12)" } as React.CSSProperties} />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 grid-background opacity-[0.4] pointer-events-none" />

      {/* Subtle bottom fade to seamlessly blend with the next section */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">

        {/* Profile Image Column (Left on Mobile, Right on Desktop) */}
        <div className="lg:col-span-5 flex justify-center order-1 lg:order-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-[350px] md:h-[350px] rounded-3xl overflow-hidden p-[2px] bg-gradient-to-tr from-blue-500 via-purple-500 to-transparent shadow-2xl"
          >
            {/* Outer blur glowing effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 blur-xl opacity-30 -z-10" />

            <div className="w-full h-full rounded-[22px] overflow-hidden bg-background relative">
              <Image
                src={getAssetPath("/truse.jpg")}
                alt="Thân Văn Trường - Developer Avatar"
                fill
                priority
                className="object-cover transform hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 640px) 256px, (max-width: 768px) 320px, 350px"
              />
            </div>
          </motion.div>
        </div>

        {/* Text Info Column */}
        <div className="lg:col-span-7 flex flex-col gap-6 order-2 lg:order-1 text-center lg:text-left">
          {/* Greeting pill */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="self-center lg:self-start flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-500 text-xs font-semibold uppercase tracking-wider"
          >
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            Xin chào, Tôi là
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight"
          >
            Thân Văn Trường
          </motion.h1>

          {/* Typing Effect Container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-10 sm:h-12 flex items-center justify-center lg:justify-start"
          >
            <span className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 font-mono typing-cursor">
              {currentText}
            </span>
          </motion.div>

          {/* Biography summary */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base sm:text-lg text-muted-text max-w-2xl leading-relaxed mx-auto lg:mx-0 font-medium"
          >
            Cử nhân Khoa Học Máy Tính định hướng Backend Developer, có kinh nghiệm xây dựng ứng dụng web bằng Spring Boot, thiết kế và tối ưu cơ sở dữ liệu, phát triển RESTful API và triển khai xác thực bằng JWT. Có kinh nghiệm tham gia phát triển các dự án thực tế theo kiến trúc nhiều tầng và Microservices, đồng thời chủ động học hỏi và tiếp cận công nghệ mới để xây dựng các hệ thống ổn định, dễ mở rộng và đáp ứng nhu cầu thực tế.
          </motion.p>

          {/* Actions CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mt-4"
          >
            {/* Contact Button */}
            <button
              onClick={handleScrollToContact}
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
            >
              Liên hệ ngay
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* CV Download Button */}
            <a
              href={getAssetPath("/documents/NguyenVanNam_CV.pdf")}
              download="NguyenVanNam_CV.pdf"
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-foreground bg-card-bg border border-card-border hover:bg-card-border/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              Tải CV bản cứng
              <Download className="w-4 h-4 text-muted-text" />
            </a>
          </motion.div>

          {/* Social Links under action */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex gap-4 items-center justify-center lg:justify-start mt-4 text-muted-text"
          >
            <a
              href="https://github.com/TruongMonKey"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full border border-card-border/60 hover:bg-card-bg hover:text-foreground transition-all duration-300"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/th%C3%A2n-v%C4%83n-tr%C6%B0%E1%BB%9Dng-5a6842304/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full border border-card-border/60 hover:bg-card-bg hover:text-foreground transition-all duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="truongcot1907@gmail.com"
              className="p-2.5 rounded-full border border-card-border/60 hover:bg-card-bg hover:text-foreground transition-all duration-300"
              aria-label="Email"
            >
              <MessageSquare className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
