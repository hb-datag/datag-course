const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function fmtDate(iso: string): string {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

export function fmtRange(a: string, b: string): string {
  const [ya, ma, da] = a.split("-").map(Number);
  const [yb, mb, db] = b.split("-").map(Number);
  if (ma === mb) return `${da} to ${db} ${MONTHS[ma - 1]}`;
  return `${da} ${MONTHS[ma - 1]} to ${db} ${MONTHS[mb - 1]}`;
}

export function pad2(n: number): string {
  return n.toString().padStart(2, "0");
}
