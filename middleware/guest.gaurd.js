const jwt = require("jsonwebtoken");

exports.guestGuard = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return next(); // no token → OK

  try {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET);

    return res.status(403).json({
      message: "Already logged in"
    });
  } catch {
    next();
  }
};
