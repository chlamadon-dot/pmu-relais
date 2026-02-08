export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

    try {
        const response = await fetch("https://www.zone-turf.fr/arrivees-rapports/", { 
            headers: { 
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/121.0.0.0",
                "Accept-Language": "fr-FR,fr;q=0.9"
            } 
        });
        const html = await response.text();
        
        // On cherche le bloc qui contient "Quinté +"
        // On isole la partie du code après la mention Quinté pour être sûr
        const splitHtml = html.split('Quinté +');
        
        if (splitHtml.length > 1) {
            const blocQuinte = splitHtml[1].substring(0, 1000); // On prend les 1000 caractères suivants
            const regex = /<span class="num">(\d+)<\/span>/g;
            let match, numeros = [];
            
            while ((match = regex.exec(blocQuinte)) !== null) {
                numeros.push(match[1]);
            }

            if (numeros.length >= 5) {
                const arrivee = numeros.slice(0, 5).join(" - ");
                res.status(200).send("QUINTÉ: " + arrivee);
            } else {
                res.status(200).send("QUINTÉ: EN ATTENTE");
            }
        } else {
            res.status(200).send("QUINTÉ NON TROUVÉ");
        }
    } catch (e) {
        res.status(500).send("ERREUR_LECTURE");
    }
}
