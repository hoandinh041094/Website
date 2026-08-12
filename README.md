# Sightcraft Analytics — showcase website

Marketing site for a custom analytics & reporting service (a service-based
alternative to Tableau-style BI): we build tailored dashboards, automated
reports, data science, and AI assistants trained on the client's own data.

> Named **Sightcraft Analytics** (vetted via web search Aug 2026 — no existing
> company found, but run a USPTO trademark check and register the domain before
> committing). Contact email: hoan.dinh@sightcraftanalytics.com.

## Pages

- `index.html` — landing page: pitch, services, demo links, process, contact
- `dashboards/sales.html` — interactive sales & revenue demo (time-range filter)
- `dashboards/finance.html` — cash flow, margin, opex, AR aging demo
- `dashboards/marketing.html` — channels, funnel, conversion heatmap, ROAS demo
- `reports/weekly.html` — weekly business review demo: executive summary →
  headline KPIs → expandable drill-downs → recommended actions
- `chatbot.html` — scripted AI data-assistant demo

## How it's built

Zero dependencies — plain HTML/CSS/JS, so it deploys anywhere (GitHub Pages
works as-is: repo Settings → Pages → deploy from `main`).

## Custom domain (sightcraftanalytics.com)

The `CNAME` file in the repo root tells GitHub Pages to serve the site at
sightcraftanalytics.com. At the domain registrar, add:

| Type | Host | Value |
|------|------|-------|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | hoandinh041094.github.io |

Then in repo Settings → Pages: set the custom domain to
`sightcraftanalytics.com` and tick **Enforce HTTPS** once the DNS check
passes (can take up to an hour after the DNS records propagate).

- `assets/style.css` — theme (light/dark via `prefers-color-scheme`), layout
- `assets/charts.js` — small SVG chart engine: line, bar (grouped/stacked),
  heatmap, sparklines, stat tiles, shared hover tooltip
- `assets/data.js` — fictional sample data ("Northwind Outfitters") shared by
  all demos

## Run locally

```
python -m http.server 8123
```

then open http://localhost:8123 (any static server works; opening the files
directly also works since there are no build steps).
