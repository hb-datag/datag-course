import { getDecisionLog } from "@/lib/data";
import DecisionTable from "./DecisionTable";

export const metadata = { title: "Decision log" };

export default function DecisionLogPage() {
  const entries = getDecisionLog();
  return (
    <>
      <div className="measure px-5">
        <div className="smallcaps mb-2">Architecture decision records</div>
        <h1 className="masthead">Decision log</h1>
        <p className="text-grey mt-3">
          One entry per consequential decision. Each records the crisp (deterministic) result and the fuzzy result side by side, then the decision actually taken. Select a row to expand it.
        </p>
      </div>
      <div className="wide px-5 mt-8">
        <DecisionTable entries={entries} />
      </div>
    </>
  );
}
