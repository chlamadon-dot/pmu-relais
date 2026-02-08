// Variable hors du handler pour garder une trace en mémoire (cache serveur)
let archiveC9 = null;

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

    // Si on a déjà trouvé l'arrivée, on renvoie l'archive directement
    if (archiveC9) {
        return res.status(200).send("ARCHIVE C9: " + archiveC9);
    }

    try {
        const response = await fetch("https://www.zone-turf.fr/arrivees-rapports/", { 
            headers: { "User-Agent": "Mozilla/5.0" } 
        });
        const html = await response.text();
        
        const splitC9 = html.split('Course 9');
        
        if (splitC9.length > 1) {
            const blocC9 = splitC9[1].substring(0, 1000); 
            const regex = /<span class="num">(\d+)<\/span>/g;
            let match, numeros = [];
            
            while ((match = regex.exec(blocC9)) !== null) {
                numeros.push(match[1]);
            }

            if (numeros.length >= 3) {
                archiveC9 = numeros.slice(0, 5).join(" - "); // On archive ici
                res.status(200).send("C9: " + archiveC9);
            } else {
                res.status(200).send("C9: EN ATTENTE");
            }
        } else {
            res.status(200).send("C9 NON TROUVÉE");
        }
    } catch (e) {
        res.status(500).send("ERREUR_LECTURE");
    }
}
