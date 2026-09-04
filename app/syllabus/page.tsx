import { syllabusExists } from "@/lib/data";

export const metadata = { title: "Syllabus" };

const grading = [
  ["Final paper", 70],
  ["Weekly updates and decision log", 20],
  ["Progress app", 5],
  ["UC engagement memos", 5],
] as const;

export default function SyllabusPage() {
  const has = syllabusExists();
  return (
    <article className="measure px-5">
      <div className="smallcaps mb-2">Course document</div>
      <h1 className="masthead">Syllabus</h1>
      <p className="text-grey mt-3">
        Mathematical Decision Making in Biomedical Device Development. Reading course, 15 weeks, 31 Aug to 12 Dec 2026. Advisor: Dr. Kelly Cohen, AI Bio Lab.
      </p>

      <h2>Grading</h2>
      <table className="ruled">
        <thead>
          <tr className="smallcaps"><th>Component</th><th className="text-right">Weight</th></tr>
        </thead>
        <tbody>
          {grading.map(([k, v]) => (
            <tr key={k}><td>{k}</td><td className="text-right mono">{v}%</td></tr>
          ))}
          <tr><td className="text-grey">Total</td><td className="text-right mono">100%</td></tr>
        </tbody>
      </table>

      <h2>Full syllabus</h2>
      {has ? (
        <>
          <p><a href="/syllabus.pdf">Open the syllabus PDF</a>.</p>
          <div className="rule">
            <object data="/syllabus.pdf" type="application/pdf" className="w-full" style={{ height: "760px" }}>
              <p className="pt-3 text-grey">Inline preview is not available in this browser. <a href="/syllabus.pdf">Download the PDF</a>.</p>
            </object>
          </div>
        </>
      ) : (
        <p className="text-grey">The syllabus PDF will appear here once <span className="mono">public/syllabus.pdf</span> is added to the repository.</p>
      )}
    </article>
  );
}
