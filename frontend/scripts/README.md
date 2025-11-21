# Frontend Scripts

Utility scripts for NEXUS frontend maintenance and testing.

## Available Scripts

### `test-supabase-connection.js`

Test Supabase database connection with both Anon Key and Service Role Key.

**Usage:**

```bash
# From frontend directory
npm run test:db
```

**Requirements:**

- Node.js installed
- `.env.local` file in `frontend/` directory with Supabase credentials
- `@supabase/supabase-js` package installed

**What it tests:**

- ✅ Basic connection with Anon Key (public/frontend key)
- ✅ Auth service availability
- ✅ Table access permissions
- ✅ Admin connection with Service Role Key (backend key)
- ✅ List existing tables in database
- ✅ Check RLS (Row Level Security) status

**Output:**

- Shows URL and key status
- Tests both authentication levels
- Lists available database tables
- Validates permissions are correctly configured

---

## Adding New Scripts

When adding new utility scripts to this directory:

1. Place them in `frontend/scripts/` folder
2. Use descriptive names: `verb-noun-description.js`
3. Add documentation in this README
4. Include comments in the script explaining what it does
5. Handle errors gracefully
6. Add npm script to `package.json` if frequently used

### Script Naming Convention

- `test-*.js` - Testing/validation scripts
- `setup-*.js` - Setup/initialization scripts
- `seed-*.js` - Database seeding scripts
- `migrate-*.js` - Database migration helpers
- `generate-*.js` - Code generation utilities

### Example Template

```javascript
// Brief description of what this script does
// Usage: npm run script-name

const { createClient } = require('@supabase/supabase-js');

async function main() {
  try {
    // Your code here
    console.log('✅ Script executed successfully');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main();
```

## npm Scripts Reference

Add to `package.json`:

```json
{
  "scripts": {
    "test:db": "node scripts/test-supabase-connection.js"
  }
}
```
