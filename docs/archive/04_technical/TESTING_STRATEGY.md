# 🧪 Testing Strategy - NEXUS Productivity OS

> **Mục đích:** Định nghĩa chiến lược kiểm thử cho dự án NEXUS, đảm bảo chất lượng code và giảm bugs trong production.

**Cập nhật:** November 9, 2025  
**Trạng thái:** Week 0 - Documentation phase  
**Test Coverage Target:** 70%+ cho core features

---

## 🎯 **TRIẾT LÝ KIỂM THỬ (Testing Philosophy)**

### **Nguyên tắc cốt lõi:**

1. **Test the behavior, not the implementation**
   - Focus on what the component/function does, not how
   - Tests should survive refactoring

2. **Write tests that give confidence**
   - Prioritize integration tests over unit tests
   - User-centric testing (how users interact with the app)

3. **AI-friendly testing**
   - AI can generate test boilerplate
   - Human reviews and refines tests
   - Document test patterns for AI to follow

4. **Fast feedback loop**
   - Tests run in < 5 seconds
   - No external dependencies (mock Supabase)
   - Run tests before commit (git hooks)

5. **Don't test third-party libraries**
   - Trust @dnd-kit, Zustand, Tiptap work
   - Only test our integration with them

---

## 📊 **TEST PYRAMID**

```
        /\
       /  \       E2E Tests (10%)
      /    \      - Critical user flows
     /------\     - Smoke tests
    /        \
   /          \   Integration Tests (30%)
  /            \  - Component + Store + API
 /--------------\
/                \ Unit Tests (60%)
------------------  - Utilities, helpers, hooks
```

**Distribution:**
- **60% Unit Tests:** Fast, isolated, utility functions
- **30% Integration Tests:** Component + Zustand + Supabase (mocked)
- **10% E2E Tests:** Critical paths (login, create task, complete task)

---

## 🧩 **UNIT TESTS**

### **Mục tiêu:**
- Test isolated functions, utilities, helpers
- Fast execution (< 100ms per test)
- No external dependencies

### **Công cụ:**
- **Vitest** (Fast, Vite-native, compatible with Jest API)
- **@testing-library/react** (User-centric testing)
- **@testing-library/user-event** (Simulate user interactions)

### **What to test:**

#### **1. Utility Functions**
```typescript
// Example: lib/utils/date-utils.ts
describe('formatDate', () => {
  it('formats ISO date to human readable', () => {
    expect(formatDate('2025-11-09')).toBe('Nov 9, 2025')
  })
  
  it('handles invalid dates gracefully', () => {
    expect(formatDate('invalid')).toBe('Invalid Date')
  })
})
```

#### **2. Helper Functions**
```typescript
// Example: lib/utils/color-hash.ts
describe('generateTagColor', () => {
  it('generates consistent color for same tag name', () => {
    const color1 = generateTagColor('work')
    const color2 = generateTagColor('work')
    expect(color1).toBe(color2)
  })
  
  it('generates different colors for different tags', () => {
    const work = generateTagColor('work')
    const personal = generateTagColor('personal')
    expect(work).not.toBe(personal)
  })
})
```

#### **3. Custom Hooks (Simple)**
```typescript
// Example: hooks/use-debounce.ts
import { renderHook, act } from '@testing-library/react'

describe('useDebounce', () => {
  it('debounces value updates', async () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial', delay: 500 } }
    )
    
    expect(result.current).toBe('initial')
    
    // Update value
    rerender({ value: 'updated', delay: 500 })
    
    // Should not update immediately
    expect(result.current).toBe('initial')
    
    // Wait for debounce
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 600))
    })
    
    // Should update after delay
    expect(result.current).toBe('updated')
  })
})
```

### **Setup (Vitest):**

```bash
# Install dependencies
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

**vitest.config.ts:**
```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './tests/setup.ts',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
})
```

**tests/setup.ts:**
```typescript
import '@testing-library/jest-dom'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

