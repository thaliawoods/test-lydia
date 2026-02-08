import { CheckCircle2, Clock3, XCircle } from "lucide-react";

const base =
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1";

export function Status({ status }) {
  if (status === "completed") {
    return (
      <span className={`${base} bg-emerald-50 text-emerald-700 ring-emerald-200`}>
        <CheckCircle2 size={14} aria-hidden="true" />
        Validé
      </span>
    );
  }

  if (status === "pending") {
    return (
      <span className={`${base} bg-amber-50 text-amber-800 ring-amber-200`}>
        <Clock3 size={14} aria-hidden="true" />
        En cours
      </span>
    );
  }

  return (
    <span className={`${base} bg-rose-50 text-rose-700 ring-rose-200`}>
      <XCircle size={14} aria-hidden="true" />
      Annulé
    </span>
  );
}
