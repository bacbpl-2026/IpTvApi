const jwt = require("jsonwebtoken");

exports.authGuard = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token required" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // id, email, userType
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};
