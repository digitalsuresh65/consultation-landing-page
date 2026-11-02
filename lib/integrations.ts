export function youtubeEmbed(value: string | undefined): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    if (
      url.protocol !== "https:" ||
      ![
        "youtu.be",
        "youtube.com",
        "www.youtube.com",
        "youtube-nocookie.com",
        "www.youtube-nocookie.com",
      ].includes(url.hostname)
    )
      return null;
    const parts = url.pathname.split("/").filter(Boolean);
    const id = url.hostname === "youtu.be"
      ? parts[0]
      : parts[0] === "embed" || parts[0] === "shorts"
        ? parts[1]
        : url.searchParams.get("v");
    if (!id || !/^[a-zA-Z0-9_-]{11}$/.test(id)) return null;
    const embed = new URL(`https://www.youtube-nocookie.com/embed/${id}`);
    embed.searchParams.set("rel", "0");
    return embed.toString();
  } catch {
    return null;
  }
}
export function whatsappLink(value: string | undefined): string | null {
  if (!value || !/^\+?[1-9]\d{6,14}$/.test(value.trim())) return null;
  return `https://wa.me/${value.trim().replace(/^\+/, "")}?text=${encodeURIComponent("Hi, I just submitted the form for the Free Boutique Consultation")}`;
}
