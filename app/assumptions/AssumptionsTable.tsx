"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import type { Assumption } from "@/lib/data";
import { fmtDate, pad2 } from "@/lib/format";

export default function AssumptionsTable({ rows }: { rows: Assumption[] }) {
  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return rows;
    return rows.filter((r) =>
      [r.key, String(r.value), r.unit, String(r.module), r.changed, r.note ?? ""].join(" ").toLowerCase().includes(s)
    );
  }, [q, rows]);

  return (
    <>
      <div className="measure mb-6 ml-0">
        <label className="smallcaps block mb-1" htmlFor="q">Search</label>
        <input id="q" className="search" placeholder="key, unit, module, note" value={q} onChange={(e) => setQ(e.target.value)} />
      </div>
      <div className="overflow-x-auto">
        <table className="ruled min-w-[640px]">
          <thead>
            <tr className="smallcaps">
              <th>Key</th>
              <th>Value</th>
              <th>Unit</th>
              <th>Owner</th>
              <th>Last changed</th>
              <th>Note</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.key}>
                <td className="mono">{r.key}</td>
                <td className="mono">{String(r.value)}</td>
                <td className="text-grey">{r.unit}</td>
                <td>{r.module ? <Link href={`/module/${r.module}`}>Module <span className="mono">{pad2(Number(r.module))}</span></Link> : ""}</td>
                <td className="text-grey whitespace-nowrap">{fmtDate(r.changed)}</td>
                <td className="text-grey">{r.note}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={6} className="text-grey">No assumptions match.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
