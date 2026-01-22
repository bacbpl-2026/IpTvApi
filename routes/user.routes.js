const express = require("express");
const router = express.Router();

const profileView = require("../views/profile.view");
const authGaurd = require("../middleware/auth.gaurd");

router.get("/profile", authGaurd.authGuard, profileView.profile);

module.exports = router;
