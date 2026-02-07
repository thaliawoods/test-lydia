import { useState } from "react";
import raw from "./data/transactions.json";
import { SearchInput } from "./components/SearchInput";
import { ListTransactions } from "./components/ListTransactions";

const transactions = raw;

export default function App() {
  const [query, setQuery] = useState("");

  return (
    <div className="min-h-screen bg-zinc-50">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-3xl px-4 py-8">
          <h1 className="text-2xl font-bold text-zinc-900">Transactions</h1>

          <div className="mt-6">
            <SearchInput value={query} onChange={setQuery} />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8">
        <ListTransactions items={transactions} />
      </main>
    </div>
  );
}
