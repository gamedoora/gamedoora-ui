# Database Setup Guide

This project uses **Prisma** with **SQLite** for local development. The database setup is fully automated, but this guide explains how it works and provides manual options.

## 🚀 Automatic Setup (Recommended)

For new developers, everything is automated:

```bash
git clone <repository-url>
cd gamedoora-ui
npm install  # This automatically sets up the database!
npm run dev  # Start developing immediately
```

The `postinstall` script automatically:
- ✅ Detects if it's a first-time setup
- ✅ Creates the SQLite database file
- ✅ Runs initial migrations to create tables
- ✅ Generates the Prisma client
- ✅ Handles existing installations gracefully

## 📋 What Gets Created

The database includes these tables:

### User Table
- `id` - Auto-increment primary key
- `name` - User's full name
- `email` - Unique email address
- `phone` - Optional phone number
- `password` - Hashed password
- `avatar` - Optional avatar URL
- `userID` - Unique identifier (cuid)
- `isVerified` - Verification status
- `created_at` / `updated_at` - Timestamps

### Session Table
- `id` - Session identifier
- `userId` - Foreign key to User
- `token` - Unique session token
- `expiresAt` - Token expiration
- `created_at` - Creation timestamp

## 🛠️ Manual Database Commands

If you need to manage the database manually:

```bash
# Set up database (first time)
npm run db:setup

# Reset database (deletes all data)
npm run db:reset

# Apply pending migrations
npx prisma migrate deploy

# Generate Prisma client
npx prisma generate

# Open database GUI
npm run db:studio
```

## 🔍 Troubleshooting

### Database Setup Failed
If the automatic setup fails:

```bash
# Reset and try again
npm run db:reset
npm install
```

### Migration Errors
If you get migration errors:

```bash
# Reset database and migrations
npm run db:reset
# Then follow the prompts to recreate
```

### Permission Issues
On some systems, you might need to fix permissions:

```bash
chmod 644 prisma/dev.db
```

## 📂 File Locations

- **Database**: `prisma/dev.db` (SQLite file)
- **Schema**: `prisma/schema.prisma` (Table definitions)
- **Migrations**: `prisma/migrations/` (Version history)
- **Setup Script**: `scripts/setup-db.js` (Automation logic)

## 🚢 Production Deployment

For production, you'll want to:

1. Use a production database (PostgreSQL recommended)
2. Update the `datasource` in `schema.prisma`
3. Set `DATABASE_URL` environment variable
4. Run `prisma migrate deploy` in your deployment pipeline

## ✨ Developer Experience

This setup ensures that:
- ✅ New team members can start immediately
- ✅ Database schema stays in sync
- ✅ No manual setup steps required
- ✅ Works in CI/CD pipelines
- ✅ Handles both fresh installs and updates

Happy coding! 🎮 