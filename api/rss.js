export default async function handler(req, res) {
  try {
    const url = req.query.url;
    if (!url) {
      return res.status(400).json({ error: "Missing ?url=" });
    }

    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept": "*/*"
      }
    });

    const text = await response.text();

    res.setHeader("Content-Type", "application/xml; charset=utf-8");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).send(text);

  } catch (e) {
    res.status(500).json({ error: "Proxy error", details: e.toString() });
  }
}
