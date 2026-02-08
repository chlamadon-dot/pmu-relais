export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const { url, key } = req.query;
    if (key !== "1234") return res.status(403).send("REFUS");

    try {
        const response = await fetch(url, { 
            headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" } 
        });
        const html = await response.text();
        
        // Cette regex cherche tous les chiffres qui sont isolés ou dans des cercles
        // Elle ignore le texte et ne garde que les suites de 1 ou 2 chiffres
        const regex = />(\d{1,2})</g;
        let match;
        let numeros = [];
        
        while ((match = regex.exec(html)) !== null) {
            let n = parseInt(match[1]);
            // On ne garde que les chiffres logiques pour une course (1 à 22)
            if (n > 0 && n <= 22) {
                numeros.push(n);
            }
        }

        // On enlève les doublons et on prend les 5 premiers
        const uniqueNumeros = [...new Set(numeros)].slice(0, 5);
        
        if (uniqueNumeros.length >= 5) {
            res.status(200).send(uniqueNumeros.join(" - "));
        } else {
            res.status(200).send("RECHERCHE FLUX...");
        }
    } catch (e) {
        res.status(500).send("ERREUR");
    }
}
