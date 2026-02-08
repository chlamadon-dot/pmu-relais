export default async function handler(req, res) {
    // Autoriser la connexion depuis ton fichier local
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

    // On simule une réponse immédiate avec des numéros de test
    // Cela permet de vérifier que ton tableau de bord reçoit bien les données
    const numTest = "12 - 5 - 1 - 18 - 4"; 
    
    // On envoie la réponse en texte brut
    res.status(200).send(numTest);
}
