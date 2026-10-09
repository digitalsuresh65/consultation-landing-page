export type FormValues = {
  fullName: string;
  email: string;
  phone: string;
  business: string;
  url: string;
  message: string;
};
export function validate(values: FormValues) {
  const errors: Partial<Record<keyof FormValues, string>> = {};
  if (!values.fullName.trim()) errors.fullName = "Please enter your full name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
    errors.email = "Please enter a valid email address.";
  const digits = values.phone.replace(/\D/g, "");
  if (
    !/^\+?[\d\s().-]+$/.test(values.phone.trim()) ||
    digits.length < 7 ||
    digits.length > 15
  )
    errors.phone = "Please enter a valid WhatsApp number (7–15 digits).";
  if (!values.business.trim())
    errors.business = "Please enter your business name.";
  if (values.url.trim()) {
    try {
      const url = new URL(values.url);
      if (
        !["https:", "http:"].includes(url.protocol) ||
        !url.hostname.includes(".")
      )
        throw new Error();
    } catch {
      errors.url =
        "Please enter a valid URL starting with https:// or http://.";
    }
  }
  return errors;
}
