// je fais mes imports
  // pour créer des applis web avec Node
const express = require("express");
  // pour faciliter les inéractions avec la bdd mongoDB
const mongoose = require("mongoose");

// je fais appel au module Express avec sa fonction
// le mot-clé app fait souvent référence au module express
// on peut utiliser un autre nom, mais c'est la convention
const app = express();

// je me connecte à la BDD
mongoose.connect('mongodb+srv://new-user:<pwd>@cluster0.m31ja.mongodb.net/test?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// je récupère le body en front sur l'objet request
// remplace body-parser et analyse donc le corps de la requête
app.use(express.json());

// j'exporte ce module pour pouvoir le réutiliser ailleurs
module.exports = app;

// Avant la route d'API, on ajoute la fonction (middleware) des headers permettant
// aux deux ports front et end de communiquer entre eux
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // "*" permet d'accéder a l'API depuis n'importe quelle origine
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  ); // autorisation d'utiliser certains headers sur l'objet requête
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  ); // permet d'envoyer des requêtes avec ces méthodes
  next(); // passe l'exécution au middleware suivant
});