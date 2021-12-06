const jwt = require("jsonwebtoken"); // pour créer des token aléatoires et uniques pour la connexion

// pour protéger les informations de connexion vers la BDD
require("dotenv").config();

module.exports = (req, res, next) => {
  try {
    // récupérer le token dans le header autorisation, le split
    // et récupérer le deuxième élément du tableau renvoyé
    const token = req.headers.authorization.split(" ")[1];
    // décoder le token en le vérifiant
    const decodedToken = jwt.verify(token, process.env.TOKEN);
    const userId = decodedToken.userId;
    // si on a un userId dans le corps de la requête
    // et qu'il est différent du userId = erreur
    if (req.body.userId && req.body.userId !== userId) {
      throw "Identifiant non valide"; //Renvoie l'erreur
    } else { // si tout va bien, suivant
      next();
    }
  } catch (error) {
    // renvoyer une erreur 401, problème d'authentification
    res.status(401).json({ error: error | "Requête non authentifiée" });
  }
};
