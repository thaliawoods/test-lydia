import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { AlertTriangle, ArrowDownUp } from "lucide-react";
import { Status } from "./Status";
import { formatDateFR } from "../lib/utils";

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function highlight(label, query) {
  const q = (query ?? "").trim();
  if (!q) return label;

  const re = new RegExp(`(${escapeRegExp(q)})`, "ig");
  const parts = label.split(re);

  return parts.map((part, i) => {
    const isMatch = part.toLowerCase() === q.toLowerCase();
    if (!isMatch) return <span key={i}>{part}</span>;

    return (
      <mark key={i} className="rounded bg-sky-100 px-1 text-zinc-900">
        {part}
      </mark>
    );
  });
}

const errorFR = {
  "Canceled by the user": "Annulé par l’utilisateur",
  "User ask for a reimbursement": "Demande de remboursement",
};

function measureTextWidth(text) {
  const el = document.createElement("span");
  el.textContent = text;
  el.style.position = "fixed";
  el.style.left = "-9999px";
  el.style.top = "-9999px";
  el.style.whiteSpace = "nowrap";
  el.style.fontSize = "12px";
  el.style.fontWeight = "500";
  el.style.fontFamily =
    'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial';
  document.body.appendChild(el);
  const w = el.getBoundingClientRect().width;
  document.body.removeChild(el);
  return w;
}

function TooltipPortal({ open, anchorRect, text }) {
  if (!open || !anchorRect || !text) return null;

  const gap = 10;
  const centerX = anchorRect.left + anchorRect.width / 2;
  const top = Math.max(12, anchorRect.top - gap);

  return createPortal(
    <div
      className="fixed z-[9999]"
      style={{
        left: centerX,
        top,
        transform: "translate(-50%, -100%) translateX(52px)",
        pointerEvents: "none",
      }}
      role="tooltip"
    >
      <div className="relative inline-block">
        <div className="inline-flex items-center gap-2 whitespace-nowrap rounded-2xl bg-white px-4 py-3 text-xs font-medium text-zinc-700 shadow-xl ring-1 ring-zinc-200">
          <AlertTriangle
            size={16}
            className="shrink-0 -translate-y-[0.5px] text-rose-500"
            aria-hidden="true"
          />
          <span className="whitespace-nowrap leading-snug">{text}</span>
        </div>

        <div
          className="absolute h-3 w-3 rotate-45 bg-white shadow-xl"
          style={{
            left: "calc(50% - 52px - 6px)",
            top: "100%",
            marginTop: -8,
          }}
          aria-hidden="true"
        />
      </div>
    </div>,
    document.body
  );
}

export function TransactionsTable({ items, query }) {
  const [sortDir, setSortDir] = useState("desc");

  const [tooltip, setTooltip] = useState({
    open: false,
    rect: null,
    text: "",
  });

  const sorted = useMemo(() => {
    const arr = [...items];
    arr.sort((a, b) => {
      const da = new Date(a.date * 1000).getTime();
      const db = new Date(b.date * 1000).getTime();
      return sortDir === "desc" ? db - da : da - db;
    });
    return arr;
  }, [items, sortDir]);

  useEffect(() => {
    if (!tooltip.open) return;

    const close = () => setTooltip((t) => ({ ...t, open: false }));
    window.addEventListener("scroll", close, true);
    window.addEventListener("resize", close);

    return () => {
      window.removeEventListener("scroll", close, true);
      window.removeEventListener("resize", close);
    };
  }, [tooltip.open]);

  if (sorted.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-zinc-200 bg-white p-10 text-center">
        <p className="text-sm font-bold text-zinc-900">Pas de résultat</p>
        <p className="mt-2 text-sm text-zinc-600">
          Essaie un autre mot-clé (ex : <span className="font-semibold">Paiement</span>).
        </p>
      </div>
    );
  }

  return (
    <>
      <TooltipPortal
        open={tooltip.open}
        anchorRect={tooltip.rect}
        text={tooltip.text}
      />

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
          {sorted.map((tx) => {
            const err =
              tx.status === "canceled" && tx.statusErrorDisplay
                ? errorFR[tx.statusErrorDisplay] ?? tx.statusErrorDisplay
                : null;

            const showTooltip = (e) => {
              if (!err) return;

              const rect = e.currentTarget.getBoundingClientRect();

              const paddingX = 32;
              const iconW = 16;
              const gapInside = 8;

              const minW = 180;
              const maxW = Math.min(700, window.innerWidth - 24);

              const textW = measureTextWidth(err);
              const w = Math.min(maxW, Math.max(minW, paddingX + iconW + gapInside + textW));

              setTooltip({ open: true, rect, text: err, width: w });
            };

            const hideTooltip = () => {
              if (!err) return;
              setTooltip((t) => ({ ...t, open: false }));
            };

            return (
              <li key={tx.paymentId} className="px-5 py-4 hover:bg-zinc-50">
                <div className="hidden md:grid md:grid-cols-12 md:items-center md:gap-3">
                  <div className="md:col-span-2">
                    <span
                      className="inline-flex"
                      onMouseEnter={showTooltip}
                      onMouseLeave={hideTooltip}
                      onFocus={showTooltip}
                      onBlur={hideTooltip}
                      tabIndex={err ? 0 : -1}
                    >
                      <Status status={tx.status} />
                    </span>
                  </div>

                  <div className="md:col-span-2">
                    <p className="text-sm font-extrabold text-zinc-900">{tx.amount}</p>
                  </div>

                  <div className="md:col-span-5 min-w-0">
                    <p className="truncate text-sm font-semibold text-zinc-900">
                      {highlight(tx.label, query)}
                    </p>
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
                    <span
                      className="inline-flex"
                      onMouseEnter={showTooltip}
                      onMouseLeave={hideTooltip}
                      onFocus={showTooltip}
                      onBlur={hideTooltip}
                      tabIndex={err ? 0 : -1}
                    >
                      <Status status={tx.status} />
                    </span>

                    <p className="text-sm font-extrabold text-zinc-900">{tx.amount}</p>
                  </div>

                  <p className="mt-3 text-sm font-semibold text-zinc-900">
                    {highlight(tx.label, query)}
                  </p>

                  <p className="mt-1 truncate text-xs text-zinc-500">
                    {tx.firstname} {tx.lastname} → {tx.receiverFirstname}
                    {tx.receiverLastname ? ` ${tx.receiverLastname}` : ""}
                  </p>

                  <p className="mt-2 text-sm font-medium text-zinc-700">{formatDateFR(tx.date)}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
