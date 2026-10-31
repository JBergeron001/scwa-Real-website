# Moving stcharleswatershedsalliance.com from Wix to GitHub Pages

Follow the steps in order. **Don't cancel Wix until step 9.** Hosting on GitHub Pages is free. Your only ongoing cost is the domain, usually about $10–20 a year.

---

## Step 1 — Save what lives only inside Wix (before anything else)

1. **Newsletter subscribers and contacts.** In the Wix dashboard, go to **Contacts**. Select all contacts, then choose **Export** to save a CSV file. Keep this file: it's your subscriber list, and it disappears when the Wix account is deleted.
2. **Form submissions** (if you want a record): go to **Forms & Submissions** and export them.

## Step 2 — Two documents to save from Wix

Your logo, photos, board headshots, newsletters, Strategic Vision, By-Laws and sponsorship policy are already in the site folder. Two files exist only on Wix, so download them while the Wix site is still live, rename them, and put them in the `files/` folder:

| Save as | Download from your current site |
|---|---|
| `files/non-discrimination.pdf` | About page → "Non Discrimination" link |
| `files/marc-manual-2.pdf` | News page → "MARC Manual 2: New Proposed Runoff Reduction & Retention Formula" link |

**Optional photo swaps:** every photo is in `images/`. To change one, replace the file and keep the same name. For example, `hero.jpg` is the big home-page photo, `projects/g01.jpg` through `g12.jpg` are the Projects gallery, and `team/` holds the headshots.

## Step 3 — Put the site on GitHub (free)

1. Sign in at github.com and click **New repository**. Name it `scwa-website`, set it to **Public**, and click **Create repository**.
2. On the new repository page, click **uploading an existing file**. Drag in **everything inside this folder**: the `.html` files and the `css`, `js`, `images` and `files` folders. Then click **Commit changes**.
3. Go to **Settings → Pages**. Under "Build and deployment," choose **Deploy from a branch**, branch **main**, folder **/ (root)**, and click **Save**.
4. Wait one to two minutes. GitHub shows a link like `https://YOUR-USERNAME.github.io/scwa-website/`. Open it and check every page.
   - Your real address keeps showing the Wix site until step 7, so you can test safely here.

## Step 4 — Turn on the forms (free, takes 2 minutes)

The newsletter and contact forms use **Web3Forms**. It's free for up to 250 submissions a month and needs no account.

1. Go to web3forms.com, enter **stcharleswatershedsalliance@gmail.com**, and click **Create Access Key**. The key arrives by email.
2. In each `.html` file, find `PASTE-YOUR-WEB3FORMS-ACCESS-KEY-HERE` and replace it with your key. It appears in the footer of every page, plus the forms on Home, Events and Get Involved. On GitHub, open the file, click the pencil icon, use Ctrl+F to find the text, edit it, and commit.
3. Send yourself a test from the Get Involved page.

New subscribers arrive as emails. Add them to the contact list you exported in step 1. When the list grows, a free newsletter service such as MailerLite can take it over.

## Step 5 — Find out who holds your web address

1. **Check Wix first:** in the Wix dashboard, open **Domains**. If stcharleswatershedsalliance.com is listed as purchased through Wix, Wix is your registrar.
2. If it isn't there, search the domain at **lookup.icann.org**. The "Registrar" line shows the company (GoDaddy, Squarespace/Google, Namecheap, etc.). Then search your email for receipts from that company to find the login.

## Step 6 — Move the web address (only if it's registered with Wix)

1. Create an account at a low-cost registrar. Cloudflare Registrar, Porkbun and Namecheap are common choices.
2. In Wix: **Domains → ⋯ (More Actions) → Transfer away from Wix → Transfer Domain → I Still Want to Transfer.** Wix emails an authorization (EPP) code to the domain's registrant email, so make sure you can receive mail there.
3. At the new registrar, choose **Transfer a domain**, enter the domain, paste the code, and pay. The fee usually includes a year of renewal. The transfer can take up to 7 days.
   - A domain registered or transferred within the last 60 days can't be transferred yet.
   - Your website stays up during the transfer.

If the domain is already at GoDaddy, Squarespace or another registrar, skip the transfer. Just do step 7 there.

## Step 7 — Point the web address at GitHub

1. In GitHub: **Settings → Pages → Custom domain**, enter `www.stcharleswatershedsalliance.com` and click **Save**. GitHub adds a small `CNAME` file to the repository for you.
2. At your registrar's DNS settings, **delete the old Wix records** for `@` and `www`, then add these:

| Type | Name / Host | Value |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | YOUR-USERNAME.github.io |

   - If there are **MX** records (email), leave them alone.
3. Changes can take up to 24 hours. Once the site loads at your address, go back to **Settings → Pages** and tick **Enforce HTTPS**.

## Step 8 — Final check
- Every page, photo and PDF opens.
- Both forms deliver a test email.
- Old Wix addresses still work: `/events-1` and `/news` lead to Events & News, and `/contact` leads to Get Involved.

## Step 9 — Cancel Wix

Do this only after the site works at your own address, and (if it was at Wix) the domain transfer shows as **complete**.

1. **Cancel the Premium plan** in Wix (Subscriptions). Request a refund if you're inside the refund window.
2. Then delete the site and account if you wish.

---

## Updating the site later
- **Add an event:** edit `js/events.js`. Copy an example line, remove the `//`, and change the date, title, time and registration link. It appears on the monthly calendar and on the home page automatically.
- **Add news:** in `events.html`, copy an `<article class="news-item">…</article>` block and edit it.
- **Change colors or fonts:** edit the few lines at the top of `css/style.css` (the `:root` section).

## Still to fill in
- **SCWA Facebook page**: there's a commented-out spot in the footer. The old site's Facebook link went to Wix's own page, so it was removed.
- **Projects gallery captions**: edit them in `projects.html` if you want to name specific sites. Images marked "Concept rendering" are AI-generated.
