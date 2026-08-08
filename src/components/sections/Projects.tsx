"use client";

import Image from "next/image";
import { Github, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { getAssetPath } from "@/lib/utils";

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  github: string;
  demo: string;
}

const PROJECTS_DATA: Project[] = [
  {
    title: "Hotel Booking System (HotelBK)",
    description: "Hệ thống đặt phòng khách sạn trực tuyến. Xây dựng Rest API hiệu năng cao với cơ chế xác thực JWT, quản lý phân quyền và thanh toán tích hợp VNPay. Hỗ trợ caching truy vấn phòng trống để giảm tải cơ sở dữ liệu.",
    image: getAssetPath("/project_hotel.png"),
    tags: ["Java", "Spring Boot", "Spring Security", "PostgreSQL", "Redis", "JWT"],
    github: "https://github.com",
    demo: "https://demo.com",
  },
  {
    title: "HRM Microservices (Enterprise HR)",
    description: "Hệ thống quản trị nhân sự quy mô doanh nghiệp thiết kế theo kiến trúc Microservices. Sử dụng Spring Cloud Config, Eureka Discovery, API Gateway và phân quyền tập trung bằng Keycloak. Giao tiếp bất đồng bộ qua Apache Kafka.",
    image: getAssetPath("/project_hrm.png"),
    tags: ["Spring Cloud", "Keycloak", "PostgreSQL", "Kafka", "Docker", "Eureka"],
    github: "https://github.com",
    demo: "https://demo.com",
  },
  {
    title: "Job Finder Platform (JobSphere)",
    description: "Nền tảng tìm kiếm việc làm tối ưu cho nhà tuyển dụng và ứng viên. Tích hợp công cụ Elasticsearch cho phép tìm kiếm từ khóa cực nhanh và chính xác. Frontend xây dựng bằng Next.js 15 kết hợp Tailwind CSS.",
    image: getAssetPath("/project_job.png"),
    tags: ["Spring Boot", "Elasticsearch", "ReactJS", "Next.js", "TailwindCSS"],
    github: "https://github.com",
    demo: "https://demo.com",
  },
  {
    title: "YOLOv8 Object Detection System",
    description: "Hệ thống camera giám sát thông minh nhận diện vật thể thời gian thực. Tích hợp luồng xử lý ảnh từ YOLOv8 & OpenCV (Python) với hệ thống quản trị backend Java Spring Boot qua REST API và WebSocket để hiển thị thông báo tức thời.",
    image: getAssetPath("/project_yolo.png"),
    tags: ["Spring Boot", "Python", "YOLOv8", "OpenCV", "WebSocket", "Docker"],
    github: "https://github.com",
    demo: "https://demo.com",
  },
];

export default function Projects() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
  };

  return (
    <section id="du-an" className="py-24 relative overflow-hidden bg-background">
      {/* Ambient backgrounds */}
      <div className="glow-effect top-1/4 right-10" style={{ "--glow-color": "rgba(139,92,246,0.06)" } as React.CSSProperties} />
      <div className="glow-effect bottom-1/4 left-10" style={{ "--glow-color": "rgba(59,130,246,0.06)" } as React.CSSProperties} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4"
          >
            Dự án <span className="gradient-text">nổi bật</span>
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "60px" }}
            viewport={{ once: true, margin: "-100px" }}
            className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
          />
        </div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {PROJECTS_DATA.map((project, idx) => (
            <motion.div
              variants={cardVariants}
              key={idx}
              className="glass-card rounded-3xl overflow-hidden group hover:shadow-2xl hover:border-foreground/15 transition-all duration-500 flex flex-col justify-between"
            >
              {/* Project Image Container */}
              <div className="relative aspect-video w-full overflow-hidden border-b border-card-border/40">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-[1.03] transition-all duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />

                {/* Hover overlay with action links */}
                <div className="absolute inset-0 bg-[#09090b]/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-white text-black hover:scale-110 active:scale-95 transition-all duration-200"
                    title="Source Code (GitHub)"
                  >
                    <Github className="w-6 h-6" />
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-blue-600 text-white hover:scale-110 active:scale-95 transition-all duration-200"
                    title="Live Demo"
                  >
                    <ExternalLink className="w-6 h-6" />
                  </a>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-8 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-xl font-extrabold text-foreground group-hover:text-blue-500 transition-colors mb-3">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-text leading-relaxed font-medium mb-6 line-clamp-4">
                    {project.description}
                  </p>
                </div>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-card-border/30">
                  {project.tags.map((tag, tagIdx) => (
                    <span
                      key={tagIdx}
                      className="text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-md border border-card-border bg-card-bg text-foreground/80 hover:border-blue-500/20 hover:bg-blue-500/5 hover:text-blue-500 transition-colors duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
