# Updating the Werkstacks Brief

The news section on the homepage reads one file: **`news.json`**. Edit that file, commit, and the site updates. Nothing else to touch.

## 1. Paste the brief

Open `news.json`. Each topic is one entry in `items`:

```json
{
  "brief": {
    "label": "Werkstacks Brief",
    "week": "Week 34 · 2026",
    "items": [
      {
        "category": "AI & Technology",
        "headline": "AI financing is hitting its first real constraint",
        "teaser": "Two or three sentences in our own words. What happened, and what it means for operations teams.",
        "sources": "Reuters"
      }
    ]
  }
}
```

- `category` — `AI & Technology` or `Data & Analytics`. Not shown on the card; kept for the archive and for later automation.
- `headline` — one line, no emoji.
- `teaser` — 2–3 sentences, **written as your own commentary**, not copied from the source.
- `sources` — outlet names, credited at the end of the card.

The homepage shows the **first three** items. The rest appear on the archive page.

Update `week` every time you publish.

## 2. Images

Each of the three cards has its own drag-and-drop image slot. Drop an image once and it stays until you replace it — no weekly image work unless you want to refresh them.

## 3. The ChatGPT prompt

Ask your Daily Business & Tech Brief to output the site format directly:

> Take today's brief and rewrite the top 5 topics as JSON matching this shape:
> `{"category": "...", "headline": "...", "teaser": "...", "sources": "..."}`
> Category must be either "AI & Technology" or "Data & Analytics". The teaser must be 2–3 sentences of original commentary aimed at operations and finance managers — do not copy phrasing from the source article. Name the outlets in `sources`.

Paste the result into the `items` array.

## 4. A note on sourcing

Teasers are our own commentary with the outlet credited. Do not paste summaries written by the source publication — rewrite them. If an item has no original point of view to add, leave it out.
