// je fais mes imports
const express = require("express");

// je fais appel au module Express avec sa fonction
// le mot-clé app fait souvent référence au module express
// on peut utiliser un autre nom, mais c'est la convention
const app = express();

// j'exporte ce module pour pouvoir le réutiliser ailleurs
module.exports = app;

// Avant la route d'API, on ajoute la fonction (middleware) des headers permettant
// aux deux ports front et end de communiquer entre eux
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); //Permet d'accéder a l'API depuis n'importe quelle origine
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  ); //Donne l'autorisation d'utiliser certains headers sur l'objet requête
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  ); //Permet d'envoyer des requêtes avec ces méthodes
  next(); // Passe l'exécution au middleware suivant
});

// je récupère le body en front sur l'objet request
// remplace body-parser et analyse donc le corps de la requête
app.use(express.json());
