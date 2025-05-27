# Test Pipeline Configuration

## Overview

The test pipeline in this project is configured to allow tests to fail without blocking the build process. This enables continuous development and deployment while tests are being fixed or during active development phases.

## Pipeline Behavior

### GitHub Actions Workflow (`.github/workflows/test-and-lint.yml`)

The workflow includes these steps with failure tolerance:

1. **Linting** - `continue-on-error: true`
   - ESLint checks run but won't fail the build
   - Warnings and errors are reported but don't block deployment

2. **Testing** - `continue-on-error: true`
   - Jest tests run but won't fail the build
   - Test failures are reported but don't block deployment

3. **Build** - Always runs regardless of test/lint status
   - Ensures the application can still be built and deployed

## Available Test Scripts

### Standard Scripts
```bash
npm test                # Run tests normally (can fail)
npm run test:watch      # Run tests in watch mode
npm run test:coverage   # Run tests with coverage report
```

### CI-Friendly Scripts
```bash
npm run test:ci         # Run tests with CI optimizations
npm run test:optional   # Run tests and continue even if they fail
```

## Configuration Details

### Jest Configuration (`jest.config.js`)
- `passWithNoTests: true` - Allows pipeline to pass even with no tests
- `silent: true` (in CI) - Reduces verbose output in CI environment
- `maxWorkers: 2` (in CI) - Limits workers for better CI performance

### GitHub Actions Environment
- `CI: true` - Enables CI-specific Jest behavior
- `continue-on-error: true` - Allows steps to fail without stopping the workflow

## When to Use This Configuration

✅ **Good for:**
- Active development phases
- Feature branches where tests are being written
- Experimental features
- When deploying despite some test failures
- Continuous deployment environments

❌ **Consider stricter testing for:**
- Production releases
- Main branch protection
- Critical bug fixes
- Final QA phases

## Switching to Strict Mode

To make tests mandatory again, remove `continue-on-error: true` from:
- `.github/workflows/test-and-lint.yml`

Or use the standard test script:
```bash
npm test  # Will fail the pipeline if tests fail
```

## Monitoring Test Health

Even though tests are allowed to fail, you should still monitor:
- Test success rates in GitHub Actions
- Coverage reports
- Failing test patterns
- Performance degradation

## Example Workflow Output

When tests fail but are allowed to continue:
```
✅ Linting (with warnings)
⚠️  Tests (failed but continuing)
✅ Build (successful)
✅ Deploy (successful)
```

## Best Practices

1. **Fix tests regularly** - Don't let failures accumulate
2. **Monitor test trends** - Watch for increasing failure rates
3. **Use feature flags** - Isolate unstable features
4. **Communicate** - Let team know about known test issues
5. **Temporary measure** - Plan to return to strict testing

## Troubleshooting

If you need to debug why tests are failing:

```bash
# Run tests locally with full output
npm test -- --verbose

# Run specific test files
npm test -- --testNamePattern="specific test"

# Run tests with coverage
npm run test:coverage
```

## Configuration Files

- `.github/workflows/test-and-lint.yml` - GitHub Actions workflow
- `jest.config.js` - Jest configuration
- `package.json` - Test scripts
- `jest.setup.js` - Jest setup and globals 