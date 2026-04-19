import { useState } from "react"
import { ArrowRight } from "lucide-react"

export default function SimpleContactForm() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    brief: "",
  })
  const [errors, setErrors] = useState({})

  const copy = {
    name: "Name",
    email: "Email",
    brief: "Project brief",
    namePlaceholder: "Your name",
    briefPlaceholder: "A short note about scope, timeline, or what you want to build.",
    cta: "Start the project",
    errors: {
      name: "Please enter your name.",
      emailRequired: "Please enter your email.",
      emailInvalid: "Please enter a valid email address.",
      brief: "Please share a short project brief.",
    },
  }

  const validateField = (name, value) => {
    const trimmedValue = value.trim()

    if (name === "name") {
      return trimmedValue ? "" : copy.errors.name
    }

    if (name === "email") {
      if (!trimmedValue) return copy.errors.emailRequired
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedValue) ? "" : copy.errors.emailInvalid
    }

    if (name === "brief") {
      return trimmedValue ? "" : copy.errors.brief
    }

    return ""
  }

  const handleChange = ({ target }) => {
    const { name, value } = target
    setValues((current) => ({ ...current, [name]: value }))

    if (errors[name]) {
      setErrors((current) => ({
        ...current,
        [name]: validateField(name, value),
      }))
    }
  }

  const handleBlur = ({ target }) => {
    const { name, value } = target
    setErrors((current) => ({
      ...current,
      [name]: validateField(name, value),
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const nextErrors = {
      name: validateField("name", values.name),
      email: validateField("email", values.email),
      brief: validateField("brief", values.brief),
    }

    setErrors(nextErrors)

    if (Object.values(nextErrors).some(Boolean)) return
  }

  return (
    <form className="rounded-[2rem] border border-white/10 bg-[#3B3B3B]/90 p-6 md:p-8" noValidate onSubmit={handleSubmit}>
      <div className="grid gap-4">
        <label className="grid gap-2">
          <span className="text-sm text-white/62">{copy.name}</span>
          <input
            name="name"
            value={values.name}
            onBlur={handleBlur}
            onChange={handleChange}
            aria-describedby="contact-name-error"
            aria-invalid={errors.name ? "true" : "false"}
            className="field-input outline-none"
            placeholder={copy.namePlaceholder}
          />
          <span className="field-error" id="contact-name-error">{errors.name || ""}</span>
        </label>

        <label className="grid gap-2">
          <span className="text-sm text-white/62">{copy.email}</span>
          <input
            name="email"
            type="email"
            value={values.email}
            onBlur={handleBlur}
            onChange={handleChange}
            aria-describedby="contact-email-error"
            aria-invalid={errors.email ? "true" : "false"}
            className="field-input outline-none"
            placeholder="you@example.com"
          />
          <span className="field-error" id="contact-email-error">{errors.email || ""}</span>
        </label>

        <label className="grid gap-2">
          <span className="text-sm text-white/62">{copy.brief}</span>
          <textarea
            name="brief"
            rows={6}
            value={values.brief}
            onBlur={handleBlur}
            onChange={handleChange}
            aria-describedby="contact-brief-error"
            aria-invalid={errors.brief ? "true" : "false"}
            className="field-input resize-y outline-none"
            placeholder={copy.briefPlaceholder}
          />
          <span className="field-error" id="contact-brief-error">{errors.brief || ""}</span>
        </label>
      </div>

      <button className="button-pill button-pill--primary mt-6" type="submit">
        {copy.cta} <ArrowRight size={18} className="transition group-hover:translate-x-1"/>
      </button>
    </form>
  )
}
