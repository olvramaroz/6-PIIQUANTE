// pour valider certains critères sur le mot de passe
const pwdValidator = require("password-validator");

// critères pour le mot de passe
const pwdSchema = new pwdValidator();
pwdSchema
  .is().min(8) // minimun 8 caractères
  .is().max(15) // maximum 15 caractères
  .has().uppercase() // au moins une majuscule
  .has().lowercase() // au moins une minuscule
  .has().digits() // au moins un chiffre
  .has().not().spaces(); // ne contient aucun espace

// exporter le schema du pwd
module.exports = pwdSchema;