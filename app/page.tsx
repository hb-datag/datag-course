import Link from "next/link";
import Masthead from "@/components/Masthead";
import StatusDot from "@/components/StatusDot";
import { getModules, getLastUpdated } from "@/lib/data";
import { fmtDate, fmtRange, pad2 } from "@/lib/format";

export default function StatusBoard() {
  const modules = getModules();
  const submitted = modules.filter((m) => m.status === "Submitted" || m.status === "Reviewed").length;
  const pct = Math.round((submitted / modules.length) * 100);

  return (
    <>
      <Masthead />
      <section className="measure px-5 mt-8">
        <div className="flex justify-between text-grey mb-2">
          <span>
            Progress: <span className="mono text-ink">{submitted}</span> of <span className="mono text-ink">{modules.length}</span> modules submitted
          </span>
          <span>Last updated {fmtDate(getLastUpdated())}</span>
        </div>
        <div className="progress" role="progressbar" aria-valuenow={submitted} aria-valuemin={0} aria-valuemax={modules.length}>
          <span style={{ width: `${pct}%` }} />
        </div>
      </section>

      <section className="wide px-5 mt-10">
        <div className="smallcaps mb-3">Status board</div>
        <div className="overflow-x-auto">
          <table className="ruled min-w-[640px]">
            <thead>
              <tr className="smallcaps">
                <th className="w-10">No.</th>
                <th>Module</th>
                <th className="whitespace-nowrap">Week</th>
                <th className="whitespace-nowrap">Status</th>
                <th>Milestone</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {modules.map((m) => (
                <tr key={m.n}>
                  <td className="mono text-grey">{pad2(m.n)}</td>
                  <td>
                    <Link href={`/module/${m.n}`} className="text-ink hover:text-uc">
                      {m.title}
                    </Link>
                  </td>
                  <td className="whitespace-nowrap text-grey">{fmtRange(m.week_start, m.week_end)}</td>
                  <td>
                    <StatusDot status={m.status} />
                  </td>
                  <td className="text-grey">{m.milestone}</td>
                  <td className="text-right whitespace-nowrap">
                    <Link href={`/module/${m.n}`}>Open</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
