const form = document.getElementById("orderForm");
const statusEl = document.getElementById("formStatus");
const config = window.ZOVYENTA_CONFIG || {};

function setStatus(message, type="") {
  statusEl.textContent = message;
  statusEl.className = `status ${type}`;
}

function validNepalPhone(value) {
  const digits = value.replace(/\D/g, "");
  return /^(98|97)\d{8}$/.test(digits) || /^977(98|97)\d{8}$/.test(digits);
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  setStatus("");

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();

  if (name.length < 2) {
    setStatus("Please enter your name.", "error");
    return;
  }
  if (!validNepalPhone(phone)) {
    setStatus("Please enter a valid Nepal mobile number.", "error");
    return;
  }

  const order = {
    orderId: "ZV-" + Date.now().toString().slice(-8),
    product: config.PRODUCT_NAME || "Zovyenta Solar Light",
    quantity: 1,
    priceNPR: Number(config.PRICE_NPR || 899),
    customerName: name,
    customerPhone: phone,
    payment: "Cash on Delivery",
    createdAt: new Date().toISOString()
  };

  const button = form.querySelector("button");
  button.disabled = true;
  button.textContent = "Submitting Order…";

  try {
    if (config.ORDER_WEBHOOK_URL) {
      const response = await fetch(config.ORDER_WEBHOOK_URL, {
        method: config.WEBHOOK_METHOD || "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(order)
      });
      if (!response.ok) throw new Error("Webhook failed");
    } else {
      // Demo/local mode: keeps the order in this browser so the store works
      // immediately. A real owner notification requires a connected webhook.
      const existing = JSON.parse(localStorage.getItem("zovyenta_orders") || "[]");
      existing.push(order);
      localStorage.setItem("zovyenta_orders", JSON.stringify(existing));
    }

    form.reset();
    setStatus(`Order ${order.orderId} received successfully! Zovyenta will contact you at your phone number.`, "success");
  } catch (err) {
    console.error(err);
    setStatus("We couldn't submit the order right now. Please try again.", "error");
  } finally {
    button.disabled = false;
    button.textContent = `Place Order — NPR ${Number(config.PRICE_NPR || 899).toLocaleString()}`;
  }
});
