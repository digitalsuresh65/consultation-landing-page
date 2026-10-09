const steps = [
  ["Book your consultation", "Book your free consultation below."],
  [
    "Tell us what you need",
    "Tell us about your event, your style, and your budget.",
  ],
  [
    "Get your plan",
    "Get a clear plan — design, fitting, and price — made for you.",
  ],
];
export default function Process() {
  return (
    <section className="bg-cream-deep/50 py-16 sm:py-20">
      <div className="section-wrap">
        <h2 className="section-title text-center">The consultation process</h2>
        <ol className="mt-12 grid gap-9 md:grid-cols-3 md:gap-10">
          {steps.map(([title, description], i) => (
            <li key={title} className="border-t border-maroon/20 pt-5">
              <span className="font-display text-4xl text-maroon">
                0{i + 1}
              </span>
              <h3 className="mt-4 text-3xl">{title}</h3>
              <p className="mt-3 max-w-xs text-sm leading-7 text-ink/70">
                {description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
