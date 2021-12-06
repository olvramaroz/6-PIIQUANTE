// j'importe les npm nécessaires
// pour crypter les informations
const bcrypt = require("bcrypt");
// pour créer des token introuvables et aléatoires = sécuriser la connexion au compte
const jwt = require("jsonwebtoken");
// pour valider l'email
const emailValidator = require("email-validator");
// pour valider certains critères sur le mot de passe
const pwdValidator = require("password-validator");

// j'importe le "model" de création utilisateur
const User = require("../models/user");

// critères pour le mot de passe
const pwdSchema = new pwdValidator();
pwdSchema
  .is()
  .min(8) // minimun 8 caractères
  .is()
  .max(15) // maximum 15 caractères
  .has()
  .uppercase() // au moins une majuscule
  .has()
  .lowercase() // au moins une minuscule
  .has()
  .digits() // au moins un chiffre
  .has()
  .not()
  .spaces(); // ne contient aucun espace

// signup
exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10) // hashage du password avec bcrypt (hash 10 fois (+ la hashage est élevé, + le script met du temps à se terminer))
    .then((hash) => {
      // créer un nouvel utilisateur
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      user
        .save() // sauvegarder l'utilisateur dans la BDD
        .then(() =>
          res.status(201).json({ message: "Utilisateur créé avec succès !" })
        )
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

// login
exports.login = (req, res, next) => {
  // on vérifie si l'email utilisateur existe dans la BDD
  User.findOne({ email: req.body.email })
    .then((user) => {
      console.log("user", user);
      if (!user) {
        // s'il n'existe pas
        return res
          .status(401)
          .json({ error: "Erreur ! Utilisateur non trouvé !" });
      }
      bcrypt
        // on compare les entrées et les données
        .compare(req.body.password, user.password)
        .then((valid) => {
          console.log("validation", valid);
          if (!valid) {
            // si c'est différent
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            // si c'est bon, on envoie l'objet suivant
            userId: user._id,
            token: jwt.sign(
              //contient les données qu'on veut encoder dans ce token
              { userId: user._id },
              'process.env.TOKEN', // avec une clé secrète
              { expiresIn: "24h" } // qui est valide 24h
            ),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
