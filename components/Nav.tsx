import Link from "next/link";

const items = [
  ["/", "Status"],
  ["/decision-log", "Decision log"],
  ["/assumptions", "Assumptions"],
  ["/syllabus", "Syllabus"],
];

export default function Nav() {
  return (
    <nav className="measure px-5 pt-6 pb-4 flex flex-wrap gap-x-7 gap-y-2 smallcaps text-[1.05rem]">
      {items.map(([href, label]) => (
        <Link key={href} href={href} className="text-grey hover:text-ink no-underline py-2 inline-block" style={{ textDecoration: "none" }}>
          {label}
        </Link>
      ))}
    </nav>
  );
}
