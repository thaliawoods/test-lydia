import raw from "./data/transactions.json";

const transactions = raw;

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-50">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-3xl px-4 py-8">
          <h1 className="text-2xl font-bold text-zinc-900">Transactions</h1>
          <p className="mt-1 text-sm text-zinc-600">
            Search
          </p>
          <p className="mt-4 text-xs text-zinc-500">
            {transactions.length} transactions
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          Content
        </div>
      </main>
    </div>
  );
}
