# CBRE Playwright Test Suite

This repository contains automated end-to-end tests for the CBRE UK website using Playwright. The tests cover key functionalities such as homepage navigation, services page interactions, and property search features.

## Features

### Test Scenarios

The test suite includes the following scenarios:

#### Scenario 1: Homepage Tests
- **TC1: Verify Home Page Title**
  - Navigates to the CBRE UK homepage
  - Verifies the page title contains "CBRE"

- **TC2: Verify Home Page Navigation Menu**
  - Checks that all navigation menu items are present and functional

#### Scenario 2: Services Page Tests
- **SC01: All Service Categories Are Visible and Navigate to Sub-Pages**
  - Tests the following service categories:
    - Invest (Finance & Value)
    - Plan (Lease & Occupy)
    - Design (Design & Build)
    - Manage (Manage Properties & Portfolios)
    - Transform (Transform Business Outcomes)
  - Verifies each category card is visible, enabled, and navigates correctly when clicked

#### Scenario 3: Property Search Functionality
- **TC01: Verify Search for Property**
  - Searches for properties in "Aberdeen, UK"
  - Filters by transaction type: "For-Sale"
  - Filters by property type: "Industrial"
  - Verifies that search results contain "Aberdeen"

## Prerequisites

- Node.js (version 16 or higher)
- npm (comes with Node.js)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yyogesh281988/CBRE_PlayWright.git
   cd CBRE_PlayWright
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests in headed mode (visible browser)
```bash
npx playwright test --headed
```

### Run specific test file
```bash
npx playwright test tests/Scenario1.homepage.spec.js
```

### Run tests with specific browser
```bash
npx playwright test --project=chrome
```

### Generate and view test report
```bash
npx playwright show-report
```

## Project Structure

```
CBRE_PlayWright/
├── pages/                 # Page Object Model classes
│   ├── HomePage.js       # Homepage interactions
│   ├── ServicesPage.js   # Services page interactions
│   └── FindProperty.js   # Property search page interactions
├── tests/                # Test specifications
│   ├── Scenario1.homepage.spec.js
│   ├── Scenario2.Searvices.spec.js
│   └── Scenario3.PropertySearch.spec.js
├── playwright.config.js  # Playwright configuration
├── package.json          # Project dependencies and scripts
└── README.md            # This file
```

## CI/CD with GitHub Actions

This project uses GitHub Actions for continuous integration. The workflow (`.github/workflows/playwright.yml`) automatically runs tests on every push and pull request to the `main` and `master` branches.

### Workflow Details:
- **Trigger**: Push or pull request to `main`/`master` branches
- **Environment**: Ubuntu latest
- **Node.js Version**: Latest LTS
- **Steps**:
  1. Checkout code
  2. Setup Node.js
  3. Install dependencies (`npm ci`)
  4. Install Playwright browsers (`npx playwright install --with-deps`)
  5. Run tests (`npm test`)
  6. Upload test report artifacts (30-day retention)

### Local CI Simulation
To simulate the CI environment locally:
```bash
CI=true npm test
```

## Configuration

The Playwright configuration (`playwright.config.js`) includes:
- Test timeout: 60 seconds
- Retries: 2 on CI, 0 locally
- Workers: 1 on CI, unlimited locally
- Headless mode: Enabled on CI, disabled locally
- Browser: Chromium (Chrome)
- Tracing: Enabled on first retry
- User agent and viewport: Configured to mimic real browser behavior

## Page Object Model

The tests use the Page Object Model pattern for better maintainability:
- `HomePage`: Handles homepage interactions (navigation, cookies)
- `ServicesPage`: Manages services page functionality
- `FindProperty`: Handles property search operations

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## Troubleshooting

### Common Issues:
- **Tests failing in CI but passing locally**: This may be due to headless mode differences. Try running tests with `--headed` locally to debug.
- **Element not found errors**: The website structure may have changed. Update selectors in the page objects.
- **Timeout errors**: Increase timeout values in `playwright.config.js` or add more robust waits.

### Debugging:
- Use `await page.pause()` in tests for interactive debugging
- Check trace files generated on failures: `npx playwright show-trace <trace-file>`
- View HTML reports: `npx playwright show-report`

## License

This project is for educational and testing purposes. Please respect CBRE's terms of service when running these tests.