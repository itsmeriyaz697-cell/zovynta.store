import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import { Readable } from "node:stream";
import orderHandler from "./api/order.js";
import loginHandler from "./api/admin/login.js";
import ordersHandler from "./api/admin/orders.js";

const root = process.cwd();
const routes = { "/api/order": orderHandler, "/api/admin/login": loginHandler, "/api/admin/orders": ordersHandler };
const contentTypes = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8", ".json": "application/json", ".xml": "application/xml", ".txt": "text/plain; charset=utf-8", ".jpg": "image/jpeg", ".ico": "image/x-icon" };

function runHandler(handler, req, res, body) {
  const request = Readable.from(body ? [body] : []);
  request.method = req.method;
  request.headers = req.headers;
  const response = { statusCode: 200, headers: {}, status(code) { this.statusCode = code; return this; }, setHeader(key, value) { this.headers[key] = value; return this; }, end(data) { for (const [key, value] of Object.entries(this.headers)) res.setHeader(key, value); res.statusCode = this.statusCode; res.end(data); } };
  handler(request, response).catch((error) => { console.error(error); if (!res.headersSent) res.writeHead(500).end(JSON.stringify({ error: "Server error" })); });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  if (routes[url.pathname]) { let body = ""; for await (const chunk of req) body += chunk; return runHandler(routes[url.pathname], req, res, body); }
  let file = url.pathname === "/" ? "/index.html" : url.pathname;
  if (file === "/admin") file = "/admin.html";
  const safe = path.normalize(file).replace(/^\.\.(\/|\\)/, "");
  try { const data = await fs.readFile(path.join(root, safe)); res.setHeader("Content-Type", contentTypes[path.extname(safe)] || "application/octet-stream"); res.end(data); } catch { res.writeHead(404).end("Not found"); }
});
server.listen(process.env.PORT || 3000, "0.0.0.0", () => console.log(`Zovyenta running on port ${process.env.PORT || 3000}`));
