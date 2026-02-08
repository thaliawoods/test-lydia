import { useMemo, useState } from "react";
import { ArrowDownUp } from "lucide-react";
import { Status } from "./Status";
import { formatDateFR } from "../lib/utils";

export function TransactionsTable({ items }) {
  const [sortDir, setSortDir] = useState("desc"); 

  const sorted = useMemo(() => {
    const arr = [...items];

    arr.sort((a, b) => {
      const da = new Date(a.date * 1000).getTime();
      const db = new Date(b.date * 1000).getTime();
      return sortDir === "desc" ? db - da : da - db;
    });

    return arr;
  }, [items, sortDir]);

  if (sorted.length === 0) {
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

        <button
          type="button"
          onClick={() => setSortDir((d) => (d === "desc" ? "asc" : "desc"))}
          className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-zinc-700 ring-1 ring-zinc-200 hover:bg-zinc-50"
        >
          <ArrowDownUp size={16} aria-hidden="true" />
          {sortDir === "desc" ? "Récents" : "Anciens"}
        </button>
      </div>

      <div className="hidden grid-cols-12 gap-3 border-b border-zinc-200 bg-white px-5 py-3 text-xs font-bold text-zinc-500 md:grid">
        <div className="col-span-2">STATUT</div>
        <div className="col-span-2">MONTANT</div>
        <div className="col-span-5">LIBELLÉ</div>
        <div className="col-span-3">DATE</div>
      </div>

      <ul className="divide-y divide-zinc-200">
        {sorted.map((tx) => (
          <li key={tx.paymentId} className="px-5 py-4 hover:bg-zinc-50">
            <div className="hidden md:grid md:grid-cols-12 md:items-center md:gap-3">
              <div className="md:col-span-2">
                <Status status={tx.status} />
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
                <p className="text-sm font-medium text-zinc-700">{formatDateFR(tx.date)}</p>
              </div>
            </div>

            <div className="md:hidden">
              <div className="flex items-center justify-between gap-3">
                <Status status={tx.status} />
                <p className="text-sm font-extrabold text-zinc-900">{tx.amount}</p>
              </div>

              <p className="mt-3 text-sm font-semibold text-zinc-900">{tx.label}</p>

              <p className="mt-1 truncate text-xs text-zinc-500">
                {tx.firstname} {tx.lastname} → {tx.receiverFirstname}
                {tx.receiverLastname ? ` ${tx.receiverLastname}` : ""}
              </p>

              <p className="mt-2 text-sm font-medium text-zinc-700">{formatDateFR(tx.date)}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
