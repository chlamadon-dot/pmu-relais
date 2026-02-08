export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

    const { url, key } = req.query;
    if (key !== "1234") return res.status(403).send("CLÉ INCORRECTE");

    const userAgent = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1";

    try {
        const response = await fetch(url, { headers: { "User-Agent": userAgent } });
        const html = await response.text();

        // Extraction précise des numéros de l'arrivée
        const numReg = /<span class="num">(.*?)<\/span>/g;
        let match;
        let numeros = [];
        while ((match = numReg.exec(html)) !== null) {
            numeros.push(match[1]);
        }

        // On prend les 5 premiers numéros et on les sépare par des tirets
        const resultat = numeros.slice(0, 5).join(" - ");
        
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.status(200).send(resultat || "AUCUNE ARRIVÉE DISPONIBLE");
    } catch (e) {
        res.status(500).send("ERREUR DE CONNEXION AU SITE");
    }
}
