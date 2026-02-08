export default async function handler(req, res) {
    // Autorisations de sécurité pour ton PC
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

    try {
        // On interroge la page des arrivées
        const response = await fetch("https://www.zone-turf.fr/arrivees-rapports/", { 
            headers: { 
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/121.0.0.0",
                "Accept-Language": "fr-FR,fr;q=0.9"
            } 
        });
        const html = await response.text();
        
        // Extraction des numéros (balises class="num")
        const regex = /<span class="num">(\d+)<\/span>/g;
        let match, numeros = [];
        
        while ((match = regex.exec(html)) !== null) {
            numeros.push(match[1]);
        }

        // On prend les 5 premiers numéros détectés
        if (numeros.length > 0) {
            const arrivee = numeros.slice(0, 5).join(" - ");
            res.status(200).send(arrivee);
        } else {
            // Si aucune course n'est publiée, on garde le serveur en éveil
            res.status(200).send("EN ATTENTE");
        }
    } catch (e) {
        res.status(500).send("ERREUR_LECTURE");
    }
}
