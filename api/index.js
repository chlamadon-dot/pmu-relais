export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

    try {
        const response = await fetch("https://www.zone-turf.fr/arrivees-rapports/?v=" + Date.now(), { 
            headers: { "User-Agent": "Mozilla/5.0" } 
        });
        const html = await response.text();

        // Capture TOUTES les séquences de type "8 - 11 - 5" ou "8-11-5"
        const regex = /(\d{1,2}(?:\s*-\s*\d{1,2}){1,5})/g;

        let matches = [];
        let match;

        while ((match = regex.exec(html)) !== null) {
            let clean = match[1]
                .replace(/\s+/g, '')
                .replace(/-/g, ' - ');
            matches.push(clean);
        }

        if (matches.length > 0) {
            res.status(200).send("ARRIVÉE : " + matches[0]);
        } else {
            res.status(200).send("RECHERCHE DE FLUX...");
        }

    } catch (e) {
        res.status(500).send("ERREUR_LECTURE");
    }
}
