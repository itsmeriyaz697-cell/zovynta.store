# Zovyenta Store

A full-stack one-product storefront for `https://zovyntastore.vercel.app/`.

## Included

- Public storefront with favicon, responsive product page, NPR 500 price, and 3-piece stock message.
- Server-side `POST /api/order` endpoint that validates the customer name and Nepal phone number, creates an order ID, stores the order, and sends the owner notification.
- Protected `/admin.html` dashboard for viewing incoming orders, customer names, phone numbers, prices, timestamps, and status.
- SEO metadata, Product/Store structured data, canonical URL, Open Graph metadata, `robots.txt`, and sitemap.
- `Dockerfile`, `docker-compose.yml`, and `server.js` so the same files run on Vercel or a Node/Docker server.

## Required production environment variables

Set these in Vercel or Docker:

- `ADMIN_PASSWORD`: a long random password for `/admin.html`.
- `KV_REST_API_URL` and `KV_REST_API_TOKEN`: a Vercel KV/Redis REST database for durable order storage. Without these, local development uses a temporary `/tmp` JSON file that is not durable on serverless hosting.
- `OWNER_EMAIL`: defaults to `itsmeriyaz697@gmail.com`.

For reliable owner email delivery, configure Resend:

- `RESEND_API_KEY`
- `FROM_EMAIL`, using a verified sender domain

If Resend is not configured, the backend uses FormSubmit as a fallback. The first real order may require clicking FormSubmit's one-time activation email. Resend is recommended for production.

## Vercel deploy

1. Import or upload this folder as the root of the Vercel project.
2. Add the variables in `.env.example` to Vercel Project Settings → Environment Variables. Do not upload a real `.env` file or expose credentials in frontend JavaScript.
3. Deploy the project.
4. Open `/admin.html`, sign in with `ADMIN_PASSWORD`, and verify the dashboard.
5. Submit a test order from the storefront and confirm it appears in the dashboard and arrives at `itsmeriyaz697@gmail.com`.

## Docker deploy

Copy `.env.example` to `.env`, replace the placeholder values, then run:

```bash
docker compose up -d --build
```

Open `http://localhost:3000/` for the storefront and `http://localhost:3000/admin.html` for the dashboard. For Docker production, use a persistent external Redis/KV database so orders survive container replacement.

## Local syntax check

Run `npm run check`. The Docker server can be started directly with `npm start`.

