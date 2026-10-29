# Bright Minds Centre — Website

A complete, mobile-friendly website for an autism and neurodevelopmental therapy centre, with a therapy-product shop that sends orders by WhatsApp.

Built with plain HTML + Bootstrap 5, so it works on **GitHub Pages**, **cPanel** or any web host.

## What's included

| File | Page |
|---|---|
| `index.html` | Home — hero, services, how it works, conditions, featured products, testimonials, FAQ |
| `about.html` | Founder story, values, team |
| `services.html` | 6 therapy services in detail + session options |
| `shop.html` | 12 therapy products with category filter and WhatsApp order cart |
| `contact.html` | Booking form (sends to WhatsApp), contact details, map |
| `landing-template.html` | Ready-made campaign page (free screening day) — copy it for new adverts |
| `css/style.css` | All colours and styling (brand colours are at the top) |
| `js/main.js` | WhatsApp number, cart and form behaviour |
| `images/` | Placeholder artwork — replace with real photos (same file names). Real photos of the centre, team and products are what make it feel truly premium. |
| `vendor/` | Bootstrap and icons, bundled so nothing breaks |

## 1. First things to change (10 minutes)

1. **WhatsApp number** — open `js/main.js`, line 6: `whatsapp: "2348000000000"`. Use the real number in international format with no `+` or spaces, e.g. `2348031234567`. Every WhatsApp button, the shop cart and the booking form use this.
2. **Business name, address, phone and email** — use Find & Replace (Ctrl+H in VS Code / Notepad++) across all `.html` files:
   - `Bright Minds Centre` and `Bright Minds Autism &amp; Neurodevelopmental Centre` → her business name
   - `12 Hope Avenue, Lekki, Lagos` → real address
   - `+234 800 000 0000` and `+2348000000000` → real phone
   - `hello@brightmindscentre.com.ng` → real email
3. **Products and prices** — in `shop.html`, each product is one block starting with `<div class="product-card" data-price="8500">`. Change the name, description, the price shown **and** `data-price` (the cart uses `data-price`).
4. **Photos** — drop real photos into `images/` using the same names (e.g. `product-weighted-blanket.jpg`, `hero.jpg`), or change the `src` in the HTML.
5. **About page** — replace the `[Founder's name]` / `[Name]` text and testimonials with real (consented) ones.
6. **Map** — in `contact.html`, change `q=Lekki%20Phase%201%20Lagos` to the real address.
7. **Colours and fonts** — top of `css/style.css` (`--lagoon`, `--marigold` etc.).

## 2. Adding a new landing page

1. Make a copy of `landing-template.html` and rename it, e.g. `open-day.html`.
2. Open it in any text editor (VS Code or Notepad++ are free) and change the heading, text, date and form button.
3. Upload it next to the other pages. It will be live at `yourdomain.com/open-day.html`.

The landing page has no menu on purpose, so visitors from an advert focus on booking.

## 3. Deploy

### Option A — GitHub Pages (free hosting)
1. Create a new repository on GitHub (e.g. `brightminds-website`), set to Public.
2. Click **Add file → Upload files**, drag in **everything inside this folder** (not the folder itself), and commit.
3. Go to **Settings → Pages → Build and deployment → Source: Deploy from a branch**, choose `main` / `/ (root)`, Save.
4. After a minute the site is live at `https://USERNAME.github.io/brightminds-website/`.
5. Custom domain: in Settings → Pages add the domain, then at the domain registrar add a `CNAME` record pointing `www` to `USERNAME.github.io`.

### Option B — cPanel
1. Log in to cPanel → **File Manager** → open `public_html` (or the domain's folder).
2. Click **Upload** and upload the zip file, then right-click it → **Extract**.
3. Make sure `index.html` sits directly inside `public_html` (move the files up a level if they extracted into a sub-folder).
4. Visit the domain — done. Turn on free SSL under **SSL/TLS Status → Run AutoSSL**.

### Option C — GitHub → cPanel auto-deploy
In cPanel, **Git™ Version Control → Create**, paste the GitHub repo URL and clone it, then use **Manage → Pull or Deploy** whenever you update GitHub.

## 4. Optional upgrades

- **Email form instead of WhatsApp** — create a free form at formspree.io and add `action="https://formspree.io/f/YOUR_ID" method="POST"` to the `<form id="bookingForm">` tag.
- **Online card payments** — create a Paystack account and use Paystack Payment Pages; link the "Add to order" buttons to the product's payment page.
- **Google Analytics / Meta Pixel** — paste the tracking snippet just before `</head>` on each page.
