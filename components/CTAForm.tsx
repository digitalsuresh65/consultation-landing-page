"use client";
import { useEffect, useState } from "react";
import { LockKeyhole } from "lucide-react";
import { validate, type FormValues } from "@/lib/validation";

const FLODESK_FORM_ID = "6ae077d675c737372cf4391c";
const FLODESK_ROOT_CLASS = `ff-${FLODESK_FORM_ID}`;
const FLODESK_ACTION = `https://form.flodesk.com/forms/${FLODESK_FORM_ID}/submit`;
const FLODESK_CONFIG =
  "eyJ0cmlnZ2VyIjp7Im1vZGUiOiJpbW1lZGlhdGVseSIsInZhbHVlIjowfSwib25TdWNjZXNzIjp7Im1vZGUiOiJyZWRpcmVjdCIsIm1lc3NhZ2UiOiIiLCJyZWRpcmVjdFVybCI6Imh0dHBzOi8vY29uc3VsdGF0aW9uLmFuYWZhc2hpb25ib3V0aXF1ZS5jb20vdGhhbmsteW91In0sImNvaSI6dHJ1ZSwic2hvd0ZvclJldHVyblZpc2l0b3JzIjp0cnVlLCJub3RpZmljYXRpb24iOnRydWUsImdkcHIiOnsiYWNjZXB0c01hcmtldGluZyI6ZmFsc2UsInByaXZhY3lQb2xpY3kiOnsiZW5hYmxlZCI6ZmFsc2UsIm1hbmRhdG9yeSI6ZmFsc2V9fSwidHJhY2tpbmdDb25maWciOnsibWV0YVBpeGVsSWQiOiIiLCJjb29raWVCYW5uZXJFbmFibGVkIjpmYWxzZSwiZ29vZ2xlQW5hbHl0aWNzSWQiOiIifX0=";

type FlodeskFunction = {
  (...args: unknown[]): void;
  q?: unknown[][];
};

declare global {
  interface Window {
    FlodeskObject?: string;
    fd?: FlodeskFunction;
  }
}

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
    required: true,
  },
];
export default function CTAForm() {
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

  useEffect(() => {
    window.FlodeskObject = "fd";

    if (!window.fd) {
      const fd: FlodeskFunction = (...args: unknown[]) => {
        fd.q = fd.q || [];
        fd.q.push(args);
      };
      window.fd = fd;
    }

    if (!document.querySelector('script[data-flodesk-universal="module"]')) {
      const version = `?v=${Math.floor(Date.now() / 120_000) * 60}`;
      const moduleScript = document.createElement("script");
      moduleScript.async = true;
      moduleScript.type = "module";
      moduleScript.src = `https://assets.flodesk.com/universal.mjs${version}`;
      moduleScript.dataset.flodeskUniversal = "module";
      document.head.appendChild(moduleScript);

      const legacyScript = document.createElement("script");
      legacyScript.async = true;
      legacyScript.noModule = true;
      legacyScript.src = `https://assets.flodesk.com/universal.js${version}`;
      legacyScript.dataset.flodeskUniversal = "legacy";
      document.head.appendChild(legacyScript);
    }

    const root = document.querySelector<HTMLElement>(`.${FLODESK_ROOT_CLASS}`);
    if (root && !root.dataset.flodeskInitialized) {
      root.dataset.flodeskInitialized = "true";
      window.fd("form:handle", {
        formId: FLODESK_FORM_ID,
        rootEl: `.${FLODESK_ROOT_CLASS}`,
      });
    }
  }, []);

  function submit(event: React.FormEvent<HTMLFormElement>) {
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      event.preventDefault();
      event.stopPropagation();
      document.getElementById(Object.keys(nextErrors)[0])?.focus();
    }
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
        <div
          className={`contents ${FLODESK_ROOT_CLASS}`}
          data-ff-el="root"
          data-ff-version="3"
          data-ff-type="inline"
          data-ff-name="inlineNoImage"
          data-ff-stage="default"
        >
          <div
            data-ff-el="config"
            data-ff-config={FLODESK_CONFIG}
            className="hidden"
          />
          <form
            action={FLODESK_ACTION}
            method="post"
            onSubmitCapture={submit}
            noValidate
            data-ff-el="form"
            aria-label="Free consultation booking"
            className="rounded-3xl border border-maroon/10 bg-cream-card p-5 shadow-xl shadow-maroon/5 sm:p-9"
          >
            <div
              className="grid gap-x-5 gap-y-6 sm:grid-cols-2"
              data-ff-el="content"
            >
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
                    name={
                      field.key === "fullName"
                        ? "firstName"
                        : field.key === "phone"
                          ? "fields.whatsappNumber"
                          : field.key === "business"
                            ? "fields.businessName"
                            : field.key === "url"
                              ? "fields.websieOrFacebookLink"
                              : "email"
                    }
                    type={field.type}
                    autoComplete={field.autoComplete}
                    required={field.required}
                    placeholder={field.placeholder}
                    maxLength={255}
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
                  <span className="font-normal text-ink/55">*</span>
                </label>
                <textarea
                  id="message"
                  name="fields.askAnythinkYouWantToSay"
                  rows={4}
                  maxLength={255}
                  required
                  placeholder="Tell us about your event, style, or budget…"
                  value={values.message}
                  onChange={(e) => {
                    setValues({ ...values, message: e.target.value });
                    if (errors.message)
                      setErrors({ ...errors, message: undefined });
                  }}
                  aria-invalid={!!errors.message}
                  aria-describedby={
                    errors.message ? "message-error" : undefined
                  }
                  className="form-input resize-y"
                />
                {errors.message && (
                  <p
                    id="message-error"
                    role="alert"
                    className="mt-2 text-sm text-maroon"
                  >
                    {errors.message}
                  </p>
                )}
              </div>
            </div>
            <input
              type="text"
              name="confirm_email_address"
              maxLength={255}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
            />
            <button
              className="primary-button mt-6 w-full"
              type="submit"
              data-ff-el="submit"
            >
              Book Free Consultation
            </button>
            <p className="mt-4 flex items-center justify-center gap-2 text-center text-xs text-ink/60">
              <LockKeyhole className="h-3 w-3" aria-hidden="true" />
              We respect your privacy. No spam.
            </p>
            <p className="mt-4 text-center text-xs leading-5 text-ink/60">
              By submitting, you agree to receive consultation emails from
              A&amp;A Fashion Boutique. You can unsubscribe at any time.
            </p>
            <div
              className="mt-4 text-center text-sm text-maroon"
              data-ff-el="error"
              role="alert"
            />
          </form>
        </div>
      </div>
    </section>
  );
}
