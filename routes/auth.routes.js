const express = require("express");
const router = express.Router();
const authView = require("../views/auth.view");
const profileView = require("../views/profile.view");

const authGaurd = require("../middleware/auth.gaurd");
// const { authGuard } = require("../middleware/auth.guard");

router.post("/register", authView.register);
router.post("/login", authView.login);

router.get("/profile", authGaurd.authGuard, profileView.profile);

module.exports = router;
