"use client";

import { useEffect, useState } from "react";
import { LockKeyhole } from "lucide-react";
import { validate, type FormValues } from "@/lib/validation";

const FLODESK_FORM_ID = "6ae077d675c737372cf4391c";
const FLODESK_ROOT_CLASS = `ff-${FLODESK_FORM_ID}`;
const FLODESK_CONTAINER_ID = "flodesk-consultation-form";

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

const fieldSettings: {
  key: keyof FormValues;
  label: string;
  placeholder: string;
  autoComplete: string;
  inputMode?: "email" | "tel" | "url";
}[] = [
  {
    key: "fullName",
    label: "Full Name",
    placeholder: "Your full name",
    autoComplete: "name",
  },
  {
    key: "email",
    label: "Active Email",
    placeholder: "you@example.com",
    autoComplete: "email",
    inputMode: "email",
  },
  {
    key: "phone",
    label: "WhatsApp Number",
    placeholder: "Your number with country code",
    autoComplete: "tel",
    inputMode: "tel",
  },
  {
    key: "business",
    label: "Business Name",
    placeholder: "Your business name",
    autoComplete: "organization",
  },
  {
    key: "url",
    label: "Website or Facebook URL",
    placeholder: "https://",
    autoComplete: "url",
    inputMode: "url",
  },
  {
    key: "message",
    label: "Anything You Want to Say",
    placeholder: "Tell us about your event, style, or budget…",
    autoComplete: "off",
  },
];

