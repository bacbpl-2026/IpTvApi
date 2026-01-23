const axios = require("axios");
const { BASE_URL, SECRET_KEY, DEFAULT_PAYLOAD } = require("../config/watcho.config");
const cryptoUtil = require("../utils/watchoCrypto");

exports.getSubscriptionPlans = async () => {
  // 1 Encrypt request
  const encrypted = cryptoUtil.encrypt(DEFAULT_PAYLOAD, SECRET_KEY);

  // 2 Call Watcho API
  const response = await axios.post(
    `${BASE_URL}/SubscriptionPlanDetails`,
    { InputData: encrypted },
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );

  // 3️⃣ Decrypt response
  const decryptedResponse = cryptoUtil.decrypt(response.data, SECRET_KEY);

  return decryptedResponse;
};
