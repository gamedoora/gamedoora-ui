#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

/**
 * Database setup script that handles both first-time setup and existing installations
 * This ensures the database is properly initialized after npm install
 */

const dbPath = path.join(__dirname, '../prisma/dev.db');
const migrationsPath = path.join(__dirname, '../prisma/migrations');

console.log('🔧 Setting up database...');

try {
  // Check if this is a fresh install (no migrations directory or empty database)
  const isFirstTimeSetup = !fs.existsSync(migrationsPath) || 
                          !fs.existsSync(dbPath) || 
                          fs.statSync(dbPath).size === 0;

  if (isFirstTimeSetup) {
    console.log('📦 First-time setup detected. Creating database and running initial migration...');
    
    // Run migrate dev for first-time setup (creates migration if needed)
    execSync('npx prisma migrate dev --name init', { 
      stdio: 'inherit',
      cwd: path.join(__dirname, '..')
    });
  } else {
    console.log('🔄 Existing database detected. Applying pending migrations...');
    
    // For existing setups, just apply migrations and generate client
    execSync('npx prisma migrate deploy', { 
      stdio: 'inherit',
      cwd: path.join(__dirname, '..')
    });
  }

  // Always generate the Prisma client
  console.log('⚡ Generating Prisma client...');
  execSync('npx prisma generate', { 
    stdio: 'inherit',
    cwd: path.join(__dirname, '..')
  });

  console.log('✅ Database setup complete!');

} catch (error) {
  console.error('❌ Database setup failed:', error.message);
  
  // Provide helpful error messages
  if (error.message.includes('P1001')) {
    console.error('\n💡 Tip: Make sure the database file permissions are correct.');
  } else if (error.message.includes('P3000')) {
    console.error('\n💡 Tip: Migration failed. You might need to reset the database with: npm run db:reset');
  }
  
  process.exit(1);
} 