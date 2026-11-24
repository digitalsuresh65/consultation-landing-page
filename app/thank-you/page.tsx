import ReceiptConfirmation from "@/components/ReceiptConfirmation";
import { Check, MessageCircle } from "lucide-react";
import { whatsappLink, youtubeEmbed } from "@/lib/integrations";

const video = youtubeEmbed("https://www.youtube.com/watch?v=N2i5ivVb7Tw");
const whatsappNumber = "9779851074355";
const whatsapp = whatsappLink(whatsappNumber);

export default function ThankYou() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#fffaf0] px-3 py-5 sm:px-5 sm:py-8">
      <section className="w-full max-w-[860px] rounded-[44px] border-2 border-[#f0d88d] bg-white px-5 py-6 text-center shadow-[16px_18px_0_#fff0c2] sm:px-12 sm:py-14">
        <div
          aria-hidden="true"
          className="mx-auto flex h-16 w-16 items-center justify-center rounded-[24px] bg-[#ffc52e] text-ink shadow-sm sm:h-24 sm:w-24"
        >
          <Check className="h-8 w-8 sm:h-12 sm:w-12" strokeWidth={2.5} />
        </div>
        <h1 className="mt-4 font-body text-4xl font-extrabold tracking-tight text-[#111111] sm:mt-4 sm:text-[52px]">
          Thank You!
        </h1>
        <ReceiptConfirmation />

        <div className="my-8 h-px bg-[#f1d899]" />

        <p className="text-base font-extrabold uppercase tracking-[0.15em] text-[#a27300] sm:text-lg">
          Before You Go
        </p>
        <h2 className="mt-2 font-body text-3xl font-extrabold leading-tight tracking-tight text-[#111111] sm:text-4xl">
          Watch This Video
        </h2>
        <p className="mx-auto mt-2 max-w-[640px] text-base leading-[1.6] text-[#62616a] sm:text-lg">
          Watch this short video to understand what happens next and how to
          prepare for your consultation.
        </p>

        <div className="mt-6 overflow-hidden rounded-2xl border-2 border-[#3b3938] shadow-[0_12px_28px_rgba(0,0,0,0.18)]">
          <iframe
            src={video ?? undefined}
            title="A&A Fashion Boutique consultation video"
            className="aspect-video w-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>

        <section className="mt-6 rounded-2xl border-2 border-[#a9e6bb] bg-[#effcf3] px-4 py-7 sm:px-8 sm:py-7">
          <div
            aria-hidden="true"
            className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#58d26e] text-[#176b35] sm:h-16 sm:w-16"
          >
            <MessageCircle className="h-6 w-6 sm:h-8 sm:w-8" />
          </div>
          <h2 className="mt-4 font-body text-xl font-extrabold text-[#163a24] sm:text-2xl">
            Connect With Us on WhatsApp
          </h2>
          <p className="mx-auto mt-3 max-w-[600px] text-sm leading-[1.65] text-[#42634c] sm:text-base">
            Have a question about your consultation or want to discuss your
            business goals? Send me a message directly on WhatsApp.
          </p>
          <a
            className="mt-4 inline-flex min-h-14 items-center justify-center gap-2 rounded-xl bg-[#20853b] px-4 py-3 text-sm font-bold text-white shadow-[0_6px_16px_rgba(19,97,43,0.2)] transition hover:bg-[#176b30] sm:min-h-[72px] sm:gap-3 sm:px-6 sm:py-4 sm:text-lg"
            href={whatsapp ?? undefined}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle aria-hidden="true" className="h-5 w-5 sm:h-6 sm:w-6" />
            Connect With Us on WhatsApp
          </a>
          <p className="mt-3 text-sm font-medium text-[#42634c] sm:text-base">
            +{whatsappNumber.slice(0, 3)} {whatsappNumber.slice(3, 6)}
            {whatsappNumber.slice(6, 9)} {whatsappNumber.slice(9)}
          </p>
        </section>
      </section>
    </main>
  );
}
