const { expect } = require("chai");
const DriverFactory = require("../utils/driverFactory");
const LoginPage = require("../pages/loginPage");
const Logger = require("../utils/logger");

let server;

before(function (done) {
  const app = require("../app/server");
  server = app.listen ? null : app; // already listening from require
  // Give server a moment to start
  setTimeout(done, 1000);
});

after(function (done) {
  if (server) server.close(done);
  else done();
});

describe("Login Functionality", function () {
  let driver;
  let loginPage;

  beforeEach(async function () {
    Logger.info(`Starting test: ${this.currentTest.title}`);
    driver = await DriverFactory.createDriver();
    loginPage = new LoginPage(driver);
    await loginPage.navigate();
  });

  afterEach(async function () {
    Logger.info(`Finished test: ${this.currentTest.title} - ${this.currentTest.state}`);
    if (driver) await driver.quit();
  });

  // Positive scenarios
  describe("Positive Scenarios", function () {
    it("should login successfully with valid credentials", async function () {
      await loginPage.login("admin", "password123");

      const message = await loginPage.getFlashMessage();
      expect(message).to.contain("You logged into a secure area!");
      expect(await loginPage.isLogoutButtonDisplayed()).to.be.true;
    });

    it("should logout successfully after login", async function () {
      await loginPage.login("admin", "password123");

      const logoutBtn = await driver.findElement(loginPage.logoutButton);
      await logoutBtn.click();

      const message = await loginPage.getFlashMessage();
      expect(message).to.contain("You logged out of the secure area!");
    });
  });

  // Negative scenarios
  describe("Negative Scenarios", function () {
    it("should show error with invalid username", async function () {
      await loginPage.login("invaliduser", "password123");

      const message = await loginPage.getFlashMessage();
      expect(message).to.contain("Your username is invalid!");
    });

    it("should show error with invalid password", async function () {
      await loginPage.login("admin", "wrongpassword");

      const message = await loginPage.getFlashMessage();
      expect(message).to.contain("Your password is invalid!");
    });

    it("should show error with empty credentials", async function () {
      await loginPage.clickLogin();

      const message = await loginPage.getFlashMessage();
      expect(message).to.contain("Your username is invalid!");
    });

    it("should show error with empty password", async function () {
      await loginPage.enterUsername("admin");
      await loginPage.clickLogin();

      const message = await loginPage.getFlashMessage();
      expect(message).to.contain("Your password is invalid!");
    });
  });
});
