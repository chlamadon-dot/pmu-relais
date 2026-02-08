export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const { url, key } = req.query;
    if (key !== "1234") return res.status(403).send("REFUS");

    try {
        const response = await fetch(url, { 
            headers: { "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15" } 
        });
        const html = await response.text();
        
        // On capture TOUS les nombres entre 1 et 20 entourés de balises HTML
        const allNumbers = html.match(/>(\d{1,2})</g);
        
        if (allNumbers) {
            // On nettoie les symboles ">" et "<" pour ne garder que les chiffres
            const clean = allNumbers.map(n => n.replace(/[><]/g, '')).filter(n => n > 0 && n <= 20);
            // On prend les 5 premiers qui se suivent (souvent l'arrivée)
            const resultat = clean.slice(0, 5).join(" - ");
            res.status(200).send(resultat || "AUCUN CHIFFRE");
        } else {
            res.status(200).send("PAGE VIDE");
        }
    } catch (e) {
        res.status(500).send("ERREUR");
    }
}
