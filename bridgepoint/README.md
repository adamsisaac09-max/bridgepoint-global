# Bridge Point Global

**Trade Coordination · Europe — Africa**

A production-ready website for Bridge Point Global — institutional trade coordination between European suppliers and African organisations.

---

## Structure

```
bridgepoint/
├── index.html          — Main page (all sections)
├── css/
│   └── style.css       — Complete stylesheet
├── js/
│   └── main.js         — Interactions & form handling
├── assets/
│   └── favicon.svg     — Globe mark favicon
└── README.md
```

---

## Deploy to GitHub Pages

1. Create a new repository on GitHub (e.g. `bridgepoint-global`)
2. Upload all files maintaining the folder structure
3. Go to **Settings → Pages**
4. Set source to **Deploy from a branch → main → / (root)**
5. Your site will be live at `https://yourusername.github.io/bridgepoint-global`

### Custom domain (bridgepointglobal.com)
1. In **Settings → Pages → Custom domain**, enter your domain
2. Add a CNAME record in your DNS pointing to `yourusername.github.io`
3. Enable **Enforce HTTPS**

---

## Contact Form Setup

The form is ready to connect to [Formspree](https://formspree.io) (free tier: 50 submissions/month).

1. Sign up at formspree.io
2. Create a new form and copy the form ID
3. In `js/main.js`, replace `YOUR_FORM_ID` with your actual ID:
   ```js
   const FORMSPREE_ID = 'abcdefgh'; // your ID here
   ```

Without a form ID the site works normally — just no email delivery.

---

## Design System

- **Palette:** Extracted from Malmö bridge at golden hour
- **Display:** Playfair Display (Google Fonts)
- **Body:** Inter (Google Fonts)
- **Aesthetic:** Warm Institutional

---

## Brand

© 2025 Bridge Point Global · Isaac Sunny Adams · Lagos — Stockholm
