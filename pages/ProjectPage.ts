import { Page, Locator } from '@playwright/test';

/**
 * Page Object for the main Project/Board page.
 * Encapsulates navigation and board-inspection actions.
 */
export class ProjectPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Clicks the named project button in the sidebar.
   * Projects render as <button> elements (not <a> links) in the nav.
   */
  async navigateToProject(projectName: string): Promise<void> {
    await this.page
      .locator('nav button')
      .filter({ has: this.page.locator('h2', { hasText: projectName }) })
      .click();
    // Wait for the board header to update to the selected project
    await this.page
      .locator('header h1', { hasText: projectName })
      .waitFor({ state: 'visible', timeout: 10_000 });
  }

  /**
   * Returns the column container whose heading matches columnName.
   * Column headings look like: "To Do (2)" — matched by prefix text.
   */
  getColumn(columnName: string): Locator {
    return this.page.locator('div.flex.flex-col').filter({
      has: this.page.locator('h2', { hasText: columnName }),
    });
  }

  /**
   * Returns the task card element inside a column that matches the task title.
   */
  getTaskCard(columnName: string, taskTitle: string): Locator {
    return this.getColumn(columnName)
      .locator('div.bg-white')
      .filter({ has: this.page.locator('h3', { hasText: taskTitle }) });
  }

  /**
   * Returns all tag texts on a given task card.
   * Tags are <span> elements inside the flex-wrap tag container.
   */
  async getTagsOnCard(cardLocator: Locator): Promise<string[]> {
    const tagSpans = cardLocator.locator('div.flex-wrap span');
    const count = await tagSpans.count();
    const tags: string[] = [];
    for (let i = 0; i < count; i++) {
      const text = (await tagSpans.nth(i).innerText()).trim();
      if (text) tags.push(text);
    }
    return tags;
  }
}
