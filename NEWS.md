# Updating the Werkstacks Brief

Everything lives in one file: **`news.json`**. Edit it in GitHub, commit, done.
The homepage shows the **3 newest topics as teasers**; the News page holds the **full articles**, newest week open, older weeks collapsed.

---

## 1. The shape

```json
{
  "brief": {
    "label": "Werkstacks Brief",
    "weeks": [
      {
        "week": "Week 36 · 2026",
        "items": [
          {
            "id": "short-slug-for-the-link",
            "category": "AI & Technology",
            "headline": "One line, no emoji",
            "teaser": "2–3 sentences for the homepage card.",
            "images": ["assets/news/week36-1.jpg"],
            "body": "One flowing text: what happened with the numbers, why it matters for an operations or finance team, and where the opening sits.",
            "sources": "Reuters, Bloomberg"
          }
        ]
      }
    ]
  }
}
```

- **Newest week goes first** in `weeks`. Old weeks stay in the file — that's the archive.
- 3 topics per week. Fewer is fine.
- `id` — lowercase, hyphens, no spaces. It's the anchor the homepage teaser links to (`news.html#id`). If you omit it, one is generated from the headline.
- `category` — `AI & Technology` or `Data & Analytics`.
- `teaser` — the short homepage card text. `body` — the full text on the News page, one continuous paragraph (clipped to six lines until the reader hits “Read more”).
- `sources` — plain outlet names, credited at the end.

## 2. Images

Real files in the repo — drag-and-drop in the design tool does **not** reach the live site.

1. Put the pictures in `assets/news/` in the repository, named by week and topic: `week36-1.jpg`, `week36-2.jpg`, `week36-3.jpg`.
2. Reference them in `images` exactly as `"assets/news/week36-1.jpg"`.
3. One picture per topic. It is the picture on the news card and on the homepage teaser. Landscape, roughly 16:9, ≤ 400 KB each.
4. No image? Leave `images` out — the card falls back to an empty frame.

## 3. The ChatGPT prompt

Paste this under the brief it just wrote you:

> From the topics above, pick the 3 most relevant for operations, data and finance managers and output **only** JSON in exactly this shape, nothing else:
>
> ```json
> {"week": "Week NN · 2026", "items": [{"id": "", "category": "", "headline": "", "teaser": "", "images": [], "body": "", "sources": ""}]}
> ```

> Hard rules for the JSON: plain text only — no markdown links, no `[Reuters](url)`, no bold, no headings, no HTML entities (write `&`, not `&amp;`). Credit outlets only in `sources`. Wrap the week in `{"brief": {"label": "Werkstacks Brief", "weeks": [ …newest week first… ]}}`.
>
> Rules: `category` is either "AI & Technology" or "Data & Analytics". `headline` is one line, no emoji, sentence case. `id` is a short lowercase hyphenated slug of the headline. `teaser` is 2–3 sentences of original commentary for a homepage card. `body` is one flowing paragraph of 5–8 sentences that covers what happened with the concrete figures, what it changes for an operations or finance team, and where the business opening sits — no headings, no bullet points, no bold lead-ins. `sources` is the outlet names as plain text. All prose must be rewritten in our own words — never copy phrasing from the source article. Leave `images` as an empty array.

Then in `news.json`: add the returned object as the **first** entry of `weeks`, and fill in the `images` paths for the files you uploaded.

## 4. Sourcing

Our own commentary with the outlet credited. Never paste a publisher's own summary. If a topic gives you nothing to add, drop it.
