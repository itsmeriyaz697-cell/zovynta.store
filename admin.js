const loginCard = document.getElementById("loginCard");
const ordersCard = document.getElementById("ordersCard");
const loginForm = document.getElementById("loginForm");
const loginStatus = document.getElementById("loginStatus");
const ordersStatus = document.getElementById("ordersStatus");
const ordersBody = document.getElementById("ordersBody");
const summary = document.getElementById("summary");

function showOrders() { loginCard.classList.add("hidden"); ordersCard.classList.remove("hidden"); loadOrders(); }
function showLogin(message = "") { ordersCard.classList.add("hidden"); loginCard.classList.remove("hidden"); loginStatus.textContent = message; }
function esc(value) { return String(value ?? "").replace(/[&<>\"']/g, (char) => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[char])); }
async function loadOrders() {
  ordersStatus.textContent = "Loading orders…";
  const response = await fetch("/api/admin/orders");
  if (response.status === 401) return showLogin("Please sign in to view orders.");
  const data = await response.json();
  const orders = data.orders || [];
  summary.textContent = `${orders.length} order${orders.length === 1 ? "" : "s"} recorded`;
  ordersBody.innerHTML = orders.length ? orders.map((order) => `<tr><td><strong>${esc(order.orderId)}</strong><br><small>${esc(order.status)}</small></td><td>${esc(order.customerName)}</td><td><a href="tel:${esc(order.customerPhone)}">${esc(order.customerPhone)}</a></td><td>${esc(order.product)}</td><td>NPR ${esc(order.priceNPR)}</td><td>${esc(new Date(order.createdAt).toLocaleString())}</td></tr>`).join("") : '<tr><td colspan="6">No orders yet.</td></tr>';
  ordersStatus.textContent = "";
}
loginForm.addEventListener("submit", async (event) => { event.preventDefault(); loginStatus.textContent = "Signing in…"; const response = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password: document.getElementById("password").value }) }); if (!response.ok) { loginStatus.textContent = "Invalid password."; return; } loginForm.reset(); showOrders(); });
document.getElementById("refresh").addEventListener("click", loadOrders);
document.getElementById("logout").addEventListener("click", async () => { await fetch("/api/admin/orders", { method: "POST" }); showLogin("You have been logged out."); });
loadOrders();
