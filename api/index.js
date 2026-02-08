export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const { url, key } = req.query;
    if (key !== "1234") return res.status(403).send("REFUS");

    try {
        const response = await fetch(url, { 
            headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" } 
        });
        const html = await response.text();
        
        // On cherche TOUS les nombres entre 1 et 20 situés dans les zones d'arrivée
        const regex = /<span class="num[^>]*>(\d+)<\/span>|(\d+)<\/span><\/li>/g;
        let match, numeros = [];
        
        while ((match = regex.exec(html)) !== null) {
            let n = match[1] || match[2];
            if (n) numeros.push(n);
        }

        // Si on a des numéros, on les affiche. Sinon, message d'attente.
        const resultat = numeros.length > 0 ? numeros.slice(0, 5).join(" - ") : "EN ATTENTE";
        res.status(200).send(resultat);
    } catch (e) {
        res.status(500).send("ERREUR RÉSEAU");
    }
}
