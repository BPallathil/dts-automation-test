const DriverFactory = require("./utils/driverFactory");
const LoginPage = require("./pages/loginPage");
const Logger = require("./utils/logger");

(async function runDemo() {
  // Start local server
  require("./app/server");
  await new Promise((r) => setTimeout(r, 1000));

  let driver;
  try {
    driver = await DriverFactory.createDriver();
    const loginPage = new LoginPage(driver);

    await loginPage.navigate();
    Logger.info("Login page loaded");

    await loginPage.login("admin", "password123");
    const message = await loginPage.getFlashMessage();
    Logger.info(`Result: ${message}`);

    Logger.info("Login demo completed successfully!");
  } catch (error) {
    Logger.error(`Demo failed: ${error.message}`);
  } finally {
    if (driver) await driver.quit();
    process.exit(0);
  }
})();
