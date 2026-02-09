import { useMemo, useState } from "react";
import raw from "./data/transactions.json";
import { SearchInput } from "./components/SearchInput";
import { TransactionsTable } from "./components/TransactionsTable";
import { buildNgramIndex, searchWithNgrams } from "./lib/ngramIndex";

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

  const ngramIndex = useMemo(() => buildNgramIndex(transactions), []);

  const filteredTransactions = useMemo(() => {
    let list = searchWithNgrams(query, ngramIndex, transactions);

    if (statusFilter !== "all") {
      list = list.filter((tx) => tx.status === statusFilter);
    }

    return list;
  }, [query, statusFilter, ngramIndex]);

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-10">
          <div className="rounded-3xl bg-sky-100/70 p-8 ring-1 ring-sky-200">
            <div className="flex flex-col gap-6">
              <div>
                <p className="text-xs font-extrabold tracking-widest text-slate-700">
                  LYDIA • TRANSACTIONS
                </p>

                <h1 className='[font-family:"Space_Grotesk",system-ui,sans-serif] mt-3 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl'>
                  Transactions
                </h1>

                <div className="mt-6">
                  <SearchInput
                    value={query}
                    onChange={setQuery}
                    resultsCount={filteredTransactions.length}
                  />
                </div>
              </div>

              <div className="mt-2 flex flex-nowrap items-center gap-2">
                {FILTERS.map((f) => (
                  <button
                    key={f.key}
                    type="button"
                    onClick={() => setStatusFilter(f.key)}
                    aria-pressed={statusFilter === f.key}
                    className={`
                      shrink-0 whitespace-nowrap rounded-full ring-1 transition font-semibold
                      px-2.5 py-1.5 text-[13px]
                      sm:px-4 sm:py-2 sm:text-sm
                      ${
                        statusFilter === f.key
                          ? "bg-white text-slate-900 ring-slate-300 shadow-sm"
                          : "bg-white/70 text-slate-700 ring-slate-200 hover:bg-white"
                      }
                    `}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-10">
        <div className="mb-4">
          <h2 className='[font-family:"Space_Grotesk",system-ui,sans-serif] text-lg font-extrabold text-slate-900'>
            Résultats
          </h2>
        </div>

        <TransactionsTable items={filteredTransactions} query={query} />
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-8 text-xs text-slate-500">
          Test Lydia — Thalia Woods
        </div>
      </footer>
    </div>
  );
}
