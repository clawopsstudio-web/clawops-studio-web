# NotebookLM Workspace Knowledge Base

**Last Updated:** 2026-03-31  
**Status:** Active

---

## Purpose

This documents the NotebookLM knowledge setup for the ClawOps workspace.

Goal:
- ingest the markdown corpus from the workspace
- use it for knowledge retrieval, synthesis, and content generation
- keep the workspace docs usable as a live knowledge base instead of leaving them scattered only on disk

---

## Notebook structure

Because the practical source capacity of a single NotebookLM notebook was hit during ingestion, the workspace corpus was sharded across two notebooks.

### Notebook 1
- **Title:** `ClawOps Workspace Knowledge Base`
- **Notebook ID:** `900e8d51-cc20-426e-aba4-54187595a3db`
- **Result:** 49 markdown files added

### Notebook 2
- **Title:** `ClawOps Workspace Knowledge Base — Part 2`
- **Notebook ID:** `7d4349d8-f659-4955-b5c6-b51459b44235`
- **Result:** 45 markdown files added

### Total
- **Markdown files ingested:** 94
- **Sharding rule:** first notebook filled to practical limit, remaining files moved to Part 2

---

## Corpus scope

Included:
- workspace root markdown files
- docs/ markdown files
- agents/ markdown files
- memory/ markdown files
- mission-control markdown docs
- local skills and browser-harness markdown docs
- LobsterBoard markdown docs inside workspace

Excluded from ingestion crawl:
- `node_modules/`
- generated output folders
- cache/junk folders
- vendor-noise paths intentionally excluded by the ingest script

---

## Why two notebooks were needed

During the first pass, NotebookLM accepted the first 49 files and then subsequent source additions failed.

The practical fix was:
1. keep the successful first notebook intact
2. refresh auth from the live server Chrome session
3. create a second notebook
4. ingest the remaining markdown files into Part 2

This is now the durable workspace pattern for large local doc corpora.

---

## Source-of-truth files

Ingest reports:
- `docs/NOTEBOOKLM-WORKSPACE-INGEST.json`
- `docs/NOTEBOOKLM-WORKSPACE-INGEST-PART2.json`

Primary related docs:
- `docs/ARCHITECTURE-FREEZE-V1.md`
- `docs/DEPLOYMENT-BLUEPRINT-SCHEMA-V1.md`
- `docs/CLIENT-JOURNEY-AND-DEPLOYMENT-FLOW.md`
- `docs/DEFAULT-USER-OFFERING-MATRIX.md`

---

## Intended use cases

Use this NotebookLM corpus for:
- internal knowledge lookup
- long-form synthesis
- report writing
- strategy summaries
- investor-style decks
- content repurposing
- future client-specific documentation packs

---

## Operational note

NotebookLM auth in this environment can still be flaky and may need a session refresh from the live browser.

If a future ingest fails:
- refresh storage state from the active Chrome session
- retry in a new notebook shard if source count is already high

---

## Summary

The ClawOps workspace markdown corpus is now loaded into NotebookLM across two notebooks and is ready to be used as a working knowledge/content layer.
