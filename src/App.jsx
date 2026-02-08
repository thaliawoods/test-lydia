// src/App.jsx
import { useMemo, useState } from "react";
import raw from "./data/transactions.json";
import { SearchInput } from "./components/SearchInput";
import { TransactionsTable } from "./components/TransactionsTable";
import { normalizeForSearch } from "./lib/utils";

const transactions = raw;

const FILTERS = [
  { key: "all", label: "Tous" },
  { key: "completed", label: "Validé" },
  { key: "pending", label: "En cours" },
  { key: "canceled", label: "Annulé" },
];

export default function App() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredTransactions = useMemo(() => {
    let list = transactions;

    const q = normalizeForSearch(query);
    if (q) {
      list = list.filter((tx) => normalizeForSearch(tx.label).includes(q));
    }

    if (statusFilter !== "all") {
      list = list.filter((tx) => tx.status === statusFilter);
    }

    return list;
  }, [query, statusFilter]);

  return (
    <div className="min-h-screen bg-zinc-50">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-3xl px-4 py-8">
          <h1 className="text-2xl font-bold text-zinc-900">Transactions</h1>

          <div className="mt-6">
            <SearchInput
              value={query}
              onChange={setQuery}
              resultsCount={filteredTransactions.length}
            />
          </div>

          <div className="mt-4 flex flex-nowrap items-center gap-2 overflow-x-auto pb-1">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                type="button"
                onClick={() => setStatusFilter(f.key)}
                className={[
                  "shrink-0 whitespace-nowrap rounded-full px-2.5 py-1.5 text-[13px] font-semibold ring-1 transition sm:px-4 sm:py-2 sm:text-sm",
                  statusFilter === f.key
                    ? "bg-white text-zinc-900 ring-zinc-300 shadow-sm"
                    : "bg-white/70 text-zinc-700 ring-zinc-200 hover:bg-white",
                ].join(" ")}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8">
        <TransactionsTable items={filteredTransactions} query={query} />
      </main>
    </div>
  );
}
