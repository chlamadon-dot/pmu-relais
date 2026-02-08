export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const { url, key } = req.query;
    if (key !== "1234") return res.status(403).send("REFUS");

    try {
        const response = await fetch(url, { 
            headers: { "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0)" } 
        });
        const html = await response.text();
        
        // Nouvelle méthode : on cherche les numéros dans les cercles d'arrivée (class="num")
        // et on nettoie tout le texte autour pour ne garder que les chiffres purs.
        const matches = html.match(/<span class="num">(\d+)<\/span>/g);
        
        if (matches) {
            const numeros = matches.map(m => m.replace(/\D/g, '')).slice(0, 5);
            res.status(200).send(numeros.join(" - "));
        } else {
            // Si pas de balises spéciales, on cherche les premiers chiffres isolés
            res.status(200).send("VÉRIFICATION EN COURS...");
        }
    } catch (e) {
        res.status(500).send("ERREUR LECTURE");
    }
}
