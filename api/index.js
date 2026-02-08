export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

    try {
        const response = await fetch("https://www.zone-turf.fr/arrivees-rapports/", { 
            headers: { 
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/121.0.0.0"
            } 
        });
        const html = await response.text();
        
        // On cherche directement par le nom de l'hippodrome
        const splitVincennes = html.split('Vincennes');
        
        if (splitVincennes.length > 1) {
            // On cherche la Course 9 dans le bloc de Vincennes
            const blocVincennes = splitVincennes[1].substring(0, 3000); 
            const splitC9 = blocVincennes.split('Course 9');

            if (splitC9.length > 1) {
                const blocC9 = splitC9[1].substring(0, 800); 
                const regex = /<span class="num">(\d+)<\/span>/g;
                let match, numeros = [];
                
                while ((match = regex.exec(blocC9)) !== null) {
                    numeros.push(match[1]);
                }

                if (numeros.length > 0) {
                    res.status(200).send("VINCENNES C9: " + numeros.slice(0, 5).join(" - "));
                } else {
                    res.status(200).send("C9: EN ATTENTE");
                }
            } else {
                res.status(200).send("C9 NON TROUVÉE");
            }
        } else {
            res.status(200).send("VINCENNES NON DÉTECTÉ");
        }
    } catch (e) {
        res.status(500).send("ERREUR_LECTURE");
    }
}
