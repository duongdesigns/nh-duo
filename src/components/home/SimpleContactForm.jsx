import { ArrowRight } from "lucide-react"

export default function SimpleContactForm({ lang = "en" }) {
  const copy = {
    name: lang === "de" ? "Name" : "Name",
    email: lang === "de" ? "E-Mail" : "Email",
    brief: lang === "de" ? "Projektbriefing" : "Project brief",
    namePlaceholder: lang === "de" ? "Dein Name" : "Your name",
    briefPlaceholder:
      lang === "de"
        ? "Eine kurze Notiz zu Umfang, Zeitplan oder dem, was du bauen möchtest."
        : "A short note about scope, timeline, or what you want to build.",
    cta: lang === "de" ? "Projekt starten" : "Start the project",
  }

  return (
    <div className="rounded-[2rem] border border-white/10 bg-[#3B3B3B]/90 p-6 md:p-8">
      <div className="grid gap-4">
        <label className="grid gap-2">
          <span className="text-sm text-white/62">{copy.name}</span>
          <input
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 outline-none transition placeholder:text-white/28 focus:border-[#007BFF]/50"
            placeholder={copy.namePlaceholder}
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm text-white/62">{copy.email}</span>
          <input
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 outline-none transition placeholder:text-white/28 focus:border-[#007BFF]/50"
            placeholder="you@example.com"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm text-white/62">{copy.brief}</span>
          <textarea
            rows={6}
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 outline-none transition placeholder:text-white/28 focus:border-[#007BFF]/50"
            placeholder={copy.briefPlaceholder}
          />
        </label>
      </div>

      <button className="mt-6 inline-flex items-center gap-3 rounded-full bg-[#007BFF] px-7 py-4 text-base font-medium text-white transition hover:scale-[1.02] hover:bg-[#1787ff]">
        {copy.cta} <ArrowRight size={18} />
      </button>
    </div>
  )
}
