/** Production-only copy. Render only after the server verifies a real successful receipt. */
export default function ReceiptConfirmation() {
  return (
    <p className="mt-2 text-xl font-semibold leading-8 text-[#333333] sm:text-2xl">
      Your Consultation Request Has Been Received.
    </p>
  );
}
