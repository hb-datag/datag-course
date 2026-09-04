import Link from "next/link";
export default function NotFound() {
  return (
    <div className="measure px-5">
      <h1 className="masthead">Not found</h1>
      <p>That page does not exist. <Link href="/">Return to the status board</Link>.</p>
    </div>
  );
}
