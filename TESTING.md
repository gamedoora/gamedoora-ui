# Testing Guide for Gamedoora UI

This document provides comprehensive information about the testing setup for the Gamedoora UI project, specifically covering the signup functionality and authentication system.

## 📋 Table of Contents

- [Overview](#overview)
- [Testing Stack](#testing-stack)
- [Installation](#installation)
- [Running Tests](#running-tests)
- [Test Structure](#test-structure)
- [Coverage Reports](#coverage-reports)
- [Writing New Tests](#writing-new-tests)
- [Troubleshooting](#troubleshooting)

## 🔍 Overview

Our testing suite provides comprehensive coverage for:
- **Component Testing**: React components with user interactions
- **API Testing**: Backend endpoints and validation
- **Unit Testing**: Utility functions and business logic
- **Integration Testing**: Authentication flow and context providers
- **Accessibility Testing**: Form labels and ARIA attributes

## 🛠 Testing Stack

| Tool | Purpose |
|------|---------|
| **Jest** | Test runner and assertion library |
| **React Testing Library** | Component testing utilities |
| **MSW (Mock Service Worker)** | API mocking for integration tests |
| **User Event** | Simulating user interactions |
| **Jest DOM** | Custom DOM matchers |

## 📦 Installation

### Install Dependencies

```bash
npm install
```

The following testing dependencies are included:
- `jest`: ^29.7.0
- `jest-environment-jsdom`: ^29.7.0
- `@testing-library/react`: ^16.0.1
- `@testing-library/jest-dom`: ^6.4.8
- `@testing-library/user-event`: ^14.5.2
- `@types/jest`: ^29.5.12
- `msw`: ^2.4.12

## 🚀 Running Tests

### Quick Start

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Using the Test Runner Script

We provide a convenient script for various testing scenarios:

```bash
# Make script executable (first time only)
chmod +x scripts/run-tests.sh

# Run all tests (default)
./scripts/run-tests.sh

# Run specific test suites
./scripts/run-tests.sh signup          # Signup-related tests only
./scripts/run-tests.sh watch           # Watch mode
./scripts/run-tests.sh coverage        # With coverage
./scripts/run-tests.sh lint            # ESLint only

# Run specific test file
./scripts/run-tests.sh specific src/app/(auth)/sign-up/__tests__/page.test.tsx

# Show help
./scripts/run-tests.sh help
```

## 📁 Test Structure

```
src/
├── app/(auth)/sign-up/
│   └── __tests__/
│       └── page.test.tsx              # SignUp component tests
├── app/api/auth/register/
│   └── __tests__/
│       └── route.test.ts              # Registration API tests
├── lib/
│   └── __tests__/
│       └── auth.test.ts               # Auth utilities tests
├── mocks/
│   ├── handlers.ts                    # MSW request handlers
│   └── server.ts                      # MSW server setup
└── test-utils/
    └── index.tsx                      # Custom render utilities
```

## 🧪 Test Categories

### 1. Component Tests (`src/app/(auth)/sign-up/__tests__/page.test.tsx`)

Tests the SignUp component including:
- **Rendering**: Form elements, labels, and UI components
- **Form Validation**: Required fields, email format, password strength
- **User Interactions**: Typing, form submission, error clearing
- **State Management**: Loading states, error handling
- **Navigation**: Redirects and route changes
- **Accessibility**: Form labels, ARIA attributes

Example test:
```typescript
it('shows validation errors for empty fields', async () => {
  const user = userEvent.setup()
  render(<SignUp />)
  
  const submitButton = screen.getByRole('button', { name: /sign up/i })
  await user.click(submitButton)
  
  await waitFor(() => {
    expect(screen.getByText('First name is required')).toBeInTheDocument()
    expect(screen.getByText('Email is required')).toBeInTheDocument()
  })
})
```

### 2. API Tests (`src/app/api/auth/register/__tests__/route.test.ts`)

Tests the registration API endpoint:
- **Successful Registration**: Valid data handling
- **Validation Errors**: Missing fields, invalid formats
- **Conflict Handling**: Existing user scenarios
- **Error Handling**: Database errors, server issues
- **Edge Cases**: Empty requests, malformed data

Example test:
```typescript
it('creates a new user with valid data', async () => {
  const request = new NextRequest('http://localhost:3000/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'Password123',
    }),
  })

  const response = await POST(request)
  expect(response.status).toBe(201)
})
```

### 3. Utility Tests (`src/lib/__tests__/auth.test.ts`)

Tests authentication utility functions:
- **Email Validation**: Valid/invalid email formats
- **Password Validation**: Strength requirements
- **Password Hashing**: Bcrypt integration
- **Edge Cases**: Empty inputs, special characters

### 4. Integration Tests

Uses MSW to mock API responses and test the complete flow:
- **Authentication Context**: Login/register flow
- **Form Submission**: End-to-end user journey
- **Error Scenarios**: Network failures, server errors

## 📊 Coverage Reports

Generate and view coverage reports:

```bash
npm run test:coverage
```

Coverage reports are generated in the `coverage/` directory:
- `coverage/lcov-report/index.html` - HTML report
- `coverage/lcov.info` - LCOV format for CI/CD
- Console output shows summary

### Coverage Targets

| Metric | Target | Current |
|--------|--------|---------|
| Statements | ≥ 80% | - |
| Branches | ≥ 75% | - |
| Functions | ≥ 80% | - |
| Lines | ≥ 80% | - |

## ✍️ Writing New Tests

### Component Test Template

```typescript
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useAuth } from '@/context/AuthContext'
import YourComponent from '../YourComponent'

jest.mock('@/context/AuthContext')

describe('YourComponent', () => {
  beforeEach(() => {
    ;(useAuth as jest.Mock).mockReturnValue({
      // Mock implementation
    })
  })

  it('should render correctly', () => {
    render(<YourComponent />)
    expect(screen.getByText('Expected Text')).toBeInTheDocument()
  })
})
```

### API Test Template

```typescript
import { NextRequest } from 'next/server'
import { POST } from '../route'

describe('/api/your-endpoint', () => {
  it('should handle valid requests', async () => {
    const request = new NextRequest('http://localhost:3000/api/your-endpoint', {
      method: 'POST',
      body: JSON.stringify({ data: 'test' }),
    })

    const response = await POST(request)
    expect(response.status).toBe(200)
  })
})
```

### Best Practices

1. **Test Behavior, Not Implementation**: Focus on what the user sees and does
2. **Use Descriptive Test Names**: Clear, specific descriptions
3. **Arrange-Act-Assert**: Structure tests clearly
4. **Mock External Dependencies**: Isolate units under test
5. **Test Edge Cases**: Empty inputs, error conditions
6. **Keep Tests Independent**: No shared state between tests

## 🔧 Configuration Files

### Jest Configuration (`jest.config.js`)
- Next.js integration
- TypeScript support
- Module path mapping
- Coverage settings

### Setup File (`jest.setup.js`)
- Global test utilities
- Mock configurations
- DOM environment setup

### MSW Setup (`src/mocks/`)
- API request mocking
- Response scenarios
- Error simulation

## 🐛 Troubleshooting

### Common Issues

1. **Module Resolution Errors**
   ```bash
   # Clear cache and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Mock Not Working**
   ```typescript
   // Ensure mocks are before imports
   jest.mock('@/lib/module')
   import { module } from '@/lib/module'
   ```

3. **Async Test Timeouts**
   ```typescript
   // Use waitFor for async operations
   await waitFor(() => {
     expect(element).toBeInTheDocument()
   })
   ```

4. **Test Environment Issues**
   ```bash
   # Specify test environment
   npx jest --env=jsdom
   ```

### Debug Mode

Run tests with debug information:

```bash
# Verbose output
npm test -- --verbose

# Debug specific test
npx jest --debug path/to/test.tsx
```

## 🔄 CI/CD Integration

Update `.github/workflows/test-and-lint.yml` to include testing:

```yaml
- name: Run tests
  run: |
    npm test
    
- name: Upload coverage
  uses: codecov/codecov-action@v1
  with:
    file: ./coverage/lcov.info
```

## 📚 Additional Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [MSW Documentation](https://mswjs.io/docs/)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

---

For questions or issues with the testing setup, please check the troubleshooting section or create an issue in the repository. 