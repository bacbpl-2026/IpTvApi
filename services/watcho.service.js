const axios = require("axios");
const { BASE_URL, SECRET_KEY } = require("../config/watcho.config");
const cryptoUtil = require("../utils/watchoCrypto");

const AUTH_USER = "160";
const AUTH_PASS = "bH@reer!$#2345";
const ENTITY_ID = "10950334";

exports.getSubscriptionPlans = async () => {
  const payload = {
    OTTSubscriberID: "-1",
    UserID: "10950334",
    UserType: "DS",
    Source: "IS"
  };

  const encrypted = cryptoUtil.encrypt(payload, SECRET_KEY);

  const response = await axios.post(
    `${BASE_URL}/SubscriptionPlanDetails`,
    { InputData: encrypted },
    {
      headers: {
        "Content-Type": "application/json",
        "EntityID": ENTITY_ID,
        "Authorization":
          "Basic " +
          Buffer.from(`${AUTH_USER}:${AUTH_PASS}`).toString("base64")
      }
    }
  );

  // Watcho sends encrypted response as STRING
  return cryptoUtil.decrypt(response.data, SECRET_KEY);
};
