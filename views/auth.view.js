const AuthVM = require("../viewmodels/auth.viewmodel");

exports.register = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const user = await AuthVM.register(email, password, name);
    res.status(201).json(user);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await AuthVM.login(email, password);
    res.status(200).json(result);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};


// exports.profile = async (req, res) => {
//   res.json({
//     message: "Protected data",
//     user: req.user
//   });
// };