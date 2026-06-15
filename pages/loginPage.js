const { By, until } = require("selenium-webdriver");
const Logger = require("../utils/logger");

class LoginPage {
  constructor(driver) {
    this.driver = driver;
    this.url = "http://localhost:3000/login";

    // Locators
    this.usernameInput = By.id("username");
    this.passwordInput = By.id("password");
    this.loginButton = By.css("button[type='submit']");
    this.flashMessage = By.id("flash");
    this.logoutButton = By.css("a[href='/logout']");
  }

  async navigate() {
    Logger.info("Navigating to login page");
    await this.driver.get(this.url);
  }

  async enterUsername(username) {
    Logger.info(`Entering username: ${username}`);
    const element = await this.driver.findElement(this.usernameInput);
    await element.clear();
    await element.sendKeys(username);
  }

  async enterPassword(password) {
    Logger.info("Entering password");
    const element = await this.driver.findElement(this.passwordInput);
    await element.clear();
    await element.sendKeys(password);
  }

  async clickLogin() {
    Logger.info("Clicking login button");
    await this.driver.findElement(this.loginButton).click();
  }

  async login(username, password) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLogin();
  }

  async getFlashMessage() {
    const element = await this.driver.wait(
      until.elementLocated(this.flashMessage),
      5000
    );
    return (await element.getText()).trim();
  }

  async isLogoutButtonDisplayed() {
    try {
      const element = await this.driver.findElement(this.logoutButton);
      return await element.isDisplayed();
    } catch {
      return false;
    }
  }
}

module.exports = LoginPage;
