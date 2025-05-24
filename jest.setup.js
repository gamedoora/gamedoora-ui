import '@testing-library/jest-dom'

// Mock next/navigation
const mockPush = jest.fn()
const mockReplace = jest.fn()
const mockPrefetch = jest.fn()

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: mockPush,
    replace: mockReplace,
    prefetch: mockPrefetch,
  })),
  useSearchParams: jest.fn(() => new URLSearchParams()),
  usePathname: jest.fn(() => ''),
  redirect: jest.fn(),
}))

// Export mocks for use in tests
global.mockPush = mockPush
global.mockReplace = mockReplace
global.mockPrefetch = mockPrefetch

// Mock next-auth/react
const mockUseSession = jest.fn(() => ({ data: null, status: 'unauthenticated' }))

jest.mock('next-auth/react', () => ({
  useSession: mockUseSession,
  signIn: jest.fn(),
  signOut: jest.fn(),
}))

// Export mock for use in tests
global.mockUseSession = mockUseSession

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// Mock fetch, Request, and Response for API tests
global.fetch = jest.fn()
global.Request = class Request {
  constructor(input, init) {
    this.url = input
    this.method = init?.method || 'GET'
    this.headers = new Headers(init?.headers)
    this.body = init?.body
  }
  
  async json() {
    return JSON.parse(this.body || '{}')
  }
}

global.Response = class Response {
  constructor(body, init) {
    this.body = body
    this.status = init?.status || 200
    this.statusText = init?.statusText || 'OK'
    this.headers = new Headers(init?.headers)
  }
  
  async json() {
    return JSON.parse(this.body || '{}')
  }
  
  async text() {
    return this.body || ''
  }
}

// Setup MSW - temporarily disabled
// import { server } from './src/mocks/server'

// beforeAll(() => server.listen())
// afterEach(() => server.resetHandlers())
// afterAll(() => server.close()) 