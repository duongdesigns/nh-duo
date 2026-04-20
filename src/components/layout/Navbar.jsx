import { Menu, X } from "lucide-react";

export default function Navbar({
  page,
  navigate,
  navItems,
  menuOpen,
  setMenuOpen,
  scrolled,
  preloadPage,
}) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 py-4 md:px-8">
      <div
        style={{
          maxWidth: scrolled ? "980px" : "1280px",
          transform: scrolled ? "translateY(0)" : "translateY(6px)",
        }}
        className={`mx-auto hidden items-center justify-between rounded-[2rem] border px-4 py-3 md:flex md:px-6 ${
          "transition-[max-width,transform,background-color,border-color] duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
        } ${
          scrolled
            ? "border-[rgba(14,20,27,0.08)] bg-[rgba(240,240,240,0.96)]"
            : "border-[rgba(240,240,240,0.08)] bg-[rgba(59,61,63,0.18)]"
        } ${
          scrolled ? "backdrop-blur-xl" : ""
        }`}
      >
        <button onClick={() => navigate("home")} className="group flex items-center text-left" type="button">
          <div className="hidden sm:block">
            <div className={`type-eyebrow ${scrolled ? "text-black/55" : "text-white/55"}`}>NH / DUO</div>
            <div className={`text-sm ${scrolled ? "text-black/82" : "text-white/88"}`}>Brand designer portfolio</div>
          </div>
        </button>

        <nav aria-label="Primary" className="ml-auto hidden items-center justify-end gap-4 lg:gap-5 md:flex">
          {navItems.map((item) => (
            <button
              key={item.value}
              onClick={() => navigate(item.value)}
              onMouseEnter={() => preloadPage?.(item.value)}
              onFocus={() => preloadPage?.(item.value)}
              type="button"
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
        </nav>

        <button
          onClick={() => setMenuOpen((value) => !value)}
          type="button"
          className={`flex h-10 w-10 items-center justify-center rounded-2xl border md:hidden ${
            scrolled
              ? "border-black/10 bg-black/5 text-black"
              : "border-white/12 bg-white/5 text-white"
          }`}
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <div className="flex justify-end md:hidden">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMenuOpen((value) => !value)}
            type="button"
            style={{
              transform: scrolled ? "translateY(0)" : "translateY(6px)",
            }}
            className={`flex h-[52px] w-[52px] items-center justify-center rounded-[1.4rem] border transition-[transform,background-color,border-color] duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
              scrolled
                ? "border-[rgba(14,20,27,0.08)] bg-[rgba(240,240,240,0.96)]"
                : "border-[rgba(240,240,240,0.08)] bg-[rgba(59,61,63,0.18)]"
            } ${
              scrolled ? "backdrop-blur-xl" : ""
            } ${
              scrolled ? "cursor-contrast-dark text-black" : "text-white"
            }`}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          aria-label="Mobile"
          className={`mx-auto mt-3 max-w-5xl rounded-3xl border p-3 md:hidden ${
            scrolled ? "backdrop-blur-xl" : ""
          } ${
            scrolled
              ? "border-black/10 bg-[#F0F0F0]/95"
              : "border-white/10 bg-[#3B3B3B]/95"
          }`}
        >
          {navItems.map((item) => (
            <button
              key={item.value}
              onClick={() => navigate(item.value)}
              onMouseEnter={() => preloadPage?.(item.value)}
              onFocus={() => preloadPage?.(item.value)}
              type="button"
              className={`block w-full rounded-2xl px-4 py-3 text-left ${
                scrolled
                  ? "cursor-contrast-dark text-black/82 hover:bg-[#0E141B]/8"
                  : "text-white/82 hover:bg-white/6"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}
