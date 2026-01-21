const express = require("express");
const router = express.Router();
const authView = require("../views/auth.view");

router.post("/register", authView.register);
router.post("/login", authView.login);

router.get("/profile", authGuard, async (req, res) => {
  res.json({
    message: "Protected data",
    user: req.user
  });
});

module.exports = router;
