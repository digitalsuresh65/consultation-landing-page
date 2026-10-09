export default function Hero() {
  return (
    <section className="hero-glow relative px-5 pb-20 pt-12 text-center sm:pb-28 sm:pt-16">
      <div className="hero-entrance mx-auto max-w-4xl">
        <div
          aria-hidden="true"
          className="mx-auto mb-7 flex items-center justify-center gap-4 text-gold"
        >
          <span className="h-px w-14 bg-gold/40" />
          <span className="text-xl">✧</span>
          <span className="h-px w-14 bg-gold/40" />
        </div>
        <h1 className="text-[2.75rem] leading-[1.03] tracking-[-0.025em] sm:text-6xl lg:text-[5.3rem]">
          Get the <span className="text-maroon">Perfect Fitting Dress</span> —
          Without the Guesswork or Overpaying
        </h1>
        <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed sm:text-xl">
          A free consultation to plan your bridal, wedding, festival, or party
          outfit — before you spend a single rupee.
        </p>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-ink/70 sm:text-base">
          This is for anyone with an upcoming wedding, function, or festival who
          wants the right fit at a fair price. Tell us what you need. We&apos;ll
          plan it with you, honestly, before you decide anything.
        </p>
        <a
          className="primary-button mt-8 w-full sm:w-auto"
          href="#consultation"
        >
          Book Free Consultation
        </a>
      </div>
    </section>
  );
}
