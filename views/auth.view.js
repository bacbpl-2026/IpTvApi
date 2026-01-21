const authVM = require("../viewmodels/auth.viewmodel");

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await authVM.register(email, password);
    res.status(201).json({ message: "User registered", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await authVM.login(email, password);
    res.json({ token });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};
