export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const { url, key } = req.query;
    if (key !== "1234") return res.status(403).send("REFUS");

    try {
        const response = await fetch(url, { 
            headers: { 
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
                "Accept-Language": "fr,fr-FR;q=0.8,en-US;q=0.5,en;q=0.3",
                "Referer": "https://www.google.com/"
            } 
        });
        const html = await response.text();
        
        // On cherche les numéros dans le code source
        const regex = /<span class="num">(\d+)<\/span>/g;
        let match, numeros = [];
        while ((match = regex.exec(html)) !== null) {
            numeros.push(match[1]);
        }

        if (numeros.length > 0) {
            res.status(200).send(numeros.slice(0, 5).join(" - "));
        } else {
            // DEBUG : Si on ne trouve rien, on renvoie les 50 premiers caractères pour voir si c'est encore vide
            res.status(200).send("SOURCE: " + html.substring(0, 50).replace(/[<>]/g, ''));
        }
    } catch (e) {
        res.status(500).send("ERREUR");
    }
}
