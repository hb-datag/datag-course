export default function Masthead({ small = false }: { small?: boolean }) {
  return (
    <header className="measure px-5">
      <div className="smallcaps mb-2">Reading course, 15 weeks, 31 Aug to 12 Dec 2026</div>
      <h1 className={small ? "font-display text-[1.6rem] leading-tight" : "masthead"}>
        Mathematical Decision Making in Biomedical Device Development
      </h1>
      <p className="mt-3 mb-0">Haidar Bin Hamid</p>
      <p className="text-grey mb-0">PhD Student, Biomedical Engineering, University of Cincinnati</p>
      <p className="text-grey">Advisor: Dr. Kelly Cohen, AI Bio Lab</p>
    </header>
  );
}
