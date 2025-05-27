// Simple example test to verify testing setup
describe('Testing Setup Verification', () => {
  it('should run basic tests', () => {
    expect(true).toBe(true)
  })

  it('should handle basic math operations', () => {
    expect(2 + 2).toBe(4)
    expect(5 * 3).toBe(15)
  })

  it('should work with strings', () => {
    const message = 'Hello, Testing!'
    expect(message).toContain('Testing')
    expect(message.length).toBeGreaterThan(0)
  })

  it('should work with arrays', () => {
    const fruits = ['apple', 'banana', 'orange']
    expect(fruits).toHaveLength(3)
    expect(fruits).toContain('banana')
  })

  it('should work with objects', () => {
    const user = {
      name: 'Test User',
      email: 'test@example.com',
      active: true
    }
    
    expect(user.name).toBe('Test User')
    expect(user.active).toBe(true)
    expect(user).toHaveProperty('email')
  })

  it('should handle async operations', async () => {
    const promise = Promise.resolve('success')
    await expect(promise).resolves.toBe('success')
  })
}) 