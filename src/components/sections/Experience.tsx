"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Award } from "lucide-react";

interface ExperienceItem {
  company: string;
  role: string;
  duration: string;
  location: string;
  responsibilities: string[];
  skillsLearned: string[];
}

const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    company: "Vietsoftware International (VSII)",
    role: "Thực Tập Sinh Backend Java",
    duration: "Tháng 11/2025 - Tháng 06/2026",
    location: "TP. Hà Nội",
    responsibilities: [
      "Tham gia phát triển mô-đun quản lý nhân viên cho hệ thống HRM bằng Spring Boot & PostgreSQL.",
      "Cấu hình phân quyền người dùng bảo mật cao dựa trên Spring Security, OAuth2 và JWT Token.",
      "Tối ưu hóa các câu lệnh SQL phức tạp",
      "Áp dụng Redis Cache để lưu trữ cấu hình hệ thống, giảm tải hơn 40% số lượng truy vấn trực tiếp vào PostgreSQL database."
    ],
    skillsLearned: ["Spring Boot", "PostgreSQL", "Redis", "Spring Security"]
  },
  {
    company: "Digital Innovation",
    role: "Lập Trình Java Web",
    duration: "Tháng 07/2026 - Hiện tại",
    location: "TP. Hà Nội",
    responsibilities: [
      "Tham gia thiết kế kiến trúc RESTful API phục vụ ứng dụng quản lý tủ nguồn",
      "Thiết kế tài liệu API tự động sử dụng Swagger / Springdoc-openapi giúp đội ngũ Frontend tích hợp nhanh chóng.",
      "Tham gia thiết kế API cho hệ thống Phòng chống lũ bão, dự án thuộc Trung tâm Dự báo Khí tượng của tập đoàn Mobifone.",
    ],
    skillsLearned: ["Spring Boot", "Swagger", "GitHub Actions", "RESTful API", "Spring Security", "OAuth2", "JWT", "Docker", "PostgreSQL"]
  }
];

export default function Experience() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
    }
  };

  return (
    <section id="kinh-nghiem" className="py-24 relative overflow-hidden bg-background">
      {/* Background spotlights */}
      <div className="glow-effect bottom-1/4 left-10" style={{ "--glow-color": "rgba(59,130,246,0.05)" } as React.CSSProperties} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Section Title */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4"
          >
            Kinh nghiệm <span className="gradient-text">thực chiến</span>
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "60px" }}
            viewport={{ once: true, margin: "-100px" }}
            className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
          />
        </div>

        {/* Timeline Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative max-w-4xl mx-auto border-l-2 border-card-border ml-4 sm:ml-6 md:mx-auto md:pl-0 md:border-l-0"
        >
          {/* Vertical central line for desktop */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-card-border hidden md:block -translate-x-1/2" />

          {EXPERIENCE_DATA.map((exp, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <motion.div
                variants={itemVariants}
                key={idx}
                className="relative mb-12 last:mb-0 pl-8 sm:pl-10 md:pl-0 md:grid md:grid-cols-2 md:gap-12 group"
              >
                {/* Timeline Center Point Indicator */}
                <div className="absolute -left-[9px] top-6 w-4 h-4 rounded-full border-2 border-background bg-zinc-400 group-hover:bg-blue-500 group-hover:scale-125 transition-all duration-300 shadow-[0_0_8px_rgba(0,0,0,0.1)] group-hover:shadow-[0_0_12px_rgba(59,130,246,0.6)] md:left-1/2 md:-translate-x-1/2 md:top-6" />

                {/* Content block: Left side or Right side on desktop */}
                <div
                  className={`md:contents ${isEven ? "md:text-right" : ""
                    }`}
                >
                  {/* Card Container */}
                  <div
                    className={`glass-card p-8 rounded-3xl group-hover:border-blue-500/20 transition-all duration-300 ${isEven ? "md:col-start-1" : "md:col-start-2"
                      }`}
                  >
                    {/* Header info */}
                    <div className="flex flex-wrap items-center gap-2 mb-3 text-xs font-semibold text-blue-500">
                      <span className="flex items-center gap-1 bg-blue-500/10 px-3 py-1 rounded-full">
                        <Calendar className="w-3.5 h-3.5" />
                        {exp.duration}
                      </span>
                      <span className="flex items-center gap-1 bg-card-border px-3 py-1 rounded-full text-foreground/75">
                        <MapPin className="w-3.5 h-3.5" />
                        {exp.location}
                      </span>
                    </div>

                    <h3 className="text-xl font-extrabold text-foreground group-hover:text-blue-500 transition-colors mb-1">
                      {exp.company}
                    </h3>
                    <p className="text-sm font-semibold text-muted-text mb-4">
                      {exp.role}
                    </p>

                    {/* Responsibilities list */}
                    <ul className="flex flex-col gap-2.5 text-sm text-muted-text text-left mb-6">
                      {exp.responsibilities.map((resp, respIdx) => (
                        <li key={respIdx} className="flex items-start gap-2.5">
                          <span className="text-blue-500 mt-1">•</span>
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Skill Tags */}
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-card-border/40">
                      {exp.skillsLearned.map((skill, skillIdx) => (
                        <span
                          key={skillIdx}
                          className="flex items-center gap-1.5 px-3 py-1 rounded-lg border border-card-border bg-card-bg/40 text-xs font-semibold text-foreground/80 hover:border-blue-500/30 hover:bg-blue-500/5 hover:text-blue-500 transition-colors duration-300"
                        >
                          <Award className="w-3 h-3 text-blue-500" />
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
