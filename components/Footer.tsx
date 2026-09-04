import { getLastUpdated } from "@/lib/data";
import { fmtDate } from "@/lib/format";

export default function Footer() {
  const updated = getLastUpdated();
  return (
    <footer className="measure px-5 mt-16 mb-10">
      <div className="rule pt-4 text-grey flex flex-wrap justify-between gap-2">
        <span>Haidar Bin Hamid, University of Cincinnati, Fall 2026</span>
        <span>Last updated {fmtDate(updated)}</span>
      </div>
    </footer>
  );
}
