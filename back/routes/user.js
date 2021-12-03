const express = require("express");
const router = express.Router(); // permet de créer des routeurs individuels

const userCtrl = require("../controllers/user");

// les routes pour créer un compte et se connecter au compte
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);

module.exports = router;
