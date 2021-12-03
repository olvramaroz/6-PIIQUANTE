// j'importe les npm nécessaires
  // pour crypter les informations
  const bcrypt = require("bcrypt");

// j'importe le "model" de création utilisateur
const User = require("../models/user");

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
          res.status(201).json({ message: "Utilisateur créé avec succès" })
        )
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
