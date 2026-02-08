import { useId } from "react";
import { Search, X } from "lucide-react";

export function SearchInput({ value, onChange, resultsCount }) {
  const id = useId();
  const hasValue = value.trim().length > 0;

  return (
    <div className="w-full">
      <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-stretch">
        <div className="relative flex-1 min-w-0">
          <Search
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          />
          <input
            id={id}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Rechercher une transaction…"
            autoComplete="off"
            className="w-full rounded-2xl border border-slate-200 bg-white py-4 pl-11 pr-4 text-sm shadow-sm outline-none placeholder:text-slate-400 focus:border-slate-300 focus:ring-4 focus:ring-sky-100"
          />
        </div>

        <button
          type="button"
          onClick={() => onChange("")}
          disabled={!hasValue}
          className={`inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-4 text-sm font-semibold ring-1 transition sm:w-[140px] ${
            hasValue
              ? "bg-white text-slate-800 ring-slate-300 hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-200"
              : "bg-white/60 text-slate-400 ring-slate-200 cursor-not-allowed"
          }`}
          aria-label="Effacer la recherche"
        >
          <X size={18} aria-hidden="true" />
          Effacer
        </button>
      </div>

      <p className="mt-2 text-xs text-slate-600" aria-live="polite">
        {resultsCount} résultat{resultsCount > 1 ? "s" : ""}
      </p>
    </div>
  );
}
