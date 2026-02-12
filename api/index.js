export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

    try {
        const response = await fetch("https://www.zone-turf.fr/arrivees-rapports/?v=" + Date.now(), { 
            headers: { "User-Agent": "Mozilla/5.0" } 
        });
        const html = await response.text();

        // IMPORTANT : le ( ... ) ici → match[1]
        const regex = /(?:officiels\s*:\s*|num[^>]*>)(\d+(?:\s*-\s*\d+)*)/gi;
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
