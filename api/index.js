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
        
        // 1. On s'assure d'être dans la Réunion 1 (Vincennes)
        const splitR1 = html.split('Réunion 1');
        
        if (splitR1.length > 1) {
            // 2. Dans la R1, on cherche la Course 9
            const blocR1 = splitR1[1].split('Réunion 2')[0]; // On s'arrête avant la R2 pour ne pas mélanger
            const splitC9 = blocR1.split('Course 9');

            if (splitC9.length > 1) {
                const blocC9 = splitC9[1].substring(0, 800); 
                const regex = /<span class="num">(\d+)<\/span>/g;
                let match, numeros = [];
                
                while ((match = regex.exec(blocC9)) !== null) {
                    numeros.push(match[1]);
                }

                if (numeros.length > 0) {
                    const arrivee = numeros.slice(0, 5).join(" - ");
                    res.status(200).send("R1C9: " + arrivee);
                } else {
                    res.status(200).send("R1C9: EN ATTENTE");
                }
            } else {
                res.status(200).send("C9 NON TROUVÉE DANS R1");
            }
        } else {
            res.status(200).send("R1 NON DÉTECTÉE");
        }
    } catch (e) {
        res.status(500).send("ERREUR_LECTURE");
    }
}
