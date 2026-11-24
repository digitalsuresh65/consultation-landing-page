import ReceiptConfirmation from "@/components/ReceiptConfirmation";
import { Check, MessageCircle } from "lucide-react";
import { whatsappLink, youtubeEmbed } from "@/lib/integrations";

const video = youtubeEmbed("https://www.youtube.com/watch?v=N2i5ivVb7Tw");
const whatsappNumber = "9779851074355";
const whatsapp = whatsappLink(whatsappNumber);

export default function ThankYou() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#fffaf0] px-3 py-5 sm:px-5 sm:py-8">
      <section className="w-full max-w-[430px] rounded-[22px] border border-[#f0d88d] bg-white px-5 py-6 text-center shadow-[8px_9px_0_#fff0c2] sm:px-6 sm:py-7">
        <div
          aria-hidden="true"
          className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ffc52e] text-ink shadow-sm"
        >
          <Check className="h-6 w-6" strokeWidth={2.5} />
        </div>
        <h1 className="mt-2 font-body text-2xl font-extrabold tracking-tight text-[#111111] sm:text-[26px]">
          Thank You!
        </h1>
        <ReceiptConfirmation />

        <div className="my-4 h-px bg-[#f1d899]" />

        <p className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-[#a27300]">
          Before You Go
        </p>
        <h2 className="mt-1 font-body text-lg font-extrabold leading-tight tracking-tight text-[#111111]">
          Watch This Video
        </h2>
        <p className="mx-auto mt-1 max-w-[320px] text-[10px] leading-[1.6] text-[#62616a]">
          Watch this short video to understand what happens next and how to
          prepare for your consultation.
        </p>

        <div className="mt-3 overflow-hidden rounded-xl border border-[#3b3938] shadow-[0_6px_14px_rgba(0,0,0,0.18)]">
          <iframe
            src={video ?? undefined}
            title="A&A Fashion Boutique consultation video"
            className="aspect-video w-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>

        <section className="mt-3 rounded-xl border border-[#a9e6bb] bg-[#effcf3] px-4 py-3.5">
          <div
            aria-hidden="true"
            className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-[#58d26e] text-[#176b35]"
          >
            <MessageCircle className="h-4 w-4" />
          </div>
          <h2 className="mt-2 font-body text-xs font-extrabold text-[#163a24]">
            Connect With Me on WhatsApp
          </h2>
          <p className="mx-auto mt-1.5 max-w-[300px] text-[9px] leading-[1.65] text-[#42634c]">
            Have a question about your consultation or want to discuss your
            business goals? Send me a message directly on WhatsApp.
          </p>
          <a
            className="mt-2 inline-flex min-h-9 items-center justify-center gap-1.5 rounded-lg bg-[#20853b] px-3 py-2 text-[9px] font-bold text-white shadow-[0_3px_8px_rgba(19,97,43,0.2)] transition hover:bg-[#176b30]"
            href={whatsapp ?? undefined}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle aria-hidden="true" className="h-3 w-3" />
            Connect With Me on WhatsApp
          </a>
          <p className="mt-1.5 text-[8px] font-medium text-[#42634c]">
            +{whatsappNumber.slice(0, 3)} {whatsappNumber.slice(3, 6)}
            {whatsappNumber.slice(6, 9)} {whatsappNumber.slice(9)}
          </p>
        </section>
      </section>
    </main>
  );
}
