# Playwright Asana Demo — TypeScript

A data-driven Playwright test suite that automates and validates a Kanban-style project management board ([Demo App](https://animated-gingersnap-8cf7f2.netlify.app/)).

---

## Project Structure

```
├── data/
│   └── testData.ts        # All test scenarios as a typed array (TestCase interface)
├── pages/
│   ├── LoginPage.ts       # Page Object — login form
│   └── ProjectPage.ts     # Page Object — board navigation & assertions
├── tests/
│   └── board.spec.ts      # Single data-driven test loop
├── playwright.config.ts   # Playwright configuration
├── tsconfig.json          # TypeScript configuration
└── package.json
```

---

## How It Works (Data-Driven Design)

All 6 test scenarios live in `data/testData.ts` as a strongly-typed array:

```ts
export interface TestCase {
  id: string;
  project: string;
  task: string;
  column: string;
  tags: string[];
}

export const testCases: TestCase[] = [
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

`tests/board.spec.ts` loops over this array and generates one test per entry — **no repeated test code**. Adding a new scenario only requires a new object in `testData.ts`.

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
- TypeScript — type-safe test code
- Page Object Model pattern
