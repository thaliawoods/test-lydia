import { useId } from "react";

export function SearchInput({ value, onChange, resultsCount }) {
  const id = useId();

  return (
    <div className="w-full">
      <label htmlFor={id} className="block text-sm font-medium text-zinc-700">
        Rechercher
      </label>

      <div className="mt-2 flex items-center gap-2">
        <input
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="transactions"
          className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-3 text-sm shadow-sm outline-none focus:border-zinc-300 focus:ring-4 focus:ring-zinc-100"
          autoComplete="off"
        />

        {value.trim().length > 0 && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="rounded-md border-2 border-white bg-transparent px-4 py-2 text-sm font-medium text-white hover:bg-white/10 focus:outline-none"
          >
            Effacer
          </button>
        )}
      </div>

      <p className="mt-2 text-xs text-zinc-500" aria-live="polite">
        {resultsCount} résultat{resultsCount > 1 ? "s" : ""}
      </p>
    </div>
  );
}
