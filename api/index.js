export default async function handler(req, res) {
    // AUTORISATIONS TOTALES (CORS)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Réponse immédiate pour le test
    const numTest = "12 - 5 - 1 - 18 - 4"; 
    
    // On force le format texte pour être sûr que le PC le lise
    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send(numTest);
}
