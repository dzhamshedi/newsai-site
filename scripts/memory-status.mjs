import { readFile } from "node:fs/promises";

const memoryDir = new URL("../data/memory/", import.meta.url);

async function readJson(fileName) {
  const fileUrl = new URL(fileName, memoryDir);
  return JSON.parse(await readFile(fileUrl, "utf8"));
}

function formatRun(run) {
  if (!run) {
    return "No runs recorded.";
  }

  return [
    `Last run: ${run.runId}`,
    `Status: ${run.status}`,
    `Type: ${run.type}`,
    `Finished: ${run.finishedAt || "not finished"}`,
    `Issue: ${run.issueId || run.publishedIssueId || "none"}`
  ].join("\n");
}

const [state, runs, publishedItems] = await Promise.all([
  readJson("state.json"),
  readJson("runs.json"),
  readJson("published-items.json")
]);

const lastRun = state.lastRun || runs.runs.at(-1);
const lastIssue = state.lastPublishedIssue;

const lines = [
  `Project: ${state.project}`,
  `Timezone: ${state.timezone}`,
  `Updated: ${state.updatedAt}`,
  "",
  formatRun(lastRun),
  "",
  `Last issue: ${lastIssue?.issueId || "none"}`,
  `Issue date: ${lastIssue?.date || "none"}`,
  `Issue URL: ${lastIssue?.url || "none"}`,
  `Issue items: ${lastIssue?.itemCount ?? 0}`,
  "",
  `Known published items: ${publishedItems.items.length}`,
  `Total runs: ${runs.runs.length}`,
  "",
  "Recent published titles:",
  ...publishedItems.items.slice(-5).map((item) => `- ${item.title}`)
];

console.log(lines.join("\n"));
