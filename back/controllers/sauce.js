// j'importe les npm nécessaires 
const Sauce = require("../models/sauce");

/// CREER LA SAUCE ///
exports.createSauce = (req, res, next) => {
    // body parsé en objet js utilisable
    const sauceObject = JSON.parse(req.body.sauce);
    const sauce = new Sauce({
      // on récupère toutes les infos du body grâce à cette fonction ...spread
      ...sauceObject,
      //on récupère dynamiquement l'URL de l'image dans un AltGr + 7
      /*    ${req.protocol} = http ou https
            ${req.get('host')} = host du serveur (ex: localhost)
            /images/ = dossier images
            ${req.file.filename} = nom de l'image
      */
      imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
      likes: 0, // départ des likes à 0
      dislikes: 0, // départ des dilikes à 0
    });
    sauce
      .save() // sauvegarder la sauce dans la BDD
      .then(() => res.status(201).json({message: "La sauce a bien été créée!"}))
      .catch(error => res.status(400).json({ error }));
      console.log("voici la bonne sauce créée", sauce);
  };

/// AFFICHER TOUTES LES SAUCES //
exports.getAllSauces = (req, res, next) => {
    Sauce.find() // request : retrouver tout
      .then(sauces => res.status(200).json(sauces)) // res : promesse ok
      .catch(error => res.status(400).json({error}));
  };

/// AFFICHER UNE SAUCE //
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id }) // retrouver un élément par son id
      .then(sauce => res.status(200).json(sauce)) // res : promesse ok
      .catch(error => res.status(404).json({error}));
  };