# DTS Login Test Automation Framework

Automated test suite for login functionality using **JavaScript**, **Selenium WebDriver**, **Mocha**, and **Chai**.

## Target Application

[https://the-internet.herokuapp.com/login](https://the-internet.herokuapp.com/login)

## Prerequisites

- Node.js >= 18
- Google Chrome installed

## Setup & Run

```bash
npm install
npm test
```

Tests run in headless Chrome by default. To run with a visible browser, remove `--headless` from `utils/driverFactory.js`.

## Project Structure

```
├── pages/            # Page Object Model classes
│   └── loginPage.js
├── tests/            # Test specs
│   └── login.test.js
├── utils/            # Utilities (driver factory, logger)
│   ├── driverFactory.js
│   └── logger.js
├── reports/          # Generated HTML reports (after test run)
├── .mocharc.js       # Mocha configuration
└── package.json
```

## Test Coverage

| Scenario | Type |
|----------|------|
| Valid login | Positive |
| Successful logout | Positive |
| Invalid username | Negative |
| Invalid password | Negative |
| Empty credentials | Negative |
| Empty password only | Negative |

## Design Choices

1. **Page Object Model (POM)** — Separates page interactions from test logic for maintainability.
2. **Mocha + Chai** — Familiar BDD-style syntax with readable assertions.
3. **Mochawesome Reporter** — Generates rich HTML reports in `reports/` directory.
4. **Driver Factory** — Centralizes browser setup; easy to add cross-browser support.
5. **Headless by default** — Enables CI/CD execution without a display.
6. **Implicit waits + explicit waits** — Handles dynamic page loads reliably.

## Future Improvements

- Add data-driven testing via external JSON/CSV test data files
- Integrate with CI/CD (GitHub Actions / Jenkins)
- Add screenshot capture on test failure
- Support cross-browser testing (Firefox, Safari)
- Add API-level login tests for faster feedback
- Implement retry logic for flaky tests
- Add environment-based configuration (dev/staging/prod URLs)
