/** Production-only copy. Render only after the server verifies a real successful receipt. */
export default function ReceiptConfirmation() {
  return (
    <>
      <p className="mt-6 text-xl">
        Your consultation request has been received.
      </p>
      <p className="mx-auto mt-3 max-w-xl text-base leading-7 text-ink/70">
        Our team will reach out to you shortly to plan your design, fitting, and
        price — just like we promised.
      </p>
    </>
  );
}