// Cleanup after each test
afterEach(() => {
  cleanup()
})
```

---

## 🔗 **INTEGRATION TESTS**

### **Mục tiêu:**
- Test component + Zustand store + Supabase (mocked)
- Verify user interactions work end-to-end
- Catch integration bugs between layers

### **Công cụ:**
- **Vitest** (test runner)
- **@testing-library/react** (render components)
- **@testing-library/user-event** (simulate clicks, typing)
- **msw** (Mock Service Worker - mock Supabase API)

### **What to test:**

#### **1. Component + State Management**
```typescript
// Example: components/tasks/task-item.test.tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TaskItem } from './task-item'
import { useTaskStore } from '@/lib/stores/tasks'

describe('TaskItem', () => {
  beforeEach(() => {
    // Reset Zustand store
    useTaskStore.setState({ tasks: [] })
  })
  
  it('toggles task completion on checkbox click', async () => {
    const task = {
      id: '1',
      title: 'Buy groceries',
      completed: false,
    }
    
    render(<TaskItem task={task} />)
    
    // Find checkbox
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).not.toBeChecked()
    
    // Click checkbox
    await userEvent.click(checkbox)
    
    // Verify state updated (optimistic)
    const state = useTaskStore.getState()
    const updatedTask = state.tasks.find(t => t.id === '1')
    expect(updatedTask?.completed).toBe(true)
  })
  
  it('allows inline editing on double-click', async () => {
    const task = {
      id: '1',
      title: 'Buy groceries',
      completed: false,
    }
    
    render(<TaskItem task={task} />)
    
    // Double-click title
    const title = screen.getByText('Buy groceries')
    await userEvent.dblClick(title)
    
    // Input should appear
    const input = screen.getByRole('textbox')
    expect(input).toHaveValue('Buy groceries')
    
    // Edit title
    await userEvent.clear(input)
    await userEvent.type(input, 'Buy milk')
    await userEvent.keyboard('{Enter}')
    
    // Title should update
    expect(screen.getByText('Buy milk')).toBeInTheDocument()
  })
})
```

#### **2. Forms with Validation**
```typescript
// Example: components/tasks/task-quick-add.test.tsx
describe('TaskQuickAdd', () => {
  it('creates task on Enter key', async () => {
    render(<TaskQuickAdd />)
    
    const input = screen.getByPlaceholderText('Add a task...')
    
    // Type task title
    await userEvent.type(input, 'New task{Enter}')
    
    // Verify task added to store
    const state = useTaskStore.getState()
    expect(state.tasks).toHaveLength(1)
    expect(state.tasks[0].title).toBe('New task')
    
    // Input should clear
    expect(input).toHaveValue('')
  })
  
  it('shows error for empty task', async () => {
    render(<TaskQuickAdd />)
    
    const input = screen.getByPlaceholderText('Add a task...')
    
    // Try to create empty task
    await userEvent.type(input, '{Enter}')
    
    // Error should display
    expect(screen.getByText(/cannot be empty/i)).toBeInTheDocument()
    
    // No task created
    const state = useTaskStore.getState()
    expect(state.tasks).toHaveLength(0)
  })
})
```

### **Setup (MSW for API mocking):**

```bash
npm install -D msw
```

**tests/mocks/handlers.ts:**
```typescript
import { rest } from 'msw'

export const handlers = [
  // Mock Supabase tasks endpoint
  rest.post('https://*.supabase.co/rest/v1/tasks', (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({
        id: 'mock-id',
        ...req.body,
      })
    )
  }),
  
  rest.get('https://*.supabase.co/rest/v1/tasks', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        { id: '1', title: 'Task 1', completed: false },
        { id: '2', title: 'Task 2', completed: true },
      ])
    )
  }),
]
```

**tests/mocks/server.ts:**
```typescript
import { setupServer } from 'msw/node'
import { handlers } from './handlers'

