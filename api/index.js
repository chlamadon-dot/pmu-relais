export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

    const { url, key } = req.query;
    if (key !== "1234") return res.status(403).send("Clé incorrecte");

    const userAgent = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1";

    try {
        const response = await fetch(url, { headers: { "User-Agent": userAgent } });
        const html = await response.text();

        // RUSE : On cherche les balises qui contiennent les numéros (ex: class="num")
        // Pour ce test, on va renvoyer un extrait propre
        const extraction = html.match(/<span class="num">(.*?)<\/span>/g) || ["Aucune donnée trouvée"];
        
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.status(200).send(extraction.slice(0, 10).join(" - ").replace(/<[^>]*>?/gm, ''));
    } catch (error) {
        res.status(500).send("Erreur d'extraction");
    }
}
