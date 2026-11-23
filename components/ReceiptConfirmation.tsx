/** Production-only copy. Render only after the server verifies a real successful receipt. */
export default function ReceiptConfirmation() {
  return (
    <>
      <p className="mt-6 text-xl">
        Confirm your email to finish signing up.
      </p>
      <p className="mx-auto mt-3 max-w-xl text-base leading-7 text-ink/70">
        Click the confirmation link Flodesk sent to your inbox. Your subscription
        and the connected email automation can continue after you confirm.
      </p>
    </>
  );
}
