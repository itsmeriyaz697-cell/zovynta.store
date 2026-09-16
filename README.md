# Zovyenta Store

A static one-product storefront for `https://zovyntastore.vercel.app/`.

## Store settings

The product price is **NPR 500** and the storefront displays **only 3 pieces left**. The order form collects the customer name and Nepal phone number.

## Email notifications

Orders are sent to **itsmeriyaz697@gmail.com** through FormSubmit's AJAX endpoint. The first real submission may trigger a one-time activation email from FormSubmit; click that activation link so future orders arrive automatically. No private API key is stored in the browser.

If you prefer a private mail provider later, replace `ORDER_WEBHOOK_URL` in `config.js` with your own HTTPS endpoint. It must accept a URL-encoded POST and forward the fields to the store email.

## SEO

The site includes a canonical URL, title and description metadata, Open Graph/Twitter metadata, Product and Store structured data, stock/price information, `robots.txt`, and a sitemap pointing to the Vercel URL. Submit `https://zovyntastore.vercel.app/sitemap.xml` in Google Search Console after deployment.

## Deploy

Upload all files to the Vercel project root and deploy. Keep the files together.
