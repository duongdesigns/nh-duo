import React from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navbar({ page, navigate, navItems, menuOpen, setMenuOpen, scrolled, lang, setLang }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 py-4 md:px-8">
      <motion.div
        animate={{
          maxWidth: scrolled ? 980 : 1280,
          backgroundColor: scrolled ? "rgba(240, 240, 240, 0.96)" : "rgba(59, 61, 63, 0.18)",
          borderColor: scrolled ? "rgba(14, 20, 27, 0.08)" : "rgba(240,240,240,0.08)",
          y: scrolled ? 0 : 6,
        }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto hidden items-center justify-between rounded-[2rem] border px-4 py-3 backdrop-blur-xl md:flex md:px-6"
      >
        <button onClick={() => navigate("home")} className="group flex items-center text-left">
          <div className="hidden sm:block">
            <div className={`font-mono-accent text-[11px] uppercase tracking-[0.3em] ${scrolled ? "text-black/55" : "text-white/55"}`}>NH / DUO</div>
            <div className={`text-sm ${scrolled ? "text-black/82" : "text-white/88"}`}>
              {lang === "de" ? "Portfolio für Brand Design" : "Brand designer portfolio"}
            </div>
          </div>
        </button>

        <nav className="ml-auto hidden items-center justify-end gap-4 lg:gap-5 md:flex">
          {navItems.map((item) => (
            <button
              key={item.value}
              onClick={() => navigate(item.value)}
              className={`rounded-2xl px-5 py-2 text-sm transition ${
                page === item.value
                  ? scrolled
                    ? "bg-[#0E141B] text-white"
                    : "cursor-contrast-dark bg-white text-[#333333]"
                  : scrolled
                    ? "cursor-contrast-dark text-black/68 hover:bg-[#0E141B]/8 hover:text-black"
                    : "text-white/72 hover:bg-white/8 hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}

          <div className={`ml-1 inline-flex rounded-[1.5rem] border p-0.5 ${scrolled ? "border-black/10 bg-black/5" : "border-white/10 bg-white/5"}`}>
            {["en", "de"].map((value) => (
              <button
                key={value}
                onClick={() => setLang(value)}
                className={`rounded-[0.9rem] px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.2em] transition ${
                  lang === value
                    ? scrolled
                      ? "bg-[#0E141B] text-white"
                      : "bg-white text-[#333333]"
                    : scrolled
                      ? "text-black/58 hover:bg-black/6 hover:text-black"
                      : "text-white/52 hover:bg-white/8 hover:text-white"
                }`}
              >
                {value}
              </button>
            ))}
          </div>
        </nav>

        <button
          onClick={() => setMenuOpen((value) => !value)}
          className={`flex h-10 w-10 items-center justify-center rounded-2xl border md:hidden ${
            scrolled
              ? "border-black/10 bg-black/5 text-black"
              : "border-white/12 bg-white/5 text-white"
          }`}
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </motion.div>

      <div className="flex justify-end md:hidden">
        <div className="flex items-center gap-3">
          <motion.button
            onClick={() => setMenuOpen((value) => !value)}
            animate={{
              backgroundColor: scrolled ? "rgba(240, 240, 240, 0.96)" : "rgba(59, 61, 63, 0.18)",
              borderColor: scrolled ? "rgba(14, 20, 27, 0.08)" : "rgba(240,240,240,0.08)",
              y: scrolled ? 0 : 6,
            }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className={`flex h-[52px] w-[52px] items-center justify-center rounded-[1.4rem] border backdrop-blur-xl ${
              scrolled ? "cursor-contrast-dark text-black" : "text-white"
            }`}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.button>
        </div>
      </div>

      {menuOpen && (
        <div
          className={`mx-auto mt-3 max-w-5xl rounded-3xl border p-3 backdrop-blur-xl md:hidden ${
            scrolled
              ? "border-black/10 bg-[#F0F0F0]/95"
              : "border-white/10 bg-[#3B3B3B]/95"
          }`}
        >
          <div className="mb-2 flex gap-2">
            {["en", "de"].map((value) => (
              <button
                key={value}
                onClick={() => setLang(value)}
                className={`rounded-2xl px-4 py-2 text-[11px] font-medium uppercase tracking-[0.22em] ${
                  lang === value
                    ? scrolled
                      ? "bg-[#0E141B] text-white"
                      : "bg-white text-[#333333]"
                    : scrolled
                      ? "text-black/72 hover:bg-[#0E141B]/8"
                      : "text-white/72 hover:bg-white/6"
                }`}
              >
                {value}
              </button>
            ))}
          </div>
          {navItems.map((item) => (
            <button
              key={item.value}
              onClick={() => navigate(item.value)}
              className={`block w-full rounded-2xl px-4 py-3 text-left ${
                scrolled
                  ? "cursor-contrast-dark text-black/82 hover:bg-[#0E141B]/8"
                  : "text-white/82 hover:bg-white/6"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
