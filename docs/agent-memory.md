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
6. Deduplicate candidate news by `sourceCanonicalUrl` first, then by
   `normalizedTitle`.

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

## Required Date And Id Formats

Use the project timezone `Europe/Moscow` for all publishing decisions.

- Issue date: `YYYY-MM-DD`, for example `2026-04-28`.
- Timestamp: ISO 8601 with timezone offset and seconds, for example
  `2026-04-28T23:17:14+03:00`.
- Do not use fractional seconds in project memory.
- `updatedAt`, `startedAt`, `finishedAt`, and `publishedAt` must be timestamps.
- `date` and `nextExpectedRun.date` must be dates only.
- Real daily issue id: `daily-YYYY-MM-DD`, for example `daily-2026-04-29`.
- Demo issue id: `demo-YYYY-MM-DD`.
- Run id: `<type>-YYYY-MM-DDTHHmmss-msk`, for example
  `daily-2026-04-29T090000-msk`.
- Item id: `<issueId>-<topic>-<short-ascii-slug>`, for example
  `daily-2026-04-29-products-openai-agent-update`.

## Run Entry Fields

Every entry in `runs.json` must include:

- `runId` - stable unique id in the format above.
- `type` - `bootstrap`, `daily`, `manual`, `repair`, or `backfill`.
- `status` - one of the run status values.
- `trigger` - `manual`, `scheduled`, or `automation`.
- `agent` - tool or agent name, for example `codex`.
- `startedAt` - timestamp.
- `finishedAt` - timestamp or `null` while running.
- `inputPaths` - project files read as durable input.
- `outputPaths` - project files written by the run.
- `publishedIssueId` - issue id or `null`.
- `publishedItemIds` - array of item ids, empty when nothing was published.
- `notes` - short public-safe summary.

If a run fails, write `status: "failed"` and keep a public-safe `notes` value.
Do not store stack traces, private prompts, credentials, or raw logs.

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
- `sourceCanonicalUrl` - normalized URL used for deduplication, or `null`.
- `title` - published Russian title.
- `normalizedTitle` - normalized Russian title used for deduplication.
- `isDemo` - true only for seed/demo content.

## Duplicate Detection

Agents must check duplicates before publishing.

URL normalization for `sourceCanonicalUrl`:

1. Trim whitespace.
2. Resolve redirects when practical.
3. Lowercase protocol and hostname.
4. Remove URL fragment.
5. Remove tracking query parameters such as `utm_*`, `fbclid`, `gclid`,
   `yclid`, `mc_cid`, and `mc_eid`.
6. Sort remaining query parameters.
7. Remove a trailing slash from the path unless the path is `/`.

Title normalization for `normalizedTitle`:

1. Convert to lowercase.
2. Replace `ё` with `е`.
3. Remove punctuation and quote marks.
4. Collapse repeated whitespace to one space.
5. Trim leading and trailing whitespace.

Duplicate decision:

1. If a candidate has `sourceCanonicalUrl` and it already exists in
   `published-items.json`, skip it.
2. If the canonical URL is new but `normalizedTitle` exactly matches an
   existing item, skip it.
3. If the normalized title is highly similar to an existing title, stop and ask
   the user or mark the item for manual review instead of publishing silently.
4. Store both the human title in `title` and the dedupe title in
   `normalizedTitle`.

## Helper Command

Print the current memory summary:

```bash
npm run memory:status
```
