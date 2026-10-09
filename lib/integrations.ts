export function vimeoEmbed(value: string | undefined): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    if (
      url.protocol !== "https:" ||
      !["vimeo.com", "www.vimeo.com", "player.vimeo.com"].includes(url.hostname)
    )
      return null;
    const parts = url.pathname.split("/").filter(Boolean);
    const id =
      url.hostname === "player.vimeo.com" && parts[0] === "video"
        ? parts[1]
        : parts[0];
    if (!id || !/^\d+$/.test(id)) return null;
    const embed = new URL(`https://player.vimeo.com/video/${id}`);
    const hash =
      url.searchParams.get("h") ||
      (url.hostname !== "player.vimeo.com" ? parts[1] : undefined);
    if (hash && /^[a-zA-Z0-9]+$/.test(hash)) embed.searchParams.set("h", hash);
    embed.searchParams.set("autoplay", "0");
    embed.searchParams.set("dnt", "1");
    return embed.toString();
  } catch {
    return null;
  }
}
export function whatsappLink(value: string | undefined): string | null {
  if (!value || !/^\+?[1-9]\d{6,14}$/.test(value.trim())) return null;
  return `https://wa.me/${value.trim().replace(/^\+/, "")}?text=${encodeURIComponent("Hi, I just submitted the form for the Free Boutique Consultation")}`;
}
