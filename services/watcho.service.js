const axios = require("axios");
const cryptoUtil = require("../utils/watchoCrypto");

const BASE_URL = "https://publicapis.dishtv.in/api/WatchoOne/SubscriptionPlanDetails";
const SECRET_KEY = "W@!0$2s5v8y/B?E(H+Kb";

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
      },
      timeout: 15000
    }
  );

  return cryptoUtil.decrypt(response.data, SECRET_KEY);
};
