export default async function handler(req, res) {
    // Autorise ton fichier HTML local à communiquer avec Vercel
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

    try {
        // Le paramètre ?v= force le rafraîchissement réel pour éviter le cache
        const response = await fetch("https://www.zone-turf.fr/arrivees-rapports/?v=" + Date.now(), { 
            headers: { "User-Agent": "Mozilla/5.0" } 
        });
        const html = await response.text();
        
        // Cette regex capture les numéros dans les balises classiques OU après "officiels :"
        const regex = /(?:officiels\s*:\s*|num">)(\d+(?:\s*-\s*\d+)*)/gi;
        let matches = [];
        let match;
        
        while ((match = regex.exec(html)) !== null) {
            // Nettoyage pour un affichage propre : "8 - 11 - 5..."
            let clean = match[1].replace(/\s+/g, '').replace(/-/g, ' - ');
            matches.push(clean);
        }

        if (matches.length > 0) {
            // Renvoie la toute première arrivée (la plus récente en haut de page)
            res.status(200).send("ARRIVÉE : " + matches[0]);
        } else {
            res.status(200).send("RECHERCHE DE FLUX...");
        }
    } catch (e) {
        res.status(500).send("ERREUR_LECTURE");
    }
}
