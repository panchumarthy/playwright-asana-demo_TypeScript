# Playwright Asana Demo — JavaScript

A data-driven Playwright test suite that automates and validates a Kanban-style project management board ([Demo App](https://animated-gingersnap-8cf7f2.netlify.app/)).

---

## Project Structure

```
├── data/
│   └── testData.js        # All test scenarios as a JSON array
├── pages/
│   ├── LoginPage.js       # Page Object — login form
│   └── ProjectPage.js     # Page Object — board navigation & assertions
├── tests/
│   └── board.spec.js      # Single data-driven test loop
├── playwright.config.js   # Playwright configuration
└── package.json
```

---

## How It Works (Data-Driven Design)

All 6 test scenarios live in `data/testData.js` as a plain JSON array:

```js
const testCases = [
  {
    id: "TC-01",
    project: "Web Application",
    task: "Implement user authentication",
    column: "To Do",
    tags: ["Feature", "High Priority"],
  },
  // ... 5 more entries
];
```

`tests/board.spec.js` loops over this array and generates one test per entry — **no repeated test code**. Adding a new scenario only requires a new object in `testData.js`.

---

## Test Cases

| ID    | Project            | Task                          | Column      | Tags                      |
|-------|--------------------|-------------------------------|-------------|---------------------------|
| TC-01 | Web Application    | Implement user authentication | To Do       | Feature, High Priority    |
| TC-02 | Web Application    | Fix navigation bug            | To Do       | Bug                       |
| TC-03 | Web Application    | Design system updates         | In Progress | Design                    |
| TC-04 | Mobile Application | Push notification system      | To Do       | Feature                   |
| TC-05 | Mobile Application | Offline mode                  | In Progress | Feature, High Priority    |
| TC-06 | Mobile Application | App icon design               | Done        | Design                    |

---

## Setup

**Prerequisites:** Node.js 18+

```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install chromium
```

---

## Running Tests

```bash
# Headless (default)
npm test

# With visible browser
npm run test:headed

# Open HTML report from last run
npm run report
```

---

## Tech Stack

- [Playwright](https://playwright.dev/) — browser automation
- JavaScript (CommonJS)
- Page Object Model pattern
