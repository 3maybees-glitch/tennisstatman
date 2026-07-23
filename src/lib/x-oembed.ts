export type XOEmbed = {
  url: string;
  html: string;
  authorName?: string;
};

type PublishOEmbedResponse = {
  html?: string;
  author_name?: string;
  url?: string;
};

/**
 * Fetch dark-themed oEmbed HTML for a single X/Twitter status URL.
 * Returns null when X won't serve the post (deleted, private, etc.).
 */
export async function fetchXStatusOEmbed(
  statusUrl: string,
): Promise<XOEmbed | null> {
  const endpoint = new URL("https://publish.twitter.com/oembed");
  endpoint.searchParams.set("url", statusUrl);
  endpoint.searchParams.set("theme", "dark");
  endpoint.searchParams.set("dnt", "true");
  endpoint.searchParams.set("omit_script", "true");
  endpoint.searchParams.set("align", "center");

  try {
    const res = await fetch(endpoint, {
      next: { revalidate: 3600 },
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as PublishOEmbedResponse;
    if (!data.html) return null;
    return {
      url: data.url ?? statusUrl,
      html: data.html,
      authorName: data.author_name,
    };
  } catch {
    return null;
  }
}

export async function fetchFeaturedXOEmbeds(
  urls: string[],
): Promise<XOEmbed[]> {
  const results = await Promise.all(urls.map(fetchXStatusOEmbed));
  return results.filter((item): item is XOEmbed => item !== null);
}
