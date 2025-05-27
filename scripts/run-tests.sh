#!/bin/bash

# Test Runner Script for Gamedoora UI
# This script provides various options for running tests

set -e

echo "🧪 Gamedoora UI Test Runner"
echo "================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if dependencies are installed
check_dependencies() {
    print_status "Checking dependencies..."
    
    if ! npm list jest &> /dev/null; then
        print_warning "Jest not found. Installing test dependencies..."
        npm install
    fi
    
    print_success "Dependencies checked"
}

# Run linting
run_lint() {
    print_status "Running ESLint..."
    npm run lint
    print_success "Linting completed"
}

# Run all tests
run_all_tests() {
    print_status "Running all tests..."
    npm test
    print_success "All tests completed"
}

# Run tests in watch mode
run_tests_watch() {
    print_status "Running tests in watch mode..."
    npm run test:watch
}

# Run tests with coverage
run_tests_coverage() {
    print_status "Running tests with coverage..."
    npm run test:coverage
    print_success "Coverage report generated"
}

# Run specific test file
run_specific_test() {
    local test_file=$1
    if [ -z "$test_file" ]; then
        print_error "Please specify a test file"
        echo "Usage: $0 specific <test-file>"
        exit 1
    fi
    
    print_status "Running specific test: $test_file"
    npx jest "$test_file"
    print_success "Specific test completed"
}

# Run tests for signup functionality only
run_signup_tests() {
    print_status "Running signup-related tests..."
    npx jest --testPathPattern="sign-up|register|auth" --verbose
    print_success "Signup tests completed"
}

# Main script logic
case "${1:-all}" in
    "deps")
        check_dependencies
        ;;
    "lint")
        run_lint
        ;;
    "all")
        check_dependencies
        run_lint
        run_all_tests
        ;;
    "watch")
        check_dependencies
        run_tests_watch
        ;;
    "coverage")
        check_dependencies
        run_tests_coverage
        ;;
    "specific")
        check_dependencies
        run_specific_test "$2"
        ;;
    "signup")
        check_dependencies
        run_signup_tests
        ;;
    "help"|"-h"|"--help")
        echo "Usage: $0 [COMMAND]"
        echo ""
        echo "Commands:"
        echo "  deps      - Check and install dependencies"
        echo "  lint      - Run ESLint"
        echo "  all       - Run linting and all tests (default)"
        echo "  watch     - Run tests in watch mode"
        echo "  coverage  - Run tests with coverage report"
        echo "  specific  - Run a specific test file"
        echo "  signup    - Run signup-related tests only"
        echo "  help      - Show this help message"
        echo ""
        echo "Examples:"
        echo "  $0                                    # Run all tests"
        echo "  $0 watch                             # Watch mode"
        echo "  $0 coverage                          # Generate coverage"
        echo "  $0 specific signup.test.tsx          # Run specific test"
        echo "  $0 signup                            # Run signup tests"
        ;;
    *)
        print_error "Unknown command: $1"
        echo "Use '$0 help' for usage information"
        exit 1
        ;;
esac 