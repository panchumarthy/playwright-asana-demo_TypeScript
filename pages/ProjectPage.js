/**
 * Page Object for the main Project/Board page.
 * Encapsulates navigation and board-inspection actions.
 */
class ProjectPage {
  constructor(page) {
    this.page = page;
  }

  /**
   * Clicks the named project button in the sidebar.
   * Projects render as <button> elements (not <a> links) in the nav.
   * @param {string} projectName - e.g. "Web Application"
   */
  async navigateToProject(projectName) {
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
   * Returns the column container element whose heading matches columnName.
   * Column headings look like: "To Do (2)" — we match by prefix text.
   * @param {string} columnName - e.g. "To Do", "In Progress", "Done"
   */
  getColumn(columnName) {
    return this.page.locator('div.flex.flex-col').filter({
      has: this.page.locator('h2', { hasText: columnName }),
    });
  }

  /**
   * Returns the task card element inside a column that matches the task title.
   * @param {string} columnName
   * @param {string} taskTitle
   */
  getTaskCard(columnName, taskTitle) {
    return this.getColumn(columnName)
      .locator('div.bg-white')
      .filter({ has: this.page.locator('h3', { hasText: taskTitle }) });
  }

  /**
   * Returns all tag texts on a given task card.
   * Tags are <span> elements inside the flex-wrap tag container.
   * @param {import('@playwright/test').Locator} cardLocator
   * @returns {Promise<string[]>}
   */
  async getTagsOnCard(cardLocator) {
    // Tags live inside a div with flex-wrap; they are pill-shaped <span> elements
    const tagSpans = cardLocator.locator('div.flex-wrap span');
    const count = await tagSpans.count();
    const tags = [];
    for (let i = 0; i < count; i++) {
      const text = (await tagSpans.nth(i).innerText()).trim();
      if (text) tags.push(text);
    }
    return tags;
  }
}

module.exports = { ProjectPage };
