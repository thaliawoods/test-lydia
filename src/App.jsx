import { useMemo, useState } from "react";
import raw from "./data/transactions.json";
import { SearchInput } from "./components/SearchInput";
import { ListTransactions } from "./components/ListTransactions";
import { normalizeForSearch } from "./lib/utils";

const transactions = raw;

export default function App() {
  const [query, setQuery] = useState("");

  const filteredTransactions = useMemo(() => {
    const q = normalizeForSearch(query);
    if (!q) return transactions;

    return transactions.filter((tx) =>
      normalizeForSearch(tx.label).includes(q),
    );
  }, [query]);

  return (
    <div className="min-h-screen bg-zinc-50">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-3xl px-4 py-8">
          <h1 className="text-2xl font-bold text-zinc-900">Transactions</h1>

          <SearchInput
            value={query}
            onChange={setQuery}
            resultsCount={filteredTransactions.length}
          />
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8">
        <ListTransactions items={filteredTransactions} />
      </main>
    </div>
  );
}
