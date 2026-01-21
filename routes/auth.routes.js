const express = require("express");
const router = express.Router();
const authView = require("../views/auth.view");
const authGaurd = require("../middleware/auth.gaurd");

router.post("/register", authView.register);
router.post("/login", authView.login);

router.get("/profile", authGaurd.authGuard, authView.profile);

module.exports = router;
