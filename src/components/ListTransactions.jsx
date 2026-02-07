export function ListTransactions({ items }) {
  return (
    <div className="space-y-2">
      {items.map((tx) => (
        <div
          key={tx.paymentId}
          className="rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 shadow-sm"
        >
          <span className="font-semibold">{tx.amount}</span>
          <span>{tx.label}</span>
        </div>
      ))}
    </div>
  );
}