export const server = setupServer(...handlers)
```

**tests/setup.ts (update):**
```typescript
import { server } from './mocks/server'
import { beforeAll, afterEach, afterAll } from 'vitest'

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
```

---

## 🌐 **END-TO-END (E2E) TESTS**

### **Mục tiêu:**
- Test critical user flows from start to finish
- Run in real browser environment
- Catch issues with real Supabase, real network

### **Công cụ:**
- **Playwright** (Recommended - Fast, modern, multi-browser)
- **Cypress** (Alternative - Popular, good DX)

### **What to test:**

#### **Critical Flows:**

1. **Authentication Flow:**
   ```typescript
   test('user can login with Google', async ({ page }) => {
     await page.goto('http://localhost:3000/login')
     await page.click('button:has-text("Continue with Google")')
     
     // Mock Google OAuth (in test environment)
     // ...
     
     // Verify redirect to /today
     await expect(page).toHaveURL(/\/today/)
   })
   ```

2. **Task Management Flow:**
   ```typescript
   test('user can create, complete, and delete task', async ({ page }) => {
     // Login first
     await login(page)
     
     // Navigate to /today
     await page.goto('http://localhost:3000/today')
     
     // Create task
     await page.fill('input[placeholder="Add a task..."]', 'Buy milk')
     await page.keyboard.press('Enter')
     
     // Verify task appears
     await expect(page.locator('text=Buy milk')).toBeVisible()
     
     // Complete task
     const checkbox = page.locator('text=Buy milk').locator('..').locator('input[type="checkbox"]')
     await checkbox.click()
     
     // Verify task marked as completed
     await expect(checkbox).toBeChecked()
     
     // Delete task
     await page.hover('text=Buy milk')
     await page.click('[aria-label="Delete task"]')
     await page.click('button:has-text("Delete")')
     
     // Verify task removed
     await expect(page.locator('text=Buy milk')).not.toBeVisible()
   })
   ```

3. **Kanban Board Flow:**
   ```typescript
   test('user can drag task between columns', async ({ page }) => {
     await login(page)
     await page.goto('http://localhost:3000/kanban-demo')
     
     // Find task in TODO column
     const task = page.locator('[data-testid="kanban-task"]', { hasText: 'Sample task' }).first()
     
     // Drag to IN PROGRESS column
     const inProgressColumn = page.locator('[data-testid="kanban-column-in-progress"]')
     await task.dragTo(inProgressColumn)
     
     // Verify task moved
     await expect(inProgressColumn.locator('text=Sample task')).toBeVisible()
   })
   ```

### **Setup (Playwright):**

```bash
npm install -D @playwright/test
npx playwright install
```

**playwright.config.ts:**
```typescript
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
})
```

---

## 🔄 **QUY TRÌNH LÀM VIỆC (Workflow)**

### **Khi nào viết tests?**

#### **1. Before coding (TDD - Optional):**
```
1. Write failing test
2. Write minimal code to pass test
3. Refactor
4. Repeat
```

**Pros:** Forces you to think about API design  
**Cons:** Slower initially, not AI-friendly

#### **2. After coding (Recommended for AI workflow):**
```
1. AI generates component code
2. Test manually in browser
3. Write integration tests for key interactions
4. Write unit tests for utilities
5. Refactor if tests reveal issues
```

**Pros:** Faster with AI, tests validate AI code  
**Cons:** Risk of missing edge cases

#### **3. When refactoring:**
```
1. Ensure existing tests pass
2. Refactor code
3. Verify tests still pass (and didn't need changes)
4. If tests break → Bad tests (testing implementation, not behavior)
```

---

### **Test Automation:**

**Git Hooks (Husky + lint-staged):**
```bash
npm install -D husky lint-staged
```

**package.json:**
```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "test:e2e": "playwright test",
    "test:coverage": "vitest run --coverage"
  },
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "vitest related --run"
    ]
  }
}
```

**.husky/pre-commit:**
```bash
#!/bin/sh
npx lint-staged
```

**Result:** Tests run automatically before every commit.

---

## 📈 **COVERAGE TARGETS**

### **Overall:**
- **Statements:** 70%+
- **Branches:** 60%+
- **Functions:** 70%+
- **Lines:** 70%+

### **Per Module:**

| Module | Target | Priority |
|--------|--------|----------|
| **Utilities (lib/utils/)** | 90%+ | HIGH |
| **Stores (lib/stores/)** | 80%+ | HIGH |
| **Components (components/)** | 60%+ | MEDIUM |
| **Pages (app/)** | 40%+ | LOW |
| **Hooks (hooks/)** | 80%+ | HIGH |

**Note:** Don't chase 100% coverage. Diminishing returns after 80%.

---

## 🎓 **BEST PRACTICES**

### **DO:**

✅ **Test user behavior, not implementation**
```typescript
// ✅ GOOD: Test what user sees
expect(screen.getByText('Buy milk')).toBeInTheDocument()

