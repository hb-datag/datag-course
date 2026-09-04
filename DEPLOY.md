# Deploy notes

Status on 4 Sep 2026: repo is at https://github.com/hb-datag/datag-course, the Vercel project `datag-course` is live at https://datag-course.vercel.app, and `course.datag.co` is attached and waiting on the DNS record in step 4. Steps 1 to 3 are kept for reference or for a rebuild.

Prerequisites on your machine: Node 20 or newer, git, and (optional but recommended) the GitHub CLI `gh`.

## 1. Put the repo on GitHub

From inside this folder (it is already a git repo with one commit):

```bash
gh repo create datag-course --private --source=. --push
```

Without `gh`: create an empty repo named `datag-course` on github.com, then

```bash
git remote add origin https://github.com/hb-datag/datag-course.git
git push -u origin main
```

Then set `repo_url` in `data/meta.json` to that URL and commit.

## 2. Deploy to Vercel

```bash
npx vercel --prod
```

The first run asks a few questions: pick your account, answer "N" to linking an existing project, and type `datag-course` as the project name. Accept the detected Next.js defaults. It then creates the project and prints a URL like `https://datag-course.vercel.app`. That URL is your fallback link: it works immediately and stays valid after the custom domain is added.

If you prefer Git based deploys (rebuild on every push), import the GitHub repo at https://vercel.com/new instead. Framework preset: Next.js. No environment variables needed.

## 3. Attach course.datag.co

```bash
npx vercel domains add course.datag.co datag-course
```

## 4. DNS record at your registrar for datag.co

Add one record:

| Type  | Host / Name | Value                   | TTL  |
|-------|-------------|-------------------------|------|
| CNAME | course      | 3b1be9a585132ef6.vercel-dns-017.com. | auto |

(This is the value Vercel assigned to the project. The legacy value `cname.vercel-dns.com` also works.)

Vercel issues the TLS certificate automatically once the CNAME resolves (usually 5 to 30 minutes, up to 48 hours on slow registrars). Check with:

```bash
npx vercel domains inspect course.datag.co
```

## 5. Verify

Open https://datag-course.vercel.app first (fallback), then https://course.datag.co once DNS has propagated.
