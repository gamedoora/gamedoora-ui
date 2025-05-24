UI built in NextJs (typescript) for gamedoora, a social and collaboration hub for everyone involved in gaming, animation, and film production pipeline

## Getting Started

This project is designed for zero-setup development. Everything is automated!

```bash
git clone <repository-url>
cd gamedoora-ui
npm install  # Automatically sets up database and dependencies
npm run dev  # Start developing immediately
```

The `npm install` command automatically:
- ✅ Installs all dependencies
- ✅ Sets up the SQLite database
- ✅ Runs database migrations
- ✅ Generates Prisma client
- ✅ Configures testing environment

No manual database setup required! 🎉

### Manual Database Management

If you need to manage the database manually:

```bash
npm run db:setup    # Initialize database
npm run db:reset    # Reset database (deletes all data)
npm run db:studio   # Open database GUI
```

For detailed database information, see [DATABASE_SETUP.md](./DATABASE_SETUP.md).

Alternatively, you can run the application using Podman/Docker:

First, pull the image:

```bash
podman pull ghcr.io/gamedoora/gamedoora-ui:latest
```

Then, run the container:

```bash
podman run -d --name gamedoora-ui -p 3000:3000 ghcr.io/gamedoora/gamedoora-ui:latest
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
