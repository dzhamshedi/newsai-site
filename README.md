# NewsAI Site

Static GitHub Pages site for a Russian-language daily AI news digest.

## Stack

- Plain HTML, CSS, and vanilla JavaScript.
- No build step and no npm dependencies.
- GitHub Pages can serve the repository root directly.
- Daily automation updates `data/digest.js` and commits the generated issue.

This stack is intentionally simple for the first version: fewer moving parts, faster publishing, and easier automation from Codex/Desktop tools.

## Structure

- `index.html` - homepage layout.
- `styles.css` - visual system and responsive layout.
- `app.js` - rendering and topic filters.
- `data/digest.js` - replaceable daily digest data.
- `.nojekyll` - tells GitHub Pages to publish files as plain static assets.

## GitHub Pages Setup

In the GitHub repository settings:

1. Open `Settings` -> `Pages`.
2. Set source to `Deploy from a branch`.
3. Select branch `main` and folder `/ (root)`.
4. Save.

After the first push, GitHub Pages will publish the site at:

`https://dzhamshedi.github.io/newsai-site/`

## Automation Plan

The first automation target is a daily publishing loop:

1. Find and deduplicate AI-related news.
2. Summarize and translate selected items into Russian.
3. Preserve source links and publication metadata.
4. Generate a new `data/digest.js`.
5. Commit and push the update to `main`.

Later, the site can add archive pages for each daily issue.
