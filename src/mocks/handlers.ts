import { http, HttpResponse } from 'msw'

export const handlers = [
  // Mock registration endpoint
  http.post('/api/auth/register', async ({ request }: { request: Request }) => {
    const body = await request.json() as {
      name: string
      email: string
      password: string
      phone?: string
    }

    // Simulate validation errors
    if (!body.name || !body.email || !body.password) {
      return HttpResponse.json(
        { error: 'Name, email, and password are required' },
        { status: 400 }
      )
    }

    if (body.email === 'existing@example.com') {
      return HttpResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      )
    }

    if (body.password.length < 8) {
      return HttpResponse.json(
        { error: 'Password must be at least 8 characters long' },
        { status: 400 }
      )
    }

    // Simulate server error
    if (body.email === 'servererror@example.com') {
      return HttpResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      )
    }

    // Successful registration
    return HttpResponse.json(
      {
        message: 'User created successfully',
        user: {
          id: 1,
          name: body.name,
          email: body.email,
          phone: body.phone || null,
          userID: 'test-user-id',
          isVerified: false,
          created_at: new Date().toISOString(),
        },
      },
      { status: 201 }
    )
  }),

  // Mock login endpoint
  http.post('/api/auth/login', async ({ request }: { request: Request }) => {
    const body = await request.json() as {
      email: string
      password: string
    }

    if (body.email === 'test@example.com' && body.password === 'TestPassword123') {
      return HttpResponse.json(
        {
          user: {
            id: 1,
            name: 'Test User',
            email: 'test@example.com',
            userID: 'test-user-id',
            isVerified: true,
          },
          token: 'mock-jwt-token',
        },
        { status: 200 }
      )
    }

    return HttpResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    )
  }),
] 