import fetch from "node-fetch";
import * as cheerio from "cheerio";

export default async function handler(req, res) {
  const { movie_id } = req.query;

  if (!movie_id) {
    return res.status(400).json({ error: "Missing movie_id" });
  }

  const url = `https://www.imdb.com/title/${movie_id}/`;
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      },
      timeout: 10000,
    });

    if (!response.ok) {
      return res
        .status(500)
        .json({ error: `Failed to fetch IMDb: ${response.statusText}` });
    }

    const html = await response.text();
    const $ = cheerio.load(html);
    const platforms = [];

    const container = $('[data-testid="shoveler-items-container"]');
    if (container.length) {
      container.find(".ipc-sub-grid-item").each((_, el) => {
        const label =
          $(el).find('[data-testid="tm-box-woc-text"]').text().trim() || null;
        const img = $(el).find("img.ipc-image");
        const platform = img.attr("alt") || null;
        const image = img.attr("src") || null;
        const linkTag = $(el).find("a.ipc-lockup-overlay");
        const link = linkTag.length
          ? `https://www.imdb.com${linkTag.attr("href")}`
          : null;

        platforms.push({ label, platform, image, link });
      });
    }

    return res.status(200).json({ movie_id, platforms });
  } catch (e) {
    return res
      .status(500)
      .json({ error: `Failed to fetch IMDb: ${e.message}` });
  }
}
