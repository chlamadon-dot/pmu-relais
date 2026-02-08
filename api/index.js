export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

    try {
        // On ajoute un paramètre aléatoire à l'URL pour forcer la mise à jour (anti-cache)
        const response = await fetch("https://www.zone-turf.fr/arrivees-rapports/?cache=" + Date.now(), { 
            headers: { 
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/121.0.0.0"
            } 
        });
        const html = await response.text();
        
        // Extraction de TOUS les numéros d'arrivée présents sur la page
        const regex = /<span class="num">(\d+)<\/span>/g;
        let match, numeros = [];
        
        while ((match = regex.exec(html)) !== null) {
            numeros.push(match[1]);
        }

        if (numeros.length > 0) {
            // On prend les 5 premiers numéros (la course la plus récente)
            const arrivee = numeros.slice(0, 5).join(" - ");
            res.status(200).send("ARRIVÉE : " + arrivee);
        } else {
            res.status(200).send("EN ATTENTE DE PUBLICATION...");
        }
    } catch (e) {
        res.status(500).send("ERREUR_SERVEUR");
    }
}
