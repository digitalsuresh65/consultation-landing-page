"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LockKeyhole } from "lucide-react";
import { validate, type FormValues } from "@/lib/validation";
const fields: {
  key: Exclude<keyof FormValues, "message">;
  label: string;
  placeholder: string;
  type: string;
  autoComplete: string;
  required: boolean;
}[] = [
  {
    key: "fullName",
    label: "Full Name",
    placeholder: "Your full name",
    type: "text",
    autoComplete: "name",
    required: true,
  },
  {
    key: "email",
    label: "Active Email",
    placeholder: "you@example.com",
    type: "email",
    autoComplete: "email",
    required: true,
  },
  {
    key: "phone",
    label: "WhatsApp Number",
    placeholder: "Your number with country code",
    type: "tel",
    autoComplete: "tel",
    required: true,
  },
  {
    key: "business",
    label: "Business Name",
    placeholder: "Your business name",
    type: "text",
    autoComplete: "organization",
    required: true,
  },
  {
    key: "url",
    label: "Website or Facebook URL",
    placeholder: "https://",
    type: "url",
    autoComplete: "url",
    required: false,
  },
];
export default function CTAForm() {
  const router = useRouter();
  const [values, setValues] = useState<FormValues>({
    fullName: "",
    email: "",
    phone: "",
    business: "",
    url: "",
    message: "",
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormValues, string>>
  >({});
  const [busy, setBusy] = useState(false);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      document.getElementById(Object.keys(nextErrors)[0])?.focus();
      return;
    }
    setBusy(true);
    // REAL BACKEND: replace this simulated delay with await fetch('/api/consultations', ...).
    // Check response.ok before redirecting; handle failure inline and reset busy.
    // This demo sends and saves no form data. Only the first name travels to the confirmation page.
    await new Promise((resolve) => setTimeout(resolve, 500));
    router.push(
      `/thank-you?demo=1&name=${encodeURIComponent(values.fullName.trim().split(/\s+/)[0])}`,
    );
  }
  return (
    <section id="consultation" className="scroll-mt-6 py-20 sm:py-28">
      <div className="section-wrap grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:pt-8">
          <span aria-hidden="true" className="mb-6 block h-px w-14 bg-gold" />
          <h2 className="section-title">Book the call</h2>
          <p className="mt-6 text-xl text-maroon">One-to-one consultation</p>
          <p className="mt-3 text-sm text-ink/65">
            Customized strategy for your business
          </p>
        </div>
        <form
          onSubmit={submit}
          noValidate
          aria-label="Free consultation booking"
          aria-busy={busy}
          className="rounded-3xl border border-maroon/10 bg-cream-card p-5 shadow-xl shadow-maroon/5 sm:p-9"
        >
          <div className="grid gap-x-5 gap-y-6 sm:grid-cols-2">
            {fields.map((field) => (
              <div
                key={field.key}
                className={field.key === "url" ? "sm:col-span-2" : ""}
              >
                <label
                  htmlFor={field.key}
                  className="mb-2 block text-sm font-semibold"
                >
                  {field.label}{" "}
                  <span className="font-normal text-ink/55">
                    {field.required ? "*" : "(optional)"}
                  </span>
                </label>
                <input
                  id={field.key}
                  name={field.key}
                  type={field.type}
                  autoComplete={field.autoComplete}
                  required={field.required}
                  placeholder={field.placeholder}
                  maxLength={field.key === "url" ? 2048 : 200}
                  value={values[field.key]}
                  onChange={(e) => {
                    setValues({ ...values, [field.key]: e.target.value });
                    if (errors[field.key])
                      setErrors({ ...errors, [field.key]: undefined });
                  }}
                  aria-invalid={!!errors[field.key]}
                  aria-describedby={
                    errors[field.key] ? `${field.key}-error` : undefined
                  }
                  className="form-input"
                />
                {errors[field.key] && (
                  <p
                    id={`${field.key}-error`}
                    role="alert"
                    className="mt-2 text-sm text-maroon"
                  >
                    {errors[field.key]}
                  </p>
                )}
              </div>
            ))}
            <div className="sm:col-span-2">
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-semibold"
              >
                Anything You Want to Say{" "}
                <span className="font-normal text-ink/55">(optional)</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                maxLength={5000}
                placeholder="Tell us about your event, style, or budget…"
                value={values.message}
                onChange={(e) =>
                  setValues({ ...values, message: e.target.value })
                }
                className="form-input resize-y"
              />
            </div>
          </div>
          <button
            disabled={busy}
            className="primary-button mt-6 w-full"
            type="submit"
          >
            {busy ? "Booking…" : "Book Free Consultation"}
          </button>
          <p className="mt-4 flex items-center justify-center gap-2 text-center text-xs text-ink/60">
            <LockKeyhole className="h-3 w-3" aria-hidden="true" />
            We respect your privacy. No spam.
          </p>
          <p className="mt-4 text-center text-xs leading-5 text-ink/60">
            Demo form: your request is simulated. No data is sent or saved.
          </p>
        </form>
      </div>
    </section>
  );
}
