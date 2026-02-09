import { test, expect } from "@playwright/test";

const sel = {
  input: 'input[placeholder="Rechercher une transaction…"]',
  counter: 'p[aria-live="polite"]',
  rows: "ul > li",
};

async function getCountText(page) {
  return ((await page.locator(sel.counter).textContent()) ?? "").trim();
}

async function getRowCount(page) {
  return await page.locator(sel.rows).count();
}

test("Recherche: case-insensitive (Paiement vs paiement => même résultats)", async ({ page }) => {
  await page.goto("/");

  const input = page.locator(sel.input);

  await input.fill("Paiement");
  const count1 = await getCountText(page);

  await input.fill("paiement");
  const count2 = await getCountText(page);

  expect(count1).toBe(count2);
  expect(await getRowCount(page)).toBeGreaterThan(0);
});

test("Recherche vide => liste non vide + compteur visible", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator(sel.counter)).toBeVisible();
  expect(await getRowCount(page)).toBeGreaterThan(0);
});

test("Bouton Effacer: disabled quand vide, actif quand rempli, puis reset", async ({ page }) => {
  await page.goto("/");

  const input = page.locator(sel.input);
  const clearBtn = page.getByRole("button", { name: "Effacer la recherche" });

  await expect(clearBtn).toBeDisabled();

  await input.fill("test");
  await expect(clearBtn).toBeEnabled();

  await clearBtn.click();
  await expect(input).toHaveValue("");
  await expect(clearBtn).toBeDisabled();
});

test("No results: une recherche impossible affiche l'état vide", async ({ page }) => {
  await page.goto("/");

  const input = page.locator(sel.input);
  await input.fill("zzzzzzzzzzzzzzzz");

  await expect(page.getByText("Pas de résultat")).toBeVisible();
});

test("Filtre statut: Annulé => toutes les lignes affichées contiennent 'Annulé' (si résultats)", async ({
  page,
}) => {
  await page.goto("/");

  await page.getByRole("button", { name: "Annulé" }).click();

  const rows = page.locator(sel.rows);
  const n = await rows.count();

  if (n === 0) return;

  for (let i = 0; i < n; i++) {
    await expect(rows.nth(i)).toContainText("Annulé");
  }
});
