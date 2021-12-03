// je fais mes imports
// pour créer des applis web avec Node
const express = require("express");
// pour faciliter les inéractions avec la bdd mongoDB
const mongoose = require("mongoose");
// pour protéger les informations de connexion vers la BDD
require("dotenv").config();
// pour pouvoir travailler avec les chemins des fichiers
const path = require("path");
// pour sécuriser les en-tête http de l'application express
const helmet = require("helmet");
// pour les routes vers l'utilisateur et les sauces
const userRoutes = require("./routes/user");

// je me connecte à la BDD
mongoose
  .connect(process.env.DB_CODE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

// je fais appel au module Express avec sa fonction
// le mot-clé app fait souvent référence au module express
// on peut utiliser un autre nom, mais c'est la convention
const app = express();

// j'exporte ce module pour pouvoir le réutiliser ailleurs
module.exports = app;

// je protège l'appli de certaines vulnerabilités en protégeant les en-têtes
app.use(helmet());

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

// je récupère le body en front sur l'objet request
// remplace body-parser et analyse donc le corps de la requête
app.use(express.json());

// je configure les routes d'API
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/auth", userRoutes);
