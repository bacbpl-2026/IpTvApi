const watchoVM = require("../viewmodels/watcho.viewmodel");

// exports.subscriptionPlans = async (req, res) => {
//   try {
//     const result = await watchoVM.fetchPlans();
//     res.json(result);
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: "Watcho API error",
//       error: err.message
//     });
//   }
// };
exports.subscriptionPlans = async (req, res) => {
  try {
    const result = await watchoVM.fetchPlans();
    res.json(result);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Watcho API error",
      error: err.message
    });
  }
};
