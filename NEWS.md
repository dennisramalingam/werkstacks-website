# Updating the Werkstacks Brief

Both the homepage teasers and the News page read one file: **`news.json`** in the repo root.
You never rewrite it — each week you **insert one new week block at the top**. Everything below it
stays on the News page as the archive.

## The shape

```json
{
  "brief": {
    "label": "Werkstacks Brief",
    "weeks": [
      { "week": "Week 35 · 2026", "items": [ ... ] },
      { "week": "Week 34 · 2026", "items": [ ... ] }
    ]
  }
}
```

`weeks` is newest-first. Everything in it is shown; the News page displays the 12 newest cards and
puts the rest behind “Show older briefs”. The homepage shows the 3 newest as teasers.

### One item

```json
{
  "id": "short-hyphenated-slug",
  "category": "AI & Technology",
  "headline": "One line, sentence case",
  "teaser": "Two or three sentences. This is the homepage card text.",
  "images": ["assets/news/week35-1.jpg"],
  "body": "One flowing paragraph of five to eight sentences: what happened with the concrete figures, what it changes for an operations or finance team, and where the business opening sits.",
  "sources": "Reuters, S&P Global"
}
```

- `category` must be exactly `AI & Technology` or `Data & Analytics` (the filter pills depend on it).
- `id` is what the homepage teaser links to. Keep it unique across all weeks.
- `images` holds one picture path. Leave it `[]` and the card shows a neutral pattern instead.

## Weekly routine (5 minutes)

1. Run the prompt below in ChatGPT. It returns **one week block only** — not the whole file.
2. Save the pictures as `assets/news/week<NN>-1.jpg`, `-2.jpg`, `-3.jpg` (upload them to
   `assets/news/` in GitHub) and put each path into that item's `images` array.
3. Open `news.json` in GitHub → pencil icon. Put your cursor right after `"weeks": [` and paste the
   new block, followed by a comma. Leave every older block untouched.
4. Commit. The live site picks it up within a minute.

So after pasting, the file starts like this:

```json
"weeks": [
  { "week": "Week 36 · 2026", "items": [ ... ] },   ← pasted
  { "week": "Week 35 · 2026", "items": [ ... ] },   ← was already there
```

If the page goes blank after an edit, the JSON has a syntax error — almost always a missing or extra
comma between week blocks. Paste the file into jsonlint.com to find it.

## The ChatGPT prompt

> Create the Werkstacks Brief using current, reputable reporting and primary sources from the most
> recent seven days. Prioritize data analytics, business intelligence, AI and technology within
> Werkstacks' scope, including Power BI, Excel automation, dashboards, operational analytics,
> workforce planning, process optimization, manufacturing and supply chains. Include consumer trends,
> markets and economic developments when they create clear analytics-related business opportunities.
> Favor actionable opportunities, emerging trends before they become mainstream, deep industry shifts
> and major breaking developments. Balance coverage between the United States and Germany/Europe.
> Avoid repeating story angles from the previous editions listed below.
>
> Create exactly three distinct articles for the current ISO calendar week.
>
> Return only valid, pretty-printed JSON containing a single week object in exactly this structure —
> no wrapper, no "brief" key, no other weeks:
>
> ```json
> {
>   "week": "Week NN · YYYY",
>   "items": [
>     { "id": "", "category": "", "headline": "", "teaser": "", "images": [], "body": "", "sources": "" }
>   ]
> }
> ```
>
> Replace NN and YYYY with the correct current ISO week number and ISO year. Each id must be a short
> lowercase hyphenated slug based on its headline. Each category must be exactly "AI & Technology" or
> "Data & Analytics". Each headline must be one line in sentence case without emoji. Each teaser must
> contain two or three sentences of original commentary suitable for a homepage card. Each body must
> be one continuous paragraph of five to eight sentences explaining what happened, concrete verified
> figures, implications for operations or finance teams, and the practical business opening for
> Werkstacks. Each images value must be an empty array. Each sources value must contain outlet or
> source names only as plain text, separated by commas when necessary.
>
> Rewrite all prose in original language without copying source wording. Use plain text only
> throughout the JSON. Do not include Markdown, code fences, markdown links, URLs, inline citations,
> headings, bullet points, bold text or HTML entities. Write literal ampersands as & and never as
> &amp;. Use straight apostrophes. Output nothing before or after the JSON object.
>
> Headlines already published, do not repeat these angles:
> [paste the headlines currently in news.json]

That last line is what keeps the weeks from overlapping — ChatGPT cannot see your repo, so give it
the existing headlines rather than asking it to remember previous editions.
