/*
  Zovyenta order configuration.
  IMPORTANT: Never put private API keys or bot tokens in this file.
  For owner notifications, set ORDER_WEBHOOK_URL to a public HTTPS webhook
  you control (for example, a Google Apps Script web app or your own backend).
*/
const ZOVYENTA_CONFIG = {
  PRODUCT_NAME: "LED Bright Outdoor Solar Light With Motion Sensor",
  PRICE_NPR: 899,

  // Leave blank until you connect your notification endpoint.
  ORDER_WEBHOOK_URL: "",

  // Optional: set true only if your webhook expects JSON.
  WEBHOOK_METHOD: "POST"
};
