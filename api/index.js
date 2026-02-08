export default async function handler(req, res) {
    // Autorise ton téléphone à lire les données sans blocage de sécurité
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

    const { url, key } = req.query;

    // Vérification de ta clé de sécurité
    if (key !== "1234") {
        return res.status(403).send("Clé incorrecte");
    }

    // Identité iPhone pour contourner les blocages
    const userAgent = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1";

    try {
        const response = await fetch(url, {
            headers: { 
                "User-Agent": userAgent,
                "Referer": "https://www.google.com/" 
            }
        });

        const data = await response.text();
        res.setHeader('Content-Type', 'text/html');
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send("Erreur de connexion");
    }
}
