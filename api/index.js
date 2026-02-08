export default async function handler(req, res) {
    // Autorisations de sécurité totales pour éviter les blocages PC
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');

    // On envoie uniquement les chiffres, rien d'autre
    res.status(200).send("12 - 5 - 1 - 18 - 4");
}