function loadFlodeskScripts() {
  if (document.querySelector('script[data-flodesk-universal="module"]')) return;

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

function getVisibleFlodeskInputs(container: HTMLElement) {
  return Array.from(
    container.querySelectorAll<HTMLInputElement>('input:not([type="hidden"])'),
  ).filter((input) => input.getClientRects().length > 0);
}

function enhanceFlodeskForm(container: HTMLElement) {
  const root = container.querySelector<HTMLElement>(
    `[data-ff-el="root"].${FLODESK_ROOT_CLASS}`,
  );
  const config = root?.querySelector<HTMLElement>(
    '[data-ff-el="config"][data-ff-config]',
  );
  const form = root?.querySelector<HTMLFormElement>(
    'form[data-ff-el="form"]',
  );
  const inputs = root ? getVisibleFlodeskInputs(root) : [];

  if (!root || !config || !form || inputs.length !== fieldSettings.length) {
    return null;
  }
  if (!form.querySelector('input[name="csrf"]')) return null;
  if (form.dataset.consultationEnhanced === "true") return () => {};

  form.dataset.consultationEnhanced = "true";
  form.setAttribute("aria-label", "Free consultation booking");
  form.noValidate = true;

  const inputByKey = {} as Record<keyof FormValues, HTMLInputElement>;

  inputs.forEach((input, index) => {
    const settings = fieldSettings[index];
    const group = input.closest<HTMLElement>(".fd-form-group");
    const label = group?.querySelector<HTMLLabelElement>("label");

    inputByKey[settings.key] = input;
    input.dataset.consultationInput = settings.key;
    input.placeholder = settings.placeholder;
    input.setAttribute("autocomplete", settings.autoComplete);
    input.required = true;
    input.setAttribute("aria-required", "true");
    if (settings.inputMode) input.inputMode = settings.inputMode;

    if (group) group.dataset.consultationField = settings.key;
    if (label) label.textContent = `${settings.label} *`;

    const error = document.createElement("p");
    error.id = `${input.id}-error`;
    error.dataset.consultationError = settings.key;
    error.setAttribute("role", "alert");
    error.hidden = true;
    group?.appendChild(error);
  });

  const button = form.querySelector<HTMLButtonElement>('[data-ff-el="submit"]');
  if (button) button.textContent = "Book Free Consultation";

  const showFieldError = (key: keyof FormValues, message?: string) => {
    const input = inputByKey[key];
    const error = form.querySelector<HTMLElement>(
      `[data-consultation-error="${key}"]`,
    );

    input.setAttribute("aria-invalid", message ? "true" : "false");
    if (message && error) {
      error.textContent = message;
      error.hidden = false;
      input.setAttribute("aria-describedby", error.id);
    } else if (error) {
      error.textContent = "";
      error.hidden = true;
      input.removeAttribute("aria-describedby");
    }
  };

  const showErrors = (errors: Partial<Record<keyof FormValues, string>>) => {
    fieldSettings.forEach(({ key }) => showFieldError(key, errors[key]));
  };

  const readValues = (): FormValues => ({
    fullName: inputByKey.fullName.value,
    email: inputByKey.email.value,
    phone: inputByKey.phone.value,
    business: inputByKey.business.value,
    url: inputByKey.url.value,
    message: inputByKey.message.value,
  });

  const onSubmit = (event: SubmitEvent) => {
    const errors = validate(readValues());
    showErrors(errors);
    const firstInvalid = fieldSettings.find(({ key }) => errors[key]);

    if (firstInvalid) {
      event.preventDefault();
      event.stopImmediatePropagation();
      inputByKey[firstInvalid.key].focus();
    }
  };

  const inputListeners = fieldSettings.map(({ key }) => {
    const input = inputByKey[key];
    const listener = () => showFieldError(key, validate(readValues())[key]);
    input.addEventListener("input", listener);
    return { input, listener };
  });
  form.addEventListener("submit", onSubmit, true);

  return () => {
    inputListeners.forEach(({ input, listener }) =>
      input.removeEventListener("input", listener),
    );
    form.removeEventListener("submit", onSubmit, true);
  };
}

export default function CTAForm() {
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );

  useEffect(() => {
    const container = document.getElementById(FLODESK_CONTAINER_ID);
    if (!container) return;

    let active = true;
    let detachValidation: (() => void) | null = null;
    const tryEnhance = () => {
      if (detachValidation) return;
      const detach = enhanceFlodeskForm(container);
      if (detach) {
        detachValidation = detach;
        if (active) setStatus("ready");
      }
    };

    const observer = new MutationObserver(tryEnhance);
    observer.observe(container, { childList: true, subtree: true });

    window.FlodeskObject = "fd";
    if (!window.fd) {
      const fd: FlodeskFunction = (...args: unknown[]) => {
        fd.q = fd.q || [];
        fd.q.push(args);
      };
      window.fd = fd;
    }

    loadFlodeskScripts();

    if (!container.dataset.flodeskRequested) {
      container.dataset.flodeskRequested = "true";
      window.fd("form", {
        formId: FLODESK_FORM_ID,
        containerEl: `#${FLODESK_CONTAINER_ID}`,
      });
    }

    tryEnhance();
    const timeout = window.setTimeout(() => {
      if (active && !detachValidation) setStatus("error");
    }, 20_000);

    return () => {
      active = false;
      observer.disconnect();
      window.clearTimeout(timeout);
      detachValidation?.();
    };
  }, []);

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

        <div className="rounded-3xl border border-maroon/10 bg-cream-card p-5 shadow-xl shadow-maroon/5 sm:p-9">
          {status === "loading" && (
            <p className="py-8 text-center text-sm text-ink/60" role="status">
              Loading secure consultation form…
            </p>
          )}
          {status === "error" && (
            <p className="rounded-xl border border-maroon/20 p-4 text-sm text-maroon" role="alert">
              The consultation form could not load. Please refresh the page and
              try again.
            </p>
          )}
          <div
            id={FLODESK_CONTAINER_ID}
            className={status === "ready" ? "block" : "invisible h-0 overflow-hidden"}
          />

          {status === "ready" && (
            <>
              <p className="mt-4 flex items-center justify-center gap-2 text-center text-xs text-ink/60">
                <LockKeyhole className="h-3 w-3" aria-hidden="true" />
                We respect your privacy. No spam.
              </p>
              <p className="mt-4 text-center text-xs leading-5 text-ink/60">
                By submitting, you agree to receive consultation emails from
                A&amp;A Fashion Boutique. You can unsubscribe at any time.
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
