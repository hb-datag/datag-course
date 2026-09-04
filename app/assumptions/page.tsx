import { getAssumptions } from "@/lib/data";
import AssumptionsTable from "./AssumptionsTable";

export const metadata = { title: "Assumptions" };

export default function AssumptionsPage() {
  const rows = getAssumptions();
  return (
    <>
      <div className="measure px-5">
        <div className="smallcaps mb-2">Shared parameters</div>
        <h1 className="masthead">Assumptions</h1>
        <p className="text-grey mt-3">
          Every numeric assumption used across the notebooks, with the module that owns it and the date it last changed. The source of truth is <span className="mono">data/assumptions.yaml</span>.
        </p>
      </div>
      <div className="wide px-5 mt-8">
        <AssumptionsTable rows={rows} />
      </div>
    </>
  );
}
