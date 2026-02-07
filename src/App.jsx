import raw from "./data/transactions.json";

const transactions = raw; 

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-50 p-8">
      <h1 className="text-2xl font-bold text-zinc-900">
      Transactions Search
      </h1>
      <p className="mt-2 text-sm text-zinc-600">
        {transactions.length} transactions loaded from JSON file
      </p>
    </div>
  );
}
