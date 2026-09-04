"use client";
import { Fragment, useState } from "react";
import Link from "next/link";
import type { DecisionEntry } from "@/lib/data";
import { fmtDate, pad2 } from "@/lib/format";

function clip(s: string, n = 90) {
  return s.length > n ? s.slice(0, n).trimEnd() + "…" : s;
}

export default function DecisionTable({ entries }: { entries: DecisionEntry[] }) {
  const [open, setOpen] = useState<string | null>(null);
  if (entries.length === 0) return <p className="text-grey">No entries yet.</p>;
  return (
    <>
    <div className="md:hidden">
      {entries.map((e) => (
        <div key={e.id} className="rule pt-4 mb-6">
          <div className="flex flex-wrap gap-x-4 text-grey mb-2">
            <span className="mono text-ink">{e.id}</span>
            <span>{fmtDate(e.date)}</span>
            <Link href={`/module/${e.module}`}>Module {e.module}</Link>
          </div>
          <p><span className="smallcaps">Context</span><br />{e.context}</p>
          <p><span className="smallcaps">Options</span></p>
          <ol className="list-decimal ml-5 mb-4">{e.options.map((o, i) => <li key={i}>{o}</li>)}</ol>
          <p><span className="smallcaps">Crisp result</span><br />{e.crisp}</p>
          <p><span className="smallcaps">Fuzzy result</span><br />{e.fuzzy}</p>
          <p><span className="smallcaps">Decision</span><br />{e.decision}</p>
          <p><span className="smallcaps">Consequences</span><br />{e.consequences}</p>
        </div>
      ))}
    </div>
    <div className="overflow-x-auto hidden md:block">
      <table className="ruled min-w-[880px]">
        <thead>
          <tr className="smallcaps">
            <th>ID</th>
            <th>Date</th>
            <th>Mod.</th>
            <th>Context</th>
            <th>Options</th>
            <th>Crisp</th>
            <th>Fuzzy</th>
            <th>Decision</th>
            <th>Consequences</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((e) => {
            const isOpen = open === e.id;
            return (
              <Fragment key={e.id}>
                <tr
                  onClick={() => setOpen(isOpen ? null : e.id)}
                  className="cursor-pointer hover:bg-[#faf9f7]"
                  aria-expanded={isOpen}
                >
                  <td className="mono whitespace-nowrap">{e.id}</td>
                  <td className="whitespace-nowrap text-grey">{fmtDate(e.date)}</td>
                  <td className="mono text-grey">{pad2(e.module)}</td>
                  <td>{isOpen ? e.context : clip(e.context)}</td>
                  <td>{isOpen ? e.options.join("; ") : clip(e.options.join("; "), 60)}</td>
                  <td>{isOpen ? e.crisp : clip(e.crisp, 60)}</td>
                  <td>{isOpen ? e.fuzzy : clip(e.fuzzy, 60)}</td>
                  <td>{isOpen ? e.decision : clip(e.decision, 50)}</td>
                  <td>{isOpen ? e.consequences : clip(e.consequences, 60)}</td>
                </tr>
                {isOpen && (
                  <tr className="expand">
                    <td colSpan={9}>
                      <div className="grid gap-x-8 gap-y-2 md:grid-cols-2 py-2">
                        <div><span className="smallcaps">Options</span>
                          <ol className="list-decimal ml-5 mt-1">{e.options.map((o, i) => <li key={i}>{o}</li>)}</ol>
                        </div>
                        <div>
                          <div><span className="smallcaps">Module</span> <Link href={`/module/${e.module}`}>Module {e.module}</Link></div>
                          <div className="mt-2"><span className="smallcaps">Decision</span><br />{e.decision}</div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
    </>
  );
}
