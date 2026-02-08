export default async function handler(req, res) {
    // Force l'acceptation de la connexion depuis ton PC
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    
    // Message de test ultra-simple
    res.status(200).send("CONNEXION_OK");
}
