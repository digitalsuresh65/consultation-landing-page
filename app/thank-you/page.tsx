import Header from "@/components/Header";
import ReceiptConfirmation from "@/components/ReceiptConfirmation";
import { MessageCircle } from "lucide-react";
import { whatsappLink, youtubeEmbed } from "@/lib/integrations";

const video = youtubeEmbed("https://youtu.be/QhzArGq7zfM");
const whatsapp = whatsappLink("9779841591833");

export default function ThankYou() {
  return (
    <>
      <Header />
      <main className="hero-glow min-h-[80vh] px-5 pb-20 pt-14 text-center sm:pt-20">
        <div className="mx-auto max-w-3xl">
          <span aria-hidden="true" className="text-3xl text-gold">
            ✧
          </span>
          <h1 className="mt-5 font-display text-6xl text-maroon sm:text-7xl">
            Thank You!
          </h1>
          <ReceiptConfirmation />
          <div className="mt-10 overflow-hidden rounded-2xl">
            <iframe
              src={video ?? undefined}
              title="A&A Fashion Boutique consultation video"
              className="aspect-video w-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
          <a
            className="mt-8 inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-whatsapp px-7 py-4 text-sm font-semibold text-white transition hover:brightness-90"
            href={whatsapp ?? undefined}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle aria-hidden="true" className="h-5 w-5" />
            Message Us on WhatsApp
          </a>
        </div>
      </main>
    </>
  );
}
