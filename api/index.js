export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const { url, key } = req.query;
    if (key !== "1234") return res.status(403).send("REFUS");

    try {
        const response = await fetch(url, { 
            headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0" } 
        });
        const html = await response.text();
        
        // On cherche TOUT ce qui ressemble à un numéro de cheval (1 à 20)
        // On prend une zone plus large pour être sûr
        const rawNumbers = html.match(/>(\d{1,2})</g) || [];
        const clean = rawNumbers.map(n => n.replace(/[><]/g, '')).filter(n => n > 0 && n <= 20);

        // DEBUG : Si on ne trouve rien de propre, on renvoie les 100 premiers caractères du site
        if (clean.length > 0) {
            res.status(200).send(clean.slice(0, 5).join(" - "));
        } else {
            res.status(200).send("CAPTURED: " + html.substring(0, 20) + "...");
        }
    } catch (e) {
        res.status(500).send("ERREUR SERVEUR: " + e.message);
    }
}
