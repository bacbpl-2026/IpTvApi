const watchoService = require("../services/watcho.service");

// exports.fetchPlans = async () => {
//   const data = await watchoService.getSubscriptionPlans();

//   return {
//     success: data.ResultType === 0,
//     message: data.ResultDesc,
//     plans: data.Result
//   };
// };
exports.fetchPlans = async () => {
  const data = await watchoService.getSubscriptionPlans();

  return {
    success: data.ResultType === 0,
    message: data.ResultDesc,
    plans: data.Result
  };
};
