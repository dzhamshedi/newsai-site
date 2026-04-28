# Agent Memory

This project uses repo-backed JSON files as shared memory for automation agents.
The memory is public, versioned in git, and published by GitHub Pages.

Do not store secrets, private prompts, credentials, raw logs, or personal data in
these files.

## Files

- `data/memory/state.json` - current state and last successful run.
- `data/memory/runs.json` - append-only run journal.
- `data/memory/published-items.json` - index of news items already published.

Published endpoints:

- `https://dzhamshedi.github.io/newsai-site/data/memory/state.json`
- `https://dzhamshedi.github.io/newsai-site/data/memory/runs.json`
- `https://dzhamshedi.github.io/newsai-site/data/memory/published-items.json`

Local paths:

- `data/memory/state.json`
- `data/memory/runs.json`
- `data/memory/published-items.json`

## Agent Check Flow

Before creating a new issue, an agent should:

1. Read `data/memory/state.json`.
2. Check `lastRun.status`.
3. If `lastRun.status` is `running`, stop and report that another run may be in
   progress.
4. If `lastPublishedIssue.date` is today in `Europe/Moscow`, do not publish a
   duplicate issue unless the user explicitly asks to force it.
5. Read `data/memory/published-items.json`.
6. Deduplicate candidate news by `sourceUrl` first, then by normalized title.

After publishing, an agent should:

1. Update `data/digest.js`.
2. Append a new entry to `data/memory/runs.json`.
3. Append published news to `data/memory/published-items.json`.
4. Update `data/memory/state.json`.
5. Run `npm run lint`.
6. Commit and push only if checks pass.

## Run Status Values

- `running` - an agent has started work but has not finished.
- `completed` - the issue was published and checks passed.
- `failed` - the run failed; include a short public-safe error summary.
- `skipped` - the agent intentionally did not publish, usually because a daily
  issue already exists.

## Published Item Fields

Required fields:

- `itemId` - stable unique id.
- `issueId` - id of the issue where the item was published.
- `date` - issue date in `YYYY-MM-DD`.
- `publishedAt` - ISO timestamp with timezone.
- `role` - `lead` or `item`.
- `topic` - editorial topic.
- `sourceName` - original source name.
- `sourceUrl` - original URL when available.
- `title` - published Russian title.
- `isDemo` - true only for seed/demo content.

## Helper Command

Print the current memory summary:

```bash
npm run memory:status
```
