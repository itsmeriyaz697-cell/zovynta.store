/* Public storefront settings. Never place private API keys in this file. */
const ZOVYENTA_CONFIG = {
  PRODUCT_NAME: "LED Bright Outdoor Solar Light With Motion Sensor",
  PRICE_NPR: 500,
  STOCK_REMAINING: 3,
  OWNER_EMAIL: "itsmeriyaz697@gmail.com",

  // FormSubmit sends the order email without exposing an API key in the browser.
  // The first submission may require clicking their one-time activation email.
  ORDER_WEBHOOK_URL: "https://formsubmit.co/ajax/itsmeriyaz697@gmail.com",
  WEBHOOK_METHOD: "POST"
};
