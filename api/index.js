export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

    try {
        // Le paramètre ?v= force le rafraîchissement réel de la page
        const response = await fetch("https://www.zone-turf.fr/arrivees-rapports/?v=" + Date.now(), { 
            headers: { "User-Agent": "Mozilla/5.0" } 
        });
        const html = await response.text();
        
        // Cette regex magique cherche soit les balises "num", soit le texte "officiels :"
        const regex = /(?:officiels\s*:\s*|num">)(\d+(?:\s*-\s*\d+)*)/gi;
        let matches = [];
        let match;
        
        while ((match = regex.exec(html)) !== null) {
            // On nettoie les espaces et on garde la séquence de chiffres
            matches.push(match[1].replace(/\s+/g, '').replace(/-/g, ' - '));
        }

        if (matches.length > 0) {
            // On affiche la toute première arrivée (la plus récente)
            res.status(200).send("ARRIVÉE : " + matches[0]);
        } else {
            res.status(200).send("SCAN EN COURS...");
        }
    } catch (e) {
        res.status(500).send("ERREUR_LECTURE");
    }
}
