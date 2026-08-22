# Going live — step by step

Everything you need, in order. Total hands-on time: about 15 minutes, plus waiting for DNS.

---

## Step 1 — Create the repository (2 min)

1. Go to [github.com/new](https://github.com/new).
2. **Repository name:** `werkstacks-website`
3. **Visibility: Public.** GitHub Pages on a private repo requires a paid plan.
4. Leave "Add a README" unchecked — this export already has one.
5. Click **Create repository**.

> If you already created it, just open it and continue.

---

## Step 2 — Upload the files (3 min)

1. On the empty repository page, click **uploading an existing file**.
2. Open the `site` folder from the download and select **everything inside it** — including the `assets` folder.
   - Important: upload the *contents* of `site`, not the folder itself. `index.html` must sit at the top level of the repository.
3. Drag them into the browser window.
4. Commit message: `Initial site` → **Commit changes**.

Check afterwards: the repository root should show `index.html`, `CNAME`, `news.json`, `support.js`, an `assets` folder, and the rest — not a single `site` folder.

---

## Step 3 — Turn on GitHub Pages (2 min)

1. In the repository: **Settings** → **Pages** (left sidebar).
2. **Source:** Deploy from a branch.
3. **Branch:** `main`, folder `/ (root)` → **Save**.
4. Wait about a minute, then reload. GitHub shows a live URL like
   `https://dennisramalingam.github.io/werkstacks-website/`.
5. Open it. The site should load with the animation. **Test this before touching DNS** — it isolates any problem to the site rather than the domain.

Because the upload includes a `CNAME` file, GitHub will also show **www.werkstacks.com** under "Custom domain" automatically.

---

## Step 4 — Point the domain at GitHub (5 min at GoDaddy)

Log in to GoDaddy → **My Products** → your domain → **DNS**.

### First: check what's already there

Look at the existing records. If you see:
- **A records on `@`** pointing somewhere → note them down, you'll replace them.
- **MX records** → leave them alone. Those are your email; deleting them breaks dennis@werkstacks.com.
- **TXT records** → leave them alone (verification and email security).

Only touch the `A` and `CNAME` records for `@` and `www`.

### Add the www record

| Type | Name | Value | TTL |
|---|---|---|---|
| CNAME | `www` | `dennisramalingam.github.io` | 1 hour |

If a `www` CNAME already exists (often pointing to a parking page), edit it rather than adding a second one.

### Add the four apex records

So that **werkstacks.com** (without www) also reaches the site, add four A records on `@`:

| Type | Name | Value |
|---|---|---|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |

Delete any other A record on `@` (GoDaddy's parking record usually points at their own IP).

Save.

---

## Step 5 — Enable HTTPS (1 min, after DNS resolves)

1. Wait until `https://www.werkstacks.com` loads. Usually 15–60 minutes; occasionally up to 24 hours.
2. Back in **Settings → Pages**, tick **Enforce HTTPS**.
   - The checkbox is greyed out until GitHub has issued the certificate. If it's grey, wait and come back.

---

## Step 6 — Before you tell anyone

- [ ] Submit the contact form yourself. **Then log in to Formspree and confirm the first submission** — until you do, nothing gets delivered.
- [ ] Check that the confirmation email arrives at dennis@werkstacks.com.
- [ ] Open the site on your phone. Check the menu (hamburger), the animation, and the form.
- [ ] Read `privacy.html` and `terms.html` once more. They are drafts — have them checked before you rely on them.
- [ ] Note: the News section shows placeholder cards until you fill `news.json` (see NEWS.md).

---

## Updating later

- **Weekly brief:** edit `news.json` in GitHub (pencil icon → edit → commit). Live in about a minute.
- **Design changes:** made in the design project and re-exported into this repo.

---

## If something goes wrong

**Site shows a 404 at the github.io URL** — `index.html` isn't at the repository root. You probably uploaded the `site` folder instead of its contents.

**Domain shows "Improperly configured"** in Settings → Pages — DNS hasn't propagated yet, or an old A record is still present. Recheck the records, then wait.

**Animation doesn't appear, page is blank navy** — the `.jsx` files or `support.js` didn't upload. Check the repository root for `support.js`, `animations-v3.jsx`, `banner-scene.jsx`, `hero-mount.jsx`, `tweaks-panel.jsx`.

**Form does nothing** — the first Formspree submission needs confirming in your Formspree account.

**Email stops working after the DNS change** — an MX record was deleted. Restore it in GoDaddy; email records are separate from website records.
