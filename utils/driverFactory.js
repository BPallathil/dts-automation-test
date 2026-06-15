const { Builder } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

class DriverFactory {
  static async createDriver() {
    const options = new chrome.Options();
    options.addArguments("--headless=new", "--no-sandbox", "--disable-dev-shm-usage");

    const driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(options)
      .build();

    await driver.manage().setTimeouts({ implicit: 10000 });
    return driver;
  }
}

module.exports = DriverFactory;
