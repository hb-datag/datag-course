# datag-course

Public progress tracker for **Mathematical Decision Making in Biomedical Device Development**, a 15 week PhD independent study by Haidar Bin Hamid (Biomedical Engineering, University of Cincinnati), advised by Dr. Kelly Cohen, AI Bio Lab. Fall 2026, 31 Aug to 12 Dec.

Live site: https://course.datag.co

The site is static. Every piece of content comes from files in `data/` and `public/`. There is no database and no admin panel: you update the site by editing a file and committing. One commit per week is the intended rhythm.

## Layout

```
data/
  modules.json         15 modules: status, dates, milestone, deck, notebook, verdict
  decision-log.json    ADR style entries (DL-001, DL-002, ...)
  assumptions.yaml     shared parameters read by the notebooks and the site
  meta.json            last_updated date and repo_url
public/
  syllabus.pdf         drop the syllabus here (the /syllabus page picks it up)
  decks/               weekly 5 slide PDFs, one per module
notebooks/             your Python notebooks (linked from each module page)
app/                   Next.js App Router pages
components/, lib/      shared UI and data loaders
```

Pages: `/` status board, `/module/[n]`, `/decision-log`, `/assumptions`, `/syllabus`.

## Weekly update, step by step

Do these in order, then commit once.

### 1. Update the module status

Open `data/modules.json`, find the module by `n`, and change `status` to one of exactly:

```
"Not started" | "In progress" | "Submitted" | "Reviewed"
```

The progress bar counts modules whose status is `Submitted` or `Reviewed`. Also update `verdict` with your one line crisp vs fuzzy conclusion for the module, for example:

```json
"verdict": "Crisp and fuzzy rankings agree on the top choice; fuzzy shows the runner up is within noise."
```

### 2. Add the 5 slide deck

Export the deck as PDF and save it as `public/decks/module-NN.pdf` (two digit number, e.g. `module-02.pdf`). Then set `deck_url` in `modules.json`:

```json
"deck_url": "/decks/module-02.pdf"
```

Leave `deck_url` as `""` if no deck yet; the module page shows a placeholder line.

### 3. Append a decision log entry

Open `data/decision-log.json` and append an object to the array. IDs are sequential: `DL-001`, `DL-002`, and so on. `options` is a list of strings. `module` is the module number.

```json
{
  "id": "DL-002",
  "date": "2026-09-11",
  "module": 2,
  "context": "What decision was needed and why.",
  "options": ["Option A", "Option B", "Option C"],
  "crisp": "Deterministic result and the number that drove it.",
  "fuzzy": "Fuzzy result and how sensitive the ranking was.",
  "decision": "What you chose.",
  "consequences": "What this locks in or rules out later."
}
```

Entries appear on `/decision-log` and on the page of the module they belong to.

### 4. Touch assumptions if any changed

`data/assumptions.yaml` is a flat map. Each key has `value`, `unit`, `module` (owner), `changed` (ISO date), and an optional `note`:

```yaml
discount_rate:
  value: 0.10
  unit: "per year"
  module: 12
  changed: 2026-09-04
  note: Nominal rate for NPV and real options.
```

Your notebooks can read the same file (`yaml.safe_load`) so the site and the models never disagree.

### 5. Bump the date and commit

Set `last_updated` in `data/meta.json` to today, then:

```bash
git add -A
git commit -m "Week 2: M1 submitted, DL-002, deck"
git push
```

Vercel rebuilds on every push to `main`. The site is live about a minute later.

### Notebook links

Each module page links to `notebooks/module-NN.ipynb` in this repo (path is `notebook_path` in `modules.json`). Set `repo_url` in `data/meta.json` to your GitHub repo URL once so the links resolve. Keep notebooks in `notebooks/`; only their JSON exports need to be committed for the site, but committing the notebook itself makes the link work.

## Syllabus

Copy the PDF to `public/syllabus.pdf`. The grading table on `/syllabus` (70 / 20 / 5 / 5) is hard coded in `app/syllabus/page.tsx`.

## Local preview

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # produces the static export in out/
```

## Deploy (first time)

See `DEPLOY.md`.
