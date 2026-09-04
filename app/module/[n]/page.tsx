import Link from "next/link";
import { notFound } from "next/navigation";
import StatusDot from "@/components/StatusDot";
import { getModules, getModule, getDecisionLog, getRepoUrl } from "@/lib/data";
import { fmtDate, fmtRange, pad2 } from "@/lib/format";

export function generateStaticParams() {
  return getModules().map((m) => ({ n: String(m.n) }));
}

export async function generateMetadata({ params }: { params: Promise<{ n: string }> }) {
  const { n } = await params;
  const m = getModule(Number(n));
  return { title: m ? `Module ${m.n}: ${m.title}` : "Module" };
}

export default async function ModulePage({ params }: { params: Promise<{ n: string }> }) {
  const { n } = await params;
  const m = getModule(Number(n));
  if (!m) notFound();
  const entries = getDecisionLog().filter((e) => e.module === m.n);
  const modules = getModules();
  const prev = modules.find((x) => x.n === m.n - 1);
  const next = modules.find((x) => x.n === m.n + 1);

  return (
    <article className="measure px-5">
      <div className="smallcaps mb-2">
        Module <span className="mono">{pad2(m.n)}</span> of <span className="mono">15</span>
      </div>
      <h1 className="masthead">{m.title}</h1>
      <p className="text-grey mt-3">
        Week of {fmtRange(m.week_start, m.week_end)} {m.week_start.slice(0, 4)}
        {m.milestone ? <> · {m.milestone}</> : null}
      </p>
      <p>
        <StatusDot status={m.status} />
      </p>

      <h2>Verdict</h2>
      <p>{m.verdict}</p>

      <h2>Weekly update</h2>
      {m.deck_url ? (
        <>
          <p>
            Five slide update: <a href={m.deck_url}>open the PDF</a>.
          </p>
          <div className="rule">
            <object data={m.deck_url} type="application/pdf" className="w-full" style={{ height: "520px" }}>
              <p className="pt-3 text-grey">
                Inline preview is not available in this browser. <a href={m.deck_url}>Download the deck</a>.
              </p>
            </object>
          </div>
        </>
      ) : (
        <p className="text-grey">The five slide update for this module has not been posted yet.</p>
      )}

      <h2>Decision log</h2>
      {entries.length === 0 ? (
        <p className="text-grey">No decision log entry for this module yet.</p>
      ) : (
        entries.map((e) => (
          <div key={e.id} className="rule pt-4 mb-6">
            <div className="flex flex-wrap gap-x-4 text-grey mb-2">
              <span className="mono text-ink">{e.id}</span>
              <span>{fmtDate(e.date)}</span>
              <Link href="/decision-log">Full log</Link>
            </div>
            <p><span className="smallcaps">Context</span><br />{e.context}</p>
            <p><span className="smallcaps">Options</span><br />{e.options.join("; ")}</p>
            <p><span className="smallcaps">Crisp result</span><br />{e.crisp}</p>
            <p><span className="smallcaps">Fuzzy result</span><br />{e.fuzzy}</p>
            <p><span className="smallcaps">Decision</span><br />{e.decision}</p>
            <p><span className="smallcaps">Consequences</span><br />{e.consequences}</p>
          </div>
        ))
      )}

      <h2>Notebook</h2>
      <p>
        {getRepoUrl() ? (
          <a href={`${getRepoUrl()}/blob/main/${m.notebook_path}`} className="mono">{m.notebook_path}</a>
        ) : (
          <span className="mono">{m.notebook_path}</span>
        )}
      </p>

      <div className="rule pt-4 mt-12 flex justify-between ">
        <span>{prev ? <Link href={`/module/${prev.n}`}>Previous: module {prev.n}</Link> : <Link href="/">Status board</Link>}</span>
        <span>{next ? <Link href={`/module/${next.n}`}>Next: module {next.n}</Link> : <Link href="/">Status board</Link>}</span>
      </div>
    </article>
  );
}
