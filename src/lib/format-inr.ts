// AtomCode — INR money formatting (shared by server + client surfaces).
// All billing amounts on the platform are Indian Rupees, collected as
// cash by the institution, so every money render goes through here.

const base = (n: number) =>
  new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(n);

/** ₹1,50,000 — full Indian grouping, no decimals (paise are never billed). */
export function formatINR(n: number): string {
  return `₹${base(n)}`;
}

/** ₹1.5L / ₹2Cr — compact axis/tick form (en-IN short scale). */
export function formatINRCompact(n: number): string {
  if (n === 0) return "₹0";
  return `₹${new Intl.NumberFormat("en-IN", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(n)}`;
}
