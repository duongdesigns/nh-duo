import { useState } from "react";
import { ArrowRight } from "lucide-react";

const recipientEmail = "hello@nhduo.studio";

const buildMailtoHref = ({ name, email, brief }) => {
  const subject = encodeURIComponent(`Project inquiry from ${name}`);
  const body = encodeURIComponent(
    [
      `Name: ${name}`,
      `Email: ${email}`,
      "",
      "Project brief:",
      brief,
    ].join("\n")
  );

  return `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
};

export default function SimpleContactForm() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    brief: "",
  });
  const [errors, setErrors] = useState({});
  const [submitMessage, setSubmitMessage] = useState("");

  const copy = {
    name: "Name",
    email: "Email",
    brief: "Project brief",
    namePlaceholder: "Your name",
    briefPlaceholder: "A short note about scope, timeline, or what you want to build.",
    cta: "Start the project",
    submitSuccess: "Opening your email client with the project brief.",
    errors: {
      name: "Please enter your name.",
      emailRequired: "Please enter your email.",
      emailInvalid: "Please enter a valid email address.",
      brief: "Please share a short project brief.",
    },
  };

  const validateField = (name, value) => {
    const trimmedValue = value.trim();

    if (name === "name") {
      return trimmedValue ? "" : copy.errors.name;
    }

    if (name === "email") {
      if (!trimmedValue) {
        return copy.errors.emailRequired;
      }

      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedValue)
        ? ""
        : copy.errors.emailInvalid;
    }

    if (name === "brief") {
      return trimmedValue ? "" : copy.errors.brief;
    }

    return "";
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;

    setValues((current) => ({ ...current, [name]: value }));
    setSubmitMessage("");

    if (errors[name]) {
      setErrors((current) => ({
        ...current,
        [name]: validateField(name, value),
      }));
    }
  };

  const handleBlur = ({ target }) => {
    const { name, value } = target;

    setErrors((current) => ({
      ...current,
      [name]: validateField(name, value),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = {
      name: validateField("name", values.name),
      email: validateField("email", values.email),
      brief: validateField("brief", values.brief),
    };

    setErrors(nextErrors);

    if (Object.values(nextErrors).some(Boolean)) {
      setSubmitMessage("");
      return;
    }

    const normalizedValues = {
      name: values.name.trim(),
      email: values.email.trim(),
      brief: values.brief.trim(),
    };

    setSubmitMessage(copy.submitSuccess);
    window.location.href = buildMailtoHref(normalizedValues);
  };

  return (
    <form
      className="rounded-[2rem] border border-white/10 bg-[#3B3B3B]/90 p-6 md:p-8"
      noValidate
      onSubmit={handleSubmit}
    >
      <div className="grid gap-4">
        <label className="grid gap-2">
          <span className="text-sm text-white/62">{copy.name}</span>
          <input
            autoComplete="name"
            aria-describedby="contact-name-error"
            aria-invalid={errors.name ? "true" : "false"}
            className="field-input outline-none"
            name="name"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder={copy.namePlaceholder}
            required
            value={values.name}
          />
          <span aria-live="polite" className="field-error" id="contact-name-error">
            {errors.name || ""}
          </span>
        </label>

        <label className="grid gap-2">
          <span className="text-sm text-white/62">{copy.email}</span>
          <input
            autoComplete="email"
            aria-describedby="contact-email-error"
            aria-invalid={errors.email ? "true" : "false"}
            className="field-input outline-none"
            name="email"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="you@example.com"
            required
            type="email"
            value={values.email}
          />
          <span aria-live="polite" className="field-error" id="contact-email-error">
            {errors.email || ""}
          </span>
        </label>

        <label className="grid gap-2">
          <span className="text-sm text-white/62">{copy.brief}</span>
          <textarea
            aria-describedby="contact-brief-error"
            aria-invalid={errors.brief ? "true" : "false"}
            className="field-input resize-y outline-none"
            name="brief"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder={copy.briefPlaceholder}
            required
            rows={6}
            value={values.brief}
          />
          <span aria-live="polite" className="field-error" id="contact-brief-error">
            {errors.brief || ""}
          </span>
        </label>
      </div>

      <button className="button-pill button-pill--primary cursor-contrast-cta group mt-6" type="submit">
        {copy.cta}
        <ArrowRight size={18} className="transition group-hover:translate-x-1" />
      </button>

      <p
        aria-live="polite"
        className="mt-4 min-h-6 text-sm leading-6 text-white/56"
        id="contact-form-status"
      >
        {submitMessage}
      </p>
    </form>
  );
}
