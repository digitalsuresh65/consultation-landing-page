import Header from "@/components/Header";
import { MessageCircle, Play } from "lucide-react";
import { vimeoEmbed, whatsappLink } from "@/lib/integrations";
export default async function ThankYou({
  searchParams,
}: {
  searchParams: Promise<{ name?: string; demo?: string }>;
}) {
  const params = await searchParams;
  const name =
    typeof params.name === "string" ? params.name.trim().slice(0, 60) : "";
  const demo = params.demo === "1";
  const video = vimeoEmbed(process.env.NEXT_PUBLIC_VIMEO_URL);
  const whatsapp = whatsappLink(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER);
  return (
    <>
      <Header />
      <main className="hero-glow min-h-[80vh] px-5 pb-20 pt-14 text-center sm:pt-20">
        <div className="mx-auto max-w-3xl">
          <span aria-hidden="true" className="text-3xl text-gold">
            ✧
          </span>
          <h1 className="mt-5 font-display text-6xl text-maroon sm:text-7xl">
            Thank You{name ? `, ${name}` : ""}!
          </h1>
          {demo ? (
            <>
              <p className="mt-6 text-xl">
                Your consultation request has been received in this demo.
              </p>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-ink/70">
                This is a simulated confirmation. No request was sent or saved,
                and no team follow-up is scheduled.
              </p>
            </>
          ) : (
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8">
              No consultation request has been submitted on this page.
            </p>
          )}
          <div className="mt-10 overflow-hidden rounded-2xl">
            {video ? (
              <iframe
                src={video}
                title="A&A Fashion Boutique consultation video"
                className="aspect-video w-full border-0"
                allow="fullscreen; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="flex aspect-video flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-maroon/25 bg-cream-card px-6">
                <Play aria-hidden="true" className="h-8 w-8 text-gold" />
                <p className="max-w-xs text-sm leading-6 text-ink/65">
                  Video will appear here once a Vimeo URL is added
                </p>
              </div>
            )}
          </div>
          {whatsapp ? (
            <a
              className="mt-8 inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-whatsapp px-7 py-4 text-sm font-semibold text-white transition hover:brightness-90"
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle aria-hidden="true" className="h-5 w-5" />
              Message Us on WhatsApp
            </a>
          ) : (
            <div className="mx-auto mt-8 max-w-md rounded-xl border border-dashed border-maroon/25 p-5 text-sm leading-6 text-ink/65">
              Message Us on WhatsApp
              <br />
              <span className="text-xs">
                WhatsApp messaging will be available once a number is added.
              </span>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
