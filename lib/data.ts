import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";

export type Status = "Not started" | "In progress" | "Submitted" | "Reviewed";

export interface Module {
  n: number;
  title: string;
  week_start: string;
  week_end: string;
  status: Status;
  milestone: string;
  deck_url: string;
  notebook_path: string;
  verdict: string;
}

export interface DecisionEntry {
  id: string;
  date: string;
  module: number;
  context: string;
  options: string[];
  crisp: string;
  fuzzy: string;
  decision: string;
  consequences: string;
}

export interface Assumption {
  key: string;
  value: string | number | boolean;
  unit: string;
  module: number | string;
  changed: string;
  note?: string;
}

const dataDir = path.join(process.cwd(), "data");

function readJson<T>(file: string): T {
  return JSON.parse(fs.readFileSync(path.join(dataDir, file), "utf8")) as T;
}

export function getModules(): Module[] {
  return readJson<Module[]>("modules.json").sort((a, b) => a.n - b.n);
}

export function getModule(n: number): Module | undefined {
  return getModules().find((m) => m.n === n);
}

export function getDecisionLog(): DecisionEntry[] {
  return readJson<DecisionEntry[]>("decision-log.json");
}

export function getAssumptions(): Assumption[] {
  const raw = yaml.load(fs.readFileSync(path.join(dataDir, "assumptions.yaml"), "utf8")) as Record<string, any>;
  return Object.entries(raw ?? {}).map(([key, v]) => ({
    key,
    value: v?.value ?? "",
    unit: v?.unit ?? "",
    module: v?.module ?? "",
    changed: v?.changed instanceof Date ? v.changed.toISOString().slice(0, 10) : String(v?.changed ?? ""),
    note: v?.note ?? "",
  }));
}

export function getLastUpdated(): string {
  try {
    const meta = readJson<{ last_updated?: string }>("meta.json");
    if (meta.last_updated) return meta.last_updated;
  } catch {}
  return new Date().toISOString().slice(0, 10);
}

export function syllabusExists(): boolean {
  return fs.existsSync(path.join(process.cwd(), "public", "syllabus.pdf"));
}

export function getRepoUrl(): string {
  try {
    const meta = readJson<{ repo_url?: string }>("meta.json");
    if (meta.repo_url) return meta.repo_url.replace(/\/$/, "");
  } catch {}
  return "";
}
