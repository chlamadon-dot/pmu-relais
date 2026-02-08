export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const { url, key } = req.query;
    if (key !== "1234") return res.status(403).send("REFUS");

    try {
        const response = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0 (iPhone; OS 17_0)" } });
        const html = await response.text();
        const numReg = /<span class="num[^>]*>(.*?)<\/span>/g;
        let match, numeros = [];
        while ((match = numReg.exec(html)) !== null) {
            let n = match[1].replace(/<[^>]*>?/gm, '').trim();
            if (n && !isNaN(n)) numeros.push(n);
        }
        res.status(200).send(numeros.slice(0, 5).join(" - ") || "EN ATTENTE");
    } catch (e) {
        res.status(500).send("ERREUR");
    }
}
