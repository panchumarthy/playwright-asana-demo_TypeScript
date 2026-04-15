/**
 * Page Object for the Login page.
 * Encapsulates all selectors and actions related to authentication.
 */
class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.submitButton = page.locator('button[type="submit"]');
  }

  async goto() {
    await this.page.goto('https://animated-gingersnap-8cf7f2.netlify.app/');
    await this.page.waitForLoadState('networkidle');
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
    // Wait for the board to appear (sidebar nav is visible after login)
    await this.page.locator('nav').waitFor({ state: 'visible', timeout: 10_000 });
  }
}

module.exports = { LoginPage };
