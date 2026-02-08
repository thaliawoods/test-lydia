import { useId } from "react";
import { Search, X } from "lucide-react";

export function SearchInput({ value, onChange, resultsCount }) {
  const id = useId();
  const hasValue = value.trim().length > 0;

  return (
    <div className="w-full">
      <label htmlFor={id} className="block text-sm font-medium text-zinc-700">
        Rechercher
      </label>

      <div className="mt-2 flex w-full flex-col gap-3 sm:flex-row sm:items-stretch">
        <div className="relative flex-1 min-w-0">
          <Search
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
            aria-hidden="true"
          />
          <input
            id={id}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Rechercher une transaction…"
            autoComplete="off"
            className="w-full rounded-2xl border border-zinc-200 bg-white py-4 pl-11 pr-4 text-sm shadow-sm outline-none placeholder:text-zinc-400 focus:border-zinc-300 focus:ring-4 focus:ring-zinc-100"
          />
        </div>

        <button
          type="button"
          onClick={() => onChange("")}
          disabled={!hasValue}
          className={`inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-4 text-sm font-semibold ring-1 transition sm:w-[140px] ${
            hasValue
              ? "bg-white text-zinc-800 ring-zinc-300 hover:bg-zinc-50 focus:outline-none focus:ring-4 focus:ring-zinc-200"
              : "cursor-not-allowed bg-white/60 text-zinc-400 ring-zinc-200"
          }`}
          aria-label="Effacer la recherche"
        >
          <X size={18} aria-hidden="true" />
          Effacer
        </button>
      </div>

      <p className="mt-2 text-xs text-zinc-500" aria-live="polite">
        {resultsCount} résultat{resultsCount > 1 ? "s" : ""}
      </p>
    </div>
  );
}
