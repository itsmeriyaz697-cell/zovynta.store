const form = document.getElementById("orderForm");
const statusEl = document.getElementById("formStatus");
const config = window.ZOVYENTA_CONFIG || {};

function setStatus(message, type = "") {
  statusEl.textContent = message;
  statusEl.className = `status ${type}`;
}

function validNepalPhone(value) {
  const digits = value.replace(/\D/g, "");
  return /^(98|97)\d{8}$/.test(digits) || /^977(98|97)\d{8}$/.test(digits);
}

function emailOrder(order) {
  return fetch(config.ORDER_API_URL || "/api/order", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(order)
  }).then(async (response) => {
    const result = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(result.error || "Order service failed");
    return result;
  });
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  setStatus("");
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  if (name.length < 2) return setStatus("Please enter your name.", "error");
  if (!validNepalPhone(phone)) return setStatus("Please enter a valid Nepal mobile number.", "error");

  const order = {
    orderId: "ZV-" + Date.now().toString().slice(-8),
    product: config.PRODUCT_NAME || "Zovyenta Solar Light",
    quantity: 1,
    priceNPR: Number(config.PRICE_NPR || 500),
    customerName: name,
    customerPhone: phone,
    payment: "Cash on Delivery",
    createdAt: new Date().toISOString()
  };
  const button = form.querySelector("button");
  button.disabled = true;
  button.textContent = "Sending Order…";
  try {
    await emailOrder(order);
    form.reset();
    setStatus(`Order ${order.orderId} received! Your name and phone number were sent to Zovyenta. We will contact you for delivery.`, "success");
  } catch (err) {
    console.error(err);
    setStatus("We couldn't send the order right now. Please try again or contact Zovyenta directly.", "error");
  } finally {
    button.disabled = false;
    button.textContent = `Place Order — NPR ${Number(config.PRICE_NPR || 500).toLocaleString()}`;
  }
});
