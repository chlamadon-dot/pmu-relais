export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

    try {
        const response = await fetch("https://www.zone-turf.fr/arrivees-rapports/", { 
            headers: { "User-Agent": "Mozilla/5.0" } 
        });
        const html = await response.text();
        
        // On cherche toutes les suites de numéros dans les balises <span class="num">
        const regex = /<span class="num">(\d+)<\/span>/g;
        let match, numeros = [];
        
        while ((match = regex.exec(html)) !== null) {
            numeros.push(match[1]);
        }

        if (numeros.length >= 3) {
            // Affiche les 5 premiers numéros détectés sur la page
            const arrivee = numeros.slice(0, 5).join(" - ");
            res.status(200).send("DERNIÈRE ARRIVÉE: " + arrivee);
        } else {
            res.status(200).send("EN ATTENTE DE FLUX...");
        }
    } catch (e) {
        res.status(500).send("ERREUR_LECTURE");
    }
}
