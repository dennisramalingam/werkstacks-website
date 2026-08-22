# werkstacks.com

Static website for Werkstacks Solutions, hosted on GitHub Pages at **www.werkstacks.com**.

## Files

| File | What it is |
|---|---|
| `index.html` | Homepage — hero animation, services, FAQ, news, contact form |
| `news.html` | Brief archive |
| `privacy.html` / `terms.html` | Legal pages |
| `404.html` | Not-found page |
| `news.json` | **The only file you edit weekly** — see NEWS.md |
| `CNAME` | Custom domain. Do not delete. |
| `support.js`, `*.jsx` | Page runtime and the hero animation. Do not edit by hand. |
| `assets/` | Founder photo, favicon, social share image |

## Updating content

- **Weekly brief:** edit `news.json` (format in [NEWS.md](NEWS.md)), commit, done.
- **Everything else:** the design is maintained in the Werkstacks design project and re-exported into this repo. Editing the HTML here directly works, but will be overwritten on the next export.

## Contact form

Submissions go to [Formspree](https://formspree.io) endpoint `xzepwygb`, which forwards to dennis@werkstacks.com. Confirm the first submission in Formspree or delivery stays paused.

## Deployment

Pages serves the `main` branch root. Any push to `main` goes live in about a minute.
