/**
 * Data-driven Playwright test suite for the Demo App (Asana-like board).
 *
 * All six test scenarios are driven from a single JSON dataset in
 * data/testData.js — adding a new scenario requires only a new data entry,
 * not new test code.
 */

const { test, expect } = require('@playwright/test');
const { testCases } = require('../data/testData');
const { LoginPage } = require('../pages/LoginPage');
const { ProjectPage } = require('../pages/ProjectPage');

const CREDENTIALS = {
  username: 'admin',
  password: 'password123',
};

for (const { id, project, task, column, tags } of testCases) {
  test(`[${id}] "${task}" appears in "${column}" column of "${project}" with correct tags`, async ({ page }) => {
    const loginPage = new LoginPage(page);
    const projectPage = new ProjectPage(page);

    // ── Step 1: Login ──────────────────────────────────────────────────────
    await loginPage.goto();
    await loginPage.login(CREDENTIALS.username, CREDENTIALS.password);

    // ── Step 2: Navigate to the target project ─────────────────────────────
    await projectPage.navigateToProject(project);

    // ── Step 3: Locate the task card inside the expected column ────────────
    const card = projectPage.getTaskCard(column, task);
    await expect(card).toBeVisible({
      timeout: 10_000,
    });

    // ── Step 4: Verify every expected tag is present on the card ──────────
    const actualTags = await projectPage.getTagsOnCard(card);
    for (const expectedTag of tags) {
      expect(actualTags).toContain(expectedTag);
    }
  });
}
