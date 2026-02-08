export default async function handler(req, res) {
    const { url, key } = req.query;
    if (key !== "1234") {
        return res.status(403).send("Accès refusé");
    }
    const agents = [
        "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1",
        "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1",
        "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1"
    ];
    const agentAleatoire = agents[Math.floor(Math.random() * agents.length)];
    try {
        const response = await fetch(url, {
            headers: {
                "User-Agent": agentAleatoire,
                "Accept": "text/html",
                "Accept-Language": "fr-FR,fr;q=0.9",
                "Referer": "https://www.google.com/" 
            }
        });
        const data = await response.text();
        res.setHeader('Content-Type', 'text/html');
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send("Erreur de connexion au serveur PMU");
    }
}
