export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

    try {
        const response = await fetch("https://www.zone-turf.fr/arrivees-rapports/", { 
            headers: { "User-Agent": "Mozilla/5.0" } 
        });
        const html = await response.text();
        
        // On cherche le bloc "Course 9" sans se soucier de l'hippodrome
        const splitC9 = html.split('Course 9');
        
        if (splitC9.length > 1) {
            // On prend les numéros juste après la mention "Course 9"
            const blocC9 = splitC9[1].substring(0, 1000); 
            const regex = /<span class="num">(\d+)<\/span>/g;
            let match, numeros = [];
            
            while ((match = regex.exec(blocC9)) !== null) {
                numeros.push(match[1]);
            }

            if (numeros.length >= 3) {
                const arrivee = numeros.slice(0, 5).join(" - ");
                res.status(200).send("COURSE 9: " + arrivee);
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
