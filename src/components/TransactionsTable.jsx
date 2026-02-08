export function TransactionsTable({ items }) {
  if (items.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-zinc-200 bg-white p-10 text-center">
        <p className="text-sm font-bold text-zinc-900">Pas de résultat</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm">
      <div className="flex items-center justify-between gap-3 border-b border-zinc-200 bg-white px-5 py-4">
        <p className="text-sm font-extrabold tracking-wide text-zinc-500">RÉSULTATS</p>
      </div>

      <div className="hidden grid-cols-12 gap-3 border-b border-zinc-200 bg-white px-5 py-3 text-xs font-bold text-zinc-500 md:grid">
        <div className="col-span-2">STATUT</div>
        <div className="col-span-2">MONTANT</div>
        <div className="col-span-5">LIBELLÉ</div>
        <div className="col-span-3">DATE</div>
      </div>

      <ul className="divide-y divide-zinc-200">
        {items.map((tx) => (
          <li key={tx.paymentId} className="px-5 py-4 hover:bg-zinc-50">
            <div className="hidden md:grid md:grid-cols-12 md:items-center md:gap-3">
              <div className="md:col-span-2">
                <span className="text-xs font-semibold text-zinc-500">—</span>
              </div>

              <div className="md:col-span-2">
                <p className="text-sm font-extrabold text-zinc-900">{tx.amount}</p>
              </div>

              <div className="md:col-span-5 min-w-0">
                <p className="truncate text-sm font-semibold text-zinc-900">{tx.label}</p>
                <p className="mt-1 truncate text-xs text-zinc-500">
                  {tx.firstname} {tx.lastname} → {tx.receiverFirstname}
                  {tx.receiverLastname ? ` ${tx.receiverLastname}` : ""}
                </p>
              </div>

              <div className="md:col-span-3">
                <p className="text-sm font-medium text-zinc-700">—</p>
              </div>
            </div>

            <div className="md:hidden">
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-semibold text-zinc-500">—</span>
                <p className="text-sm font-extrabold text-zinc-900">{tx.amount}</p>
              </div>

              <p className="mt-3 text-sm font-semibold text-zinc-900">{tx.label}</p>

              <p className="mt-1 truncate text-xs text-zinc-500">
                {tx.firstname} {tx.lastname} → {tx.receiverFirstname}
                {tx.receiverLastname ? ` ${tx.receiverLastname}` : ""}
              </p>

              <p className="mt-2 text-sm font-medium text-zinc-700">—</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
