"use client";

import { motion } from "framer-motion";
import { Server, Database, LayoutTemplate, Terminal, BrainCircuit, CheckCircle2 } from "lucide-react";

interface Skill {
  name: string;
  level: "Advanced" | "Intermediate" | "Basic";
}

interface SkillGroup {
  category: string;
  icon: React.ReactNode;
  color: string;
  skills: Skill[];
}

const SKILL_DATA: SkillGroup[] = [
  {
    category: "Backend Development",
    icon: <Server className="w-6 h-6" />,
    color: "from-blue-500/20 to-indigo-500/10 border-blue-500/30 text-blue-500",
    skills: [
      { name: "Java Core & Advanced", level: "Advanced" },
      { name: "Spring Boot", level: "Advanced" },
      { name: "Spring Security", level: "Intermediate" },
      { name: "Hibernate / JPA", level: "Intermediate" },
      { name: "JWT / OAuth2", level: "Intermediate" },
      { name: "RESTful API Design", level: "Advanced" },
    ],
  },
  {
    category: "Databases",
    icon: <Database className="w-6 h-6" />,
    color: "from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-500",
    skills: [
      { name: "PostgreSQL", level: "Advanced" },
      { name: "MySQL", level: "Advanced" },
      { name: "MongoDB", level: "Intermediate" },
      { name: "Redis Caching", level: "Intermediate" },
      { name: "SQL Query Tuning", level: "Intermediate" },
    ],
  },
  {
    category: "Frontend Development",
    icon: <LayoutTemplate className="w-6 h-6" />,
    color: "from-purple-500/20 to-pink-500/10 border-purple-500/30 text-purple-500",
    skills: [
      { name: "HTML & CSS", level: "Intermediate" },
      { name: "Bootstrap", level: "Intermediate" },
      { name: "ReactJS", level: "Advanced" },
      { name: "TypeScript", level: "Intermediate" },

    ],
  },
  {
    category: "DevOps & Tools",
    icon: <Terminal className="w-6 h-6" />,
    color: "from-amber-500/20 to-orange-500/10 border-amber-500/30 text-amber-500",
    skills: [
      { name: "Docker & Docker Compose", level: "Intermediate" },
      { name: "Git & GitHub", level: "Advanced" },
      { name: "GitHub Actions (CI/CD)", level: "Intermediate" },

    ],
  },
  {
    category: "AI & Machine Learning",
    icon: <BrainCircuit className="w-6 h-6" />,
    color: "from-pink-500/20 to-rose-500/10 border-pink-500/30 text-pink-500",
    skills: [
      { name: "YOLOv8 Object Detection", level: "Intermediate" },
      { name: "OpenCV (Computer Vision)", level: "Intermediate" },
      { name: "Python Scripting", level: "Intermediate" },
    ],
  },
];

export default function Skills() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
  };

  const getLevelColor = (level: Skill["level"]) => {
    switch (level) {
      case "Advanced":
        return "text-blue-500 bg-blue-500/10 dark:text-blue-400 dark:bg-blue-950/30";
      case "Intermediate":
        return "text-purple-500 bg-purple-500/10 dark:text-purple-400 dark:bg-purple-950/30";
      case "Basic":
        return "text-zinc-500 bg-zinc-500/10 dark:text-zinc-400 dark:bg-zinc-800/30";
    }
  };

  return (
    <section id="ky-nang" className="py-24 relative overflow-hidden bg-background">
      {/* Background spotlights */}
      <div className="glow-effect top-1/3 left-1/2 -translate-x-1/2" style={{ "--glow-color": "rgba(139,92,246,0.06)" } as React.CSSProperties} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4"
          >
            Hệ thống <span className="gradient-text">kỹ năng</span>
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "60px" }}
            viewport={{ once: true, margin: "-100px" }}
            className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
          />
        </div>

        {/* Skill Groups Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {SKILL_DATA.map((group, groupIdx) => (
            <motion.div
              variants={cardVariants}
              key={groupIdx}
              className={`glass-card p-8 rounded-3xl relative overflow-hidden group hover:border-foreground/20 hover:shadow-xl transition-all duration-500 flex flex-col justify-between ${groupIdx === 3 || groupIdx === 4 ? "lg:col-span-1" : ""
                }`}
            >
              {/* Top background accent */}
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${group.color.split(" ")[0]} ${group.color.split(" ")[1]} rounded-bl-full opacity-30 -z-10 group-hover:scale-110 transition-transform duration-500`} />

              <div>
                {/* Header Icon + Group Title */}
                <div className="flex items-center gap-3.5 mb-6">
                  <div className={`flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-tr border ${group.color}`}>
                    {group.icon}
                  </div>
                  <h3 className="text-lg font-extrabold tracking-tight text-foreground">{group.category}</h3>
                </div>

                {/* Skills badges */}
                <div className="flex flex-col gap-4">
                  {group.skills.map((skill, skillIdx) => (
                    <div
                      key={skillIdx}
                      className="flex items-center justify-between border-b border-card-border/40 pb-2.5 last:border-0 last:pb-0"
                    >
                      <div className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-4.5 h-4.5 text-zinc-400 dark:text-zinc-500 group-hover:text-blue-500 transition-colors" />
                        <span className="text-sm font-semibold text-foreground/90 group-hover:text-foreground transition-colors">
                          {skill.name}
                        </span>
                      </div>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${getLevelColor(skill.level)}`}>
                        {skill.level}
                      </span>
                    </div>
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
