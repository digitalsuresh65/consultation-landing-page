import { Check } from "lucide-react";
const items = [
  "Get clarity on your design, before you commit to anything",
  "Know your price upfront, in writing",
  "Get expert advice on the best fitting for your body and your outfit",
  "Save time — no need to visit multiple boutiques",
  "Walk away with a clear plan, not more confusion",
];
export default function Benefits() {
  return (
    <section className="py-20 sm:py-28">
      <div className="section-wrap grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <span aria-hidden="true" className="mb-6 block h-px w-14 bg-gold" />
          <h2 className="section-title max-w-md">
            How you benefit from this{" "}
            <span className="italic text-maroon">consultation</span>
          </h2>
        </div>
        <ul className="space-y-6">
          {items.map((item) => (
            <li key={item} className="flex gap-4">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-maroon/10">
                <Check aria-hidden="true" className="h-4 w-4 text-maroon" />
              </span>
              <span className="text-base leading-7 sm:text-lg">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
