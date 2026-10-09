import { CircleHelp } from "lucide-react";
const items = [
  "Worried the fitting won't be right.",
  "Unsure what the final price will be.",
  "Afraid the design won't match what you imagined.",
  "Worried your outfit won't be ready on time.",
];
export default function Problem() {
  return (
    <section className="bg-cream-deep/65 py-16 sm:py-20">
      <div className="section-wrap grid gap-9 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <h2 className="section-title max-w-sm">
          Does this sound <span className="italic text-maroon">familiar?</span>
        </h2>
        <ul className="divide-y divide-maroon/15">
          {items.map((item) => (
            <li
              key={item}
              className="flex items-start gap-4 py-5 first:pt-0 last:pb-0"
            >
              <CircleHelp
                aria-hidden="true"
                className="mt-0.5 h-5 w-5 shrink-0 text-maroon/65"
              />
              <span className="text-base leading-7 sm:text-lg">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