// ❌ BAD: Test internal state
expect(component.state.tasks[0].title).toBe('Buy milk')
```

✅ **Use data-testid for stable selectors**
```typescript
// ✅ GOOD: Stable even if text changes
<button data-testid="delete-task">Delete</button>
const btn = screen.getByTestId('delete-task')

// ⚠️ OK: Works but fragile
const btn = screen.getByText('Delete')
```

✅ **Mock external dependencies**
```typescript
// ✅ GOOD: Mock Supabase
vi.mock('@/lib/supabase/client', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn().mockResolvedValue({ data: [], error: null }),
    })),
  },
}))

// ❌ BAD: Real Supabase calls (slow, flaky)
```

✅ **Write descriptive test names**
```typescript
// ✅ GOOD: Clear what's being tested
it('shows error when task title is empty', () => {})

// ❌ BAD: Vague
it('works', () => {})
```

### **DON'T:**

❌ **Test third-party libraries**
```typescript
// ❌ BAD: Testing Zustand, not our code
it('Zustand store updates correctly', () => {
  const store = create(...)
  store.setState(...)
  expect(store.getState()).toBe(...)
})
```

❌ **Test implementation details**
```typescript
// ❌ BAD: Testing class name (implementation)
expect(element).toHaveClass('bg-blue-500')

// ✅ GOOD: Testing behavior
expect(element).toHaveAttribute('aria-selected', 'true')
```

❌ **Write flaky tests**
```typescript
// ❌ BAD: Race condition
it('updates after 100ms', async () => {
  trigger()
  await new Promise(r => setTimeout(r, 100))
  expect(...) // May fail if slower
})

// ✅ GOOD: Wait for condition
it('updates after 100ms', async () => {
  trigger()
  await waitFor(() => expect(...))
})
```

---

## 🚀 **GETTING STARTED**

### **Week 0 (Current):**
- [ ] Setup Vitest + Testing Library
- [ ] Write first unit test (formatDate utility)
- [ ] Write first integration test (TaskItem component)
- [ ] Configure git hooks (run tests on commit)

### **Week 1-2:**
- [ ] Add tests for new features (as they're built)
- [ ] Target: 50% coverage on utilities and stores
- [ ] Setup Playwright for E2E tests

### **Week 3-4:**
- [ ] Write E2E tests for critical flows
- [ ] Target: 70% overall coverage
- [ ] Setup CI/CD to run tests on PR

### **Week 5+:**
- [ ] Maintain coverage as new features added
- [ ] Refactor tests as needed
- [ ] Add visual regression tests (optional)

---

## 📚 **RESOURCES**

### **Documentation:**
- [Vitest Docs](https://vitest.dev/)
- [Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Playwright Docs](https://playwright.dev/)
- [MSW Docs](https://mswjs.io/)

### **Guides:**
- [Kent C. Dodds - Testing Trophy](https://kentcdodds.com/blog/the-testing-trophy-and-testing-classifications)
- [Testing Library - Common Mistakes](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)

### **Examples:**
- `tests/utils/date-utils.test.ts` - Unit test example
- `tests/components/task-item.test.tsx` - Integration test example
- `e2e/task-management.spec.ts` - E2E test example

---

## 🎯 **SUCCESS METRICS**

**Project is well-tested if:**

✅ **Confidence:**
- Can refactor without fear of breaking things
- Bugs caught in tests, not in production

✅ **Speed:**
- Unit tests run in < 5 seconds
- Integration tests run in < 30 seconds
- E2E tests run in < 2 minutes

✅ **Coverage:**
- 70%+ overall coverage
- Critical paths 100% covered (login, create task, etc.)

✅ **Maintainability:**
- Tests easy to understand and update
- New features include tests from day 1

---

**Last Updated:** November 9, 2025  
**Next Review:** Week 4 (when hitting coverage targets)  
**Status:** ✅ Documentation complete, ready to implement
