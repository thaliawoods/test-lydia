import { normalizeForSearch } from "../lib/utils";

const N = 3; 

export function buildNgramIndex(transactions) {
  const index = new Map();

  for (const tx of transactions) {
    const text = normalizeForSearch(tx.label);
    if (text.length < N) continue;

    const seen = new Set();

    for (let i = 0; i <= text.length - N; i++) {
      const gram = text.slice(i, i + N);
      if (seen.has(gram)) continue;
      seen.add(gram);

      if (!index.has(gram)) index.set(gram, new Set());
      index.get(gram).add(tx.paymentId);
    }
  }

  return index;
}

export function searchWithNgrams(query, index, transactions) {
  const q = normalizeForSearch(query);

  if (!q) return transactions;

  if (q.length < N) {
    return transactions.filter((tx) =>
      normalizeForSearch(tx.label).includes(q)
    );
  }

  const grams = [];
  for (let i = 0; i <= q.length - N; i++) {
    grams.push(q.slice(i, i + N));
  }

  let candidateIds = null;

  for (const g of grams) {
    const ids = index.get(g);
    if (!ids) return [];

    if (candidateIds === null) {
      candidateIds = new Set(ids);
    } else {
      candidateIds = new Set([...candidateIds].filter((id) => ids.has(id)));
      if (candidateIds.size === 0) return [];
    }
  }

  return transactions.filter(
    (tx) =>
      candidateIds.has(tx.paymentId) &&
      normalizeForSearch(tx.label).includes(q)
  );
}
