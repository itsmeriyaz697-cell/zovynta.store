# Zovyenta Store — one-product solar light website

## Included
- `index.html` — SEO-ready one-product storefront
- `style.css` — responsive design
- `script.js` — order form
- `config.js` — price + notification webhook settings
- `solar-light.jpg` — supplied product image
- `zovyenta-logo.jpg` — supplied Zovyenta logo
- `robots.txt` + `sitemap.xml` — search-engine basics

## Important SEO note
No website can honestly guarantee that Google will show it for “anything related.” This site includes strong on-page SEO, Product/Store structured data, canonical metadata, Open Graph metadata, a sitemap and robots file. Ranking still depends on indexing, site quality, competition, backlinks, content and search-engine decisions.

## Orders
The checkout asks only for name and phone number, as requested.

### Owner notification
A static website cannot securely send a private notification to you by itself. For a real notification:
1. Deploy this website.
2. Create a private server/webhook or a Google Apps Script web app that accepts POST JSON.
3. Put its HTTPS URL into `ORDER_WEBHOOK_URL` in `config.js`.
4. Make the webhook send you an email/Telegram/other notification.
5. Do NOT put a Telegram bot token, password or other secret directly in browser JavaScript.

If `ORDER_WEBHOOK_URL` is blank, the site runs in demo mode and stores orders in that browser's localStorage. That is NOT a real production order system.

## Price
Current demo price is NPR 899. Change `PRICE_NPR` in `config.js` and the displayed price/schema in `index.html` if you change it.

## Deploy
Upload all files to any static hosting provider. Keep the files in the same folder.
