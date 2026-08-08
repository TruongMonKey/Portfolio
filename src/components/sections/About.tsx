"use client";

import { motion } from "framer-motion";
import { GraduationCap, Target, Compass, BookOpen, Calendar } from "lucide-react";

interface TimelineItem {
  year: string;
  title: string;
  subtitle: string;
  description: string;
}

const TIMELINE_DATA: TimelineItem[] = [
  {
    year: "2022 - 2023",
    title: "Đặt Nền Móng",
    subtitle: "Đại học Công Nghiệp Hà Nội (HaUI)",
    description: "Nhập học chuyên ngành Khoa học Máy tính. Làm quen với tư duy lập trình C/C++, cấu trúc dữ liệu, thuật toán cơ bản.",
  },
  {
    year: "2023 - 2024",
    title: "Tiếp Cận Hướng Đối Tượng & Cơ Sở Dữ Liệu",
    subtitle: "Lập trình OOP nâng cao & SQL",
    description: "Nắm vững nguyên lý Thiết kế Hướng đối tượng (SOLID), làm việc sâu sắc với MySQL và hoàn thành đồ án Java Swing Desktop App đầu tiên.",
  },
  {
    year: "2024 - 2025",
    title: "Bước Vào thế giới Java Web & Spring Boot",
    subtitle: "Xây dựng hệ thống REST API",
    description: "Chuyển hướng làm Spring Boot, Hibernate, JWT Security. Nghiên cứu sâu về thiết kế RESTful API chuẩn hóa, tích hợp dịch vụ Cloud.",
  },
  {
    year: "2025 - Hiện tại",
    title: "Thực Chiến & Nghiên Cứu Chuyên Sâu",
    subtitle: "Backend & Nghiên cứu AI",
    description: "Tham gia các dự án thực tế, triển khai kiến trúc Microservices (Spring Cloud, Kafka), tích hợp mô hình AI vào hệ thống Backend.",
  },
];

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
  };

  return (
    <section id="gioi-thieu" className="py-24 relative overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Section Title */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4"
          >
            Giới thiệu <span className="gradient-text">bản thân</span>
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "60px" }}
            viewport={{ once: true, margin: "-100px" }}
            className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
          />
        </div>

        {/* Grid Layout for About Info and Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Left Column: Personal Info & Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            <motion.div variants={itemVariants} className="glass-card p-8 rounded-3xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-bl-full -z-10" />
              <div className="flex items-center gap-4 mb-4 text-blue-500">
                <GraduationCap className="w-8 h-8" />
                <h3 className="text-xl font-bold">Học Vấn</h3>
              </div>
              <p className="text-sm font-semibold text-foreground mb-1">
                Đại học Công nghiệp Hà Nội (HaUI)
              </p>
              <p className="text-xs text-muted-text mb-4">Chuyên ngành: Khoa học Máy tính</p>
              <p className="text-sm text-muted-text leading-relaxed">
                Kỹ sư Công nghệ Thông tin với 1 năm kinh nghiệm phát triển phần mềm, có kinh nghiệm xây dựng và bảo trì các hệ thống Backend sử dụng Java Spring Boot, cùng nền tảng tốt về kiến trúc phần mềm, bảo mật và tối ưu hóa dữ liệu.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="glass-card p-8 rounded-3xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-bl-full -z-10" />
              <div className="flex items-center gap-4 mb-4 text-purple-500">
                <Compass className="w-8 h-8" />
                <h3 className="text-xl font-bold">Định Hướng Nghề Nghiệp</h3>
              </div>
              <p className="text-sm text-muted-text leading-relaxed">
                Trở thành một Developer Fulll Stack giàu kinh nghiệm, tham gia xây dựng và thiết kế các hệ thống chịu tải lớn (High Concurrent Systems), giao dịch tài chính hoặc thương mại điện tử quy mô lớn.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="glass-card p-8 rounded-3xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-pink-500/5 rounded-bl-full -z-10" />
              <div className="flex items-center gap-4 mb-4 text-pink-500">
                <Target className="w-8 h-8" />
                <h3 className="text-xl font-bold">Mục Tiêu Phát Triển</h3>
              </div>
              <ul className="text-sm text-muted-text flex flex-col gap-2.5">
                <li className="flex items-start gap-2">
                  <span className="text-pink-500 mt-0.5">•</span>
                  Nắm vững các thiết kế Design Patterns nâng cao trong Java và kiến trúc Microservices.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-500 mt-0.5">•</span>
                  Làm chủ công nghệ Cloud Native (Docker, K8s) và các dịch vụ AWS, đồng thời phát triển tốt phía giao diện người dùng.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-500 mt-0.5">•</span>
                  Cải thiện kỹ năng giao tiếp tiếng Anh chuyên ngành và làm việc nhóm hiệu quả.
                </li>
              </ul>
            </motion.div>
          </motion.div>

          {/* Right Column: Academic Timeline */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <div className="flex items-center gap-3 px-2">
              <BookOpen className="w-6 h-6 text-blue-500" />
              <h3 className="text-2xl font-bold">Timeline Học Tập</h3>
            </div>

            <div className="relative border-l-2 border-card-border ml-4 sm:ml-6 flex flex-col gap-10 py-2">
              {TIMELINE_DATA.map((item, index) => (
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  key={index}
                  className="relative pl-8 sm:pl-10 group"
                >
                  {/* Timeline Point Node */}
                  <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-2 border-background bg-zinc-400 group-hover:bg-blue-500 group-hover:scale-125 transition-all duration-300 shadow-[0_0_8px_rgba(0,0,0,0.1)] group-hover:shadow-[0_0_12px_rgba(59,130,246,0.6)]" />

                  {/* Timeline Content */}
                  <div className="glass-card p-6 sm:p-8 rounded-2xl group-hover:border-blue-500/20 transition-all duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2 text-xs font-semibold text-blue-500 bg-blue-500/10 px-3 py-1 rounded-full w-fit">
                        <Calendar className="w-3 h-3" />
                        {item.year}
                      </div>
                    </div>
                    <h4 className="text-lg font-bold group-hover:text-blue-500 transition-colors mb-1">
                      {item.title}
                    </h4>
                    <p className="text-xs font-semibold text-muted-text mb-3">
                      {item.subtitle}
                    </p>
                    <p className="text-sm text-muted-text leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
