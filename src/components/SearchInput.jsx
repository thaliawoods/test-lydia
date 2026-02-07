import { useId } from "react";

export function SearchInput({ value, onChange }) {
  const id = useId();

  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-zinc-700"
      >
        Search
      </label>

      <input
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="transactions"
        className="mt-2 w-full rounded-xl border border-zinc-200 bg-white px-3 py-3 text-sm shadow-sm outline-none focus:border-zinc-300 focus:ring-4 focus:ring-zinc-100"
        autoComplete="off"
      />
    </div>
  );
}
