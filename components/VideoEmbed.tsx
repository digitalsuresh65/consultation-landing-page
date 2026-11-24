"use client";

import { useState } from "react";
import { Play } from "lucide-react";

type VideoEmbedProps = {
  embedUrl: string;
  thumbnailUrl: string;
};

export default function VideoEmbed({ embedUrl, thumbnailUrl }: VideoEmbedProps) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    const autoplayUrl = new URL(embedUrl);
    autoplayUrl.searchParams.set("autoplay", "1");

    return (
      <iframe
        src={autoplayUrl.toString()}
        title="A&A Fashion Boutique consultation video"
        className="absolute inset-0 h-full w-full border-0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label="Play A&A Fashion Boutique consultation video"
      className="group absolute inset-0 block h-full w-full overflow-hidden bg-black"
    >
      <img
        src={thumbnailUrl}
        alt=""
        className="h-full w-full object-cover"
      />
      <span className="absolute inset-0 flex items-center justify-center bg-black/10 transition-colors group-hover:bg-black/20">
        <span className="flex h-12 w-[68px] items-center justify-center rounded-xl bg-[#ff0033] text-white shadow-lg transition-transform group-hover:scale-110 sm:h-14 sm:w-[78px]">
          <Play className="h-6 w-6 fill-current sm:h-7 sm:w-7" />
        </span>
      </span>
    </button>
  );
}
