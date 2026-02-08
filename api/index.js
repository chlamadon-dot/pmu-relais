export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

    const { url, key } = req.query;
    if (key !== "1234") return res.status(403).send("CLÉ REQUISE");

    const userAgent = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1";

    try {
        const response = await fetch(url, { headers: { "User-Agent": userAgent } });
        const html = await response.text();

        // RECHERCHE LARGE : On cherche les numéros dans plusieurs formats possibles
        // Cette regex capture les numéros classiques et ceux dans les cercles
        const numReg = /<span class="num[^>]*>(.*?)<\/span>/g;
        let match;
        let numeros = [];
        
        while ((match = numReg.exec(html)) !== null) {
            let n = match[1].replace(/<[^>]*>?/gm, '').trim(); // Nettoyage HTML
            if (n && !isNaN(n)) numeros.push(n);
        }

        // Si la première méthode échoue, on tente une recherche brute
        if (numeros.length === 0) {
            const bruteReg = /class="number">(.*?)<\/div>/g;
            while ((match = bruteReg.exec(html)) !== null) {
                let n = match[1].trim();
                if (n && !isNaN(n)) numeros.push(n);
            }
        }

        // On affiche les 5 premiers numéros (l'arrivée la plus fraîche)
        const final = numeros.slice(0, 5).join(" - ");
        
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.status(200).send(final || "COURSE EN COURS...");
    } catch (e) {
        res.status(500).send("ERREUR RÉSEAU");
    }
}
