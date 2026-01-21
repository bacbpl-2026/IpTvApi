const express = require("express");
const router = express.Router();
const authView = require("../views/auth.view");

router.post("/register", authView.register);
router.post("/login", authView.login);

module.exports = router;
