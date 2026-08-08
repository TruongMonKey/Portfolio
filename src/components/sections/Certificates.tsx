"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Award, Calendar, ExternalLink, X, Eye } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Certificate {
  title: string;
  issuer: string;
  date: string;
  image: string;
  id: string;
}

const CERTIFICATES_DATA: Certificate[] = [
  {
    id: "oracle",
    title: "Oracle Certified Associate, Java SE 8 Programmer",
    issuer: "Oracle Corporation",
    date: "Tháng 12/2025",
    image: "/cert_oracle.png",
  },
  {
    id: "aws",
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services (AWS)",
    date: "Tháng 05/2026",
    image: "/cert_aws.png",
  },
  {
    id: "spring",
    title: "Spring Framework Developer Certification",
    issuer: "Tech Academy Pro",
    date: "Tháng 08/2026",
    image: "/cert_spring.png",
  },
  {
    id: "ielts",
    title: "IELTS Academic - Band Score 7.5",
    issuer: "IDP Education / British Council",
    date: "Tháng 03/2025",
    image: "/cert_ielts.png",
  },
];

export default function Certificates() {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  // Close lightbox on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedCert(null);
      }
    };
    if (selectedCert) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedCert]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
  };

  return (
    <section id="chung-chi" className="py-24 relative overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4"
          >
            Chứng chỉ <span className="gradient-text">chuyên môn</span>
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "60px" }}
            viewport={{ once: true, margin: "-100px" }}
            className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
          />
        </div>

        {/* Certificates Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {CERTIFICATES_DATA.map((cert) => (
            <motion.div
              variants={itemVariants}
              key={cert.id}
              onClick={() => setSelectedCert(cert)}
              className="glass-card rounded-2xl overflow-hidden group cursor-pointer hover:border-blue-500/20 hover:shadow-lg transition-all duration-300 flex flex-col h-full justify-between"
            >
              {/* Image Container with Zoom effect */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-card-bg border-b border-card-border/40">
                <Image
                  src={cert.image}
                  alt={cert.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/95 backdrop-blur-md text-black text-xs font-bold shadow-md transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <Eye className="w-3.5 h-3.5" />
                    Xem chi tiết
                  </div>
                </div>
              </div>

              {/* Certificate Metadata */}
              <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-blue-500 mb-2">
                    <Award className="w-3.5 h-3.5" />
                    {cert.issuer}
                  </span>
                  <h3 className="text-sm font-extrabold text-foreground group-hover:text-blue-500 transition-colors line-clamp-2 mb-4 leading-snug">
                    {cert.title}
                  </h3>
                </div>
                
                <div className="flex items-center justify-between text-xs text-muted-text pt-3 border-t border-card-border/30">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {cert.date}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedCert && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 sm:p-6"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-6 right-6 p-3 rounded-full bg-zinc-900/50 hover:bg-zinc-800 text-white transition-colors duration-200 z-10"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Certificate Viewer Card */}
              <motion.div
                initial={{ scale: 0.9, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 15 }}
                transition={{ type: "spring", damping: 25, stiffness: 220 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-4xl w-full bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
              >
                {/* Left: Certificate image */}
                <div className="relative aspect-auto md:w-3/5 w-full bg-black flex items-center justify-center">
                  <div className="relative w-full aspect-[4/3]">
                    <Image
                      src={selectedCert.image}
                      alt={selectedCert.title}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 60vw"
                    />
                  </div>
                </div>

                {/* Right: Description & Details */}
                <div className="p-8 md:w-2/5 flex flex-col justify-between bg-zinc-900/40 backdrop-blur-md">
                  <div>
                    <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-500 mb-3">
                      <Award className="w-4 h-4" />
                      {selectedCert.issuer}
                    </span>
                    <h3 className="text-xl font-extrabold text-white mb-4 leading-snug">
                      {selectedCert.title}
                    </h3>
                    <div className="flex flex-col gap-2.5 text-sm text-zinc-400">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4.5 h-4.5 text-zinc-500" />
                        <span>Ngày cấp: <strong>{selectedCert.date}</strong></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="w-4.5 h-4.5 text-zinc-500" />
                        <span>Mã chứng chỉ: <strong>MOCK-{selectedCert.id.toUpperCase()}-2026</strong></span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-col gap-3">
                    <a
                      href={selectedCert.image}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-[0.98] transition-all duration-300"
                    >
                      Xem ảnh gốc
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <button
                      onClick={() => setSelectedCert(null)}
                      className="w-full py-3.5 rounded-xl text-sm font-semibold text-zinc-400 bg-zinc-800/40 hover:bg-zinc-800 hover:text-white transition-colors duration-200"
                    >
                      Đóng cửa sổ
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
