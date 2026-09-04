import type { Status } from "@/lib/data";

const cls: Record<Status, string> = {
  "Not started": "dot-not",
  "In progress": "dot-prog",
  Submitted: "dot-sub",
  Reviewed: "dot-rev",
};

export default function StatusDot({ status }: { status: Status }) {
  return (
    <span className="whitespace-nowrap">
      <span className={`dot ${cls[status] ?? "dot-not"}`} aria-hidden="true" />
      {status}
    </span>
  );
}
