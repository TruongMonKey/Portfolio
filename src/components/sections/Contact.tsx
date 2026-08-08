"use client";

import { useState } from "react";
import { Mail, MapPin, Github, Linkedin, Facebook, Send, CheckCircle2, AlertCircle, Copy, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FormState {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function Contact() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [copiedType, setCopiedType] = useState<string | null>(null);

  // Copy to clipboard helper
  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const validate = (): boolean => {
    const tempErrors: FormErrors = {};
    if (!form.name.trim()) tempErrors.name = "Vui lòng nhập họ và tên của bạn.";

    if (!form.email.trim()) {
      tempErrors.email = "Vui lòng nhập địa chỉ email.";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      tempErrors.email = "Địa chỉ email không đúng định dạng.";
    }

    if (!form.message.trim()) {
      tempErrors.message = "Vui lòng nhập nội dung liên hệ.";
    } else if (form.message.trim().length < 10) {
      tempErrors.message = "Nội dung tin nhắn phải từ 10 ký tự trở lên.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const targetEmail = "truongcot1907@gmail.com";
    const subject = encodeURIComponent(`[Portfolio Contact] Lời nhắn từ ${form.name}`);
    const body = encodeURIComponent(
      `Họ và tên: ${form.name}\nEmail người gửi: ${form.email}\n\nNội dung lời nhắn:\n${form.message}`
    );

    // Trigger user's mail client with prefilled email details
    window.location.href = `mailto:${targetEmail}?subject=${subject}&body=${body}`;

    await new Promise((resolve) => setTimeout(resolve, 800));

    setIsSubmitting(false);
    setSubmitSuccess(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="lien-he" className="py-24 relative overflow-hidden bg-background">
      {/* Background glowing gradients */}
      <div className="glow-effect top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ "--glow-color": "rgba(59,130,246,0.06)" } as React.CSSProperties} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4"
          >
            Kết nối với <span className="gradient-text">tôi</span>
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "60px" }}
            viewport={{ once: true, margin: "-100px" }}
            className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
          />
        </div>

        {/* Contact Info and Form grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto">

          {/* Left Column: Unified Contact Card */}
          <div className="lg:col-span-5 flex flex-col h-full">
            <div className="glass-card p-8 sm:p-10 rounded-3xl flex flex-col justify-between h-full gap-8">
              
              {/* Top Details & Header */}
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-extrabold text-foreground">Thông tin liên hệ</h3>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Sẵn sàng làm việc
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-muted-text leading-relaxed font-medium">
                  Bạn có dự án hoặc câu hỏi? Đừng ngần ngại liên hệ trực tiếp với tôi hoặc gửi tin nhắn qua biểu mẫu.
                </p>

                {/* Info List */}
                <div className="flex flex-col gap-4">

                  {/* Email Card */}
                  <div className="p-4 rounded-2xl border border-card-border bg-card-bg/40 flex items-center justify-between group hover:border-blue-500/30 transition-all duration-300">
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-blue-500/10 text-blue-500 shrink-0 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] font-bold text-muted-text uppercase tracking-wider">Email</p>
                        <p className="text-xs sm:text-sm font-semibold text-foreground truncate">truongcot1907@gmail.com</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleCopy("truongcot1907@gmail.com", "email")}
                      className="p-2.5 rounded-xl bg-card-bg hover:bg-card-border/60 text-muted-text hover:text-foreground transition-all shrink-0 ml-2"
                      title="Copy email"
                    >
                      {copiedType === "email" ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Address Card */}
                  <div className="p-4 rounded-2xl border border-card-border bg-card-bg/40 flex items-center justify-between group hover:border-purple-500/30 transition-all duration-300">
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-purple-500/10 text-purple-500 shrink-0 group-hover:bg-purple-500 group-hover:text-white transition-all duration-300">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] font-bold text-muted-text uppercase tracking-wider">Địa chỉ</p>
                        <p className="text-xs sm:text-sm font-semibold text-foreground truncate">Hồ Tùng Mậu, Tp. Hà Nội</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleCopy("Hồ Tùng Mậu, Tp. Hà Nội", "address")}
                      className="p-2.5 rounded-xl bg-card-bg hover:bg-card-border/60 text-muted-text hover:text-foreground transition-all shrink-0 ml-2"
                      title="Copy address"
                    >
                      {copiedType === "address" ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>

                </div>
              </div>

              {/* Bottom Social Links Section */}
              <div className="pt-6 border-t border-card-border/60">
                <p className="text-[11px] font-bold text-muted-text uppercase tracking-wider mb-4">Mạng xã hội của tôi</p>
                <div className="grid grid-cols-3 gap-3">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center gap-2 p-3.5 rounded-2xl border border-card-border bg-card-bg/30 hover:bg-blue-500/5 hover:border-blue-500/30 hover:text-blue-500 transition-all duration-300 group"
                  >
                    <Github className="w-5 h-5 text-muted-text group-hover:text-blue-500 group-hover:scale-110 transition-all" />
                    <span className="text-xs font-semibold">GitHub</span>
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center gap-2 p-3.5 rounded-2xl border border-card-border bg-card-bg/30 hover:bg-blue-500/5 hover:border-blue-500/30 hover:text-blue-500 transition-all duration-300 group"
                  >
                    <Linkedin className="w-5 h-5 text-muted-text group-hover:text-blue-500 group-hover:scale-110 transition-all" />
                    <span className="text-xs font-semibold">LinkedIn</span>
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center gap-2 p-3.5 rounded-2xl border border-card-border bg-card-bg/30 hover:bg-blue-500/5 hover:border-blue-500/30 hover:text-blue-500 transition-all duration-300 group"
                  >
                    <Facebook className="w-5 h-5 text-muted-text group-hover:text-blue-500 group-hover:scale-110 transition-all" />
                    <span className="text-xs font-semibold">Facebook</span>
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 flex flex-col h-full">
            <div className="glass-card p-8 sm:p-10 rounded-3xl relative h-full flex flex-col justify-center">

              <AnimatePresence mode="wait">
                {!submitSuccess ? (
                  <motion.form
                    key="contact-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-5"
                  >
                    <h3 className="text-xl font-extrabold text-foreground mb-2">Gửi lời nhắn cho tôi</h3>

                    {/* Name Input */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="name" className="text-xs font-bold text-muted-text uppercase tracking-wider">Họ và tên</label>
                      <input
                        type="text"
                        id="name"
                        value={form.name}
                        onChange={(e) => {
                          setForm({ ...form, name: e.target.value });
                          if (errors.name) setErrors({ ...errors, name: undefined });
                        }}
                        placeholder="Nguyễn Văn A"
                        className={`w-full px-4 py-3.5 rounded-xl border bg-card-bg/40 text-foreground placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all ${errors.name ? "border-rose-500/50" : "border-card-border hover:border-foreground/20"
                          }`}
                      />
                      {errors.name && (
                        <span className="flex items-center gap-1 text-xs text-rose-500 font-semibold mt-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.name}
                        </span>
                      )}
                    </div>

                    {/* Email Input */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="email" className="text-xs font-bold text-muted-text uppercase tracking-wider">Email liên hệ</label>
                      <input
                        type="email"
                        id="email"
                        value={form.email}
                        onChange={(e) => {
                          setForm({ ...form, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: undefined });
                        }}
                        placeholder="nguyenvana@gmail.com"
                        className={`w-full px-4 py-3.5 rounded-xl border bg-card-bg/40 text-foreground placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all ${errors.email ? "border-rose-500/50" : "border-card-border hover:border-foreground/20"
                          }`}
                      />
                      {errors.email && (
                        <span className="flex items-center gap-1 text-xs text-rose-500 font-semibold mt-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.email}
                        </span>
                      )}
                    </div>

                    {/* Message Input */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="message" className="text-xs font-bold text-muted-text uppercase tracking-wider">Nội dung</label>
                      <textarea
                        id="message"
                        rows={4}
                        value={form.message}
                        onChange={(e) => {
                          setForm({ ...form, message: e.target.value });
                          if (errors.message) setErrors({ ...errors, message: undefined });
                        }}
                        placeholder="Nhập nội dung tin nhắn của bạn tại đây..."
                        className={`w-full px-4 py-3.5 rounded-xl border bg-card-bg/40 text-foreground placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none transition-all ${errors.message ? "border-rose-500/50" : "border-card-border hover:border-foreground/20"
                          }`}
                      />
                      {errors.message && (
                        <span className="flex items-center gap-1 text-xs text-rose-500 font-semibold mt-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.message}
                        </span>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full mt-2 py-4 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-[0.99] disabled:opacity-50 transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer shadow-lg shadow-blue-500/10"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Đang gửi...
                        </>
                      ) : (
                        <>
                          Gửi lời nhắn
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success-screen"
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="flex flex-col items-center text-center p-4"
                  >
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 mb-6 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                      <CheckCircle2 className="w-9 h-9" />
                    </div>
                    <h3 className="text-2xl font-extrabold text-foreground mb-3">Gửi thành công!</h3>
                    <p className="text-sm text-muted-text leading-relaxed max-w-sm mb-8 font-medium">
                      Cảm ơn bạn đã liên hệ. Tôi đã nhận được tin nhắn và sẽ phản hồi lại bạn qua email trong thời gian sớm nhất.
                    </p>
                    <button
                      onClick={() => setSubmitSuccess(false)}
                      className="px-6 py-3.5 rounded-xl text-sm font-semibold text-foreground bg-card-bg border border-card-border hover:bg-card-border/50 transition-all duration-300"
                    >
                      Gửi tin nhắn mới
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
