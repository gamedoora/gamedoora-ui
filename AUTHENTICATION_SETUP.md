# Authentication System Setup Guide

This project now includes a complete login mechanism using SQLite and JWT tokens.

## Setup Instructions

### 1. Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# JWT Secret for authentication (use a long, random string in production)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-make-it-long-and-random

# Database URL (SQLite file)
DATABASE_URL="file:./dev.db"

# NextAuth configuration (if using NextAuth alongside)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-key
```

### 2. Database Setup

The SQLite database and tables are already created. If you need to reset:

```bash
# Reset database
rm prisma/dev.db

# Recreate database
npx prisma db push

# Generate Prisma client
npx prisma generate
```

### 3. Start the Development Server

```bash
npm run dev
```

## API Endpoints

The following authentication endpoints are available:

### POST `/api/auth/register`
Register a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "StrongPassword123",
  "phone": "+1234567890" // optional
}
```

**Response:**
```json
{
  "message": "User created successfully",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "userID": "cuid",
    "isVerified": false,
    "created_at": "2024-01-01T00:00:00.000Z"
  }
}
```

### POST `/api/auth/login`
Login with email and password.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "StrongPassword123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "user": { /* user object */ },
  "token": "jwt_token_here"
}
```

### POST `/api/auth/logout`
Logout and invalidate session.

**Headers:**
```
Authorization: Bearer jwt_token_here
```

### GET `/api/auth/me`
Get current user information.

**Headers:**
```
Authorization: Bearer jwt_token_here
```

## Frontend Pages

### `/login`
Modern login page with form validation and error handling.

### `/register`
Registration page with comprehensive form validation including:
- Password strength requirements
- Email format validation
- Password confirmation matching

### `/dashboard`
Protected dashboard page showing user information with logout functionality.

## Features

✅ **SQLite Database**: Local file-based database using Prisma ORM  
✅ **Password Security**: Bcrypt hashing with salt rounds  
✅ **JWT Authentication**: Secure token-based authentication  
✅ **Session Management**: Database-stored sessions with expiration  
✅ **Form Validation**: Client and server-side validation  
✅ **Responsive Design**: Modern, mobile-friendly UI  
✅ **Protected Routes**: Automatic redirection for authenticated/unauthenticated users  
✅ **Context Management**: React Context for global auth state  
✅ **TypeScript**: Full type safety throughout the application  

## Database Schema

### Users Table
- `id`: Auto-incrementing primary key
- `name`: User's full name
- `email`: Unique email address
- `phone`: Optional phone number
- `password`: Bcrypt hashed password
- `avatar`: Optional profile picture URL
- `userID`: Unique CUID identifier
- `isVerified`: Account verification status
- `created_at`: Account creation timestamp
- `updated_at`: Last update timestamp

### Sessions Table
- `id`: Unique session identifier
- `userId`: Reference to user
- `token`: JWT token string
- `expiresAt`: Session expiration time
- `created_at`: Session creation timestamp

## Security Features

- **Password Requirements**: Minimum 8 characters with uppercase, lowercase, and numbers
- **JWT Expiration**: Tokens expire after 7 days
- **Session Cleanup**: Expired sessions are automatically removed
- **CSRF Protection**: Secure token-based requests
- **Input Validation**: Server-side validation for all inputs
- **SQL Injection Protection**: Prisma ORM prevents SQL injection

## Usage Examples

### Using the Authentication Context

```tsx
'use client';

import { useAuth } from '@/context/AuthContext';

export default function MyComponent() {
  const { user, login, logout, isAuthenticated, loading } = useAuth();

  const handleLogin = async () => {
    const result = await login('user@example.com', 'password');
    if (result.success) {
      console.log('Login successful!');
    } else {
      console.error('Login failed:', result.error);
    }
  };

  if (loading) return <div>Loading...</div>;
  
  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>Welcome, {user?.name}!</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
}
```

### Making Authenticated API Requests

```tsx
const makeAuthenticatedRequest = async () => {
  const token = localStorage.getItem('auth_token');
  
  const response = await fetch('/api/protected-endpoint', {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error('Request failed');
  }
};
```

## Testing the System

1. **Register a new account**: Go to `/register`
2. **Login**: Go to `/login` with your credentials
3. **View dashboard**: You'll be redirected to `/dashboard` after login
4. **Test logout**: Click the logout button to end the session
5. **Test protection**: Try accessing `/dashboard` when logged out

The system will automatically redirect users to appropriate pages based on their authentication status. 