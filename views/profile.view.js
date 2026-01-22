exports.profile = async (req, res) => {
  res.json({
    message: "Protected data",
    user: req.user
  });
};