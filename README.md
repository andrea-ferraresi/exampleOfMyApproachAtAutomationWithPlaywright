# osapiens Careers Page - Playwright E2E Tests

This project contains end-to-end tests for the osapiens careers page (https://careers.osapiens.com/) using Playwright.

## Project Structure

```
careers-osapiens-e2e/
├── helpers/
│   ├── Client.ts        # Page object model with reusable methods
│   ├── selectors.ts     # CSS selectors for page elements
│   └── values.ts        # Test data and configuration values
├── src/
│   └── careersPage.spec.ts  # Test specifications
├── playwright.config.ts # Playwright configuration
├── package.json         # Project dependencies
└── README.md           # This file
```

## Installation

1. Install dependencies:
```bash
npm install
# or
pnpm install
# or
yarn install
```

2. Install Playwright browsers:
```bash
npx playwright install
```

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests in headed mode (see the browser)
```bash
npm run test:headed
```

### Run tests with UI mode (interactive)
```bash
npm run test:ui
```

### Run tests in specific browser
```bash
npm run test:chromium
npm run test:firefox
npm run test:webkit
```

### Run mobile tests
```bash
npm run test:mobile
```

### Debug tests
```bash
npm run test:debug
```

### View test report
```bash
npm run report
```

### Generate tests using Codegen
```bash
npm run codegen
```

## Test Coverage

Current test cases:
- TC_01: Visit careers page and verify page loads
- TC_02: Verify page title contains "osapiens"
- TC_03: Verify job listings are displayed
- TC_04: Verify main content is visible
- TC_05: Verify company logo is displayed
- TC_06: Verify navigation exists

## Customization

### Updating Selectors
After visiting the actual page, you may need to update selectors in `helpers/selectors.ts` to match the actual DOM structure.

### Adding New Tests
Add new test files in the `src/` directory following the pattern `*.spec.ts`.

### Adding Helper Methods
Add reusable methods to `helpers/Client.ts` for common page interactions.

## CI/CD Integration

The tests are configured to run in CI environments with:
- 2 retries on failure
- Single worker for stability
- HTML and JSON reports

## Notes

- Selectors in `helpers/selectors.ts` are generic and may need to be updated after inspecting the actual page structure
- Tests are configured to run on Desktop Chrome, Firefox, Safari, and mobile viewports
- Screenshots and videos are captured on test failures for debugging
