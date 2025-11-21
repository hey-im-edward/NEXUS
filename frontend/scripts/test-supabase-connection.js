// Test Supabase connection
// Usage: npm run test:db (from frontend directory)
//
// This script tests both Anon Key (frontend) and Service Role Key (backend) connections

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Read .env.local file from frontend directory
const envPath = path.join(__dirname, '..', '.env.local');
const envFile = fs.readFileSync(envPath, 'utf8');
const envVars = {};

envFile.split('\n').forEach(line => {
  const match = line.match(/^([^#=]+)=(.+)$/);
  if (match) {
    envVars[match[1].trim()] = match[2].trim();
  }
});

const supabaseUrl = envVars.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = envVars.SUPABASE_SERVICE_ROLE_KEY;

console.log('🔍 Testing Supabase connection...\n');
console.log('URL:', supabaseUrl ? supabaseUrl.substring(0, 30) + '...' : 'NOT FOUND');
console.log('Anon Key:', supabaseAnonKey ? 'Found (length: ' + supabaseAnonKey.length + ')' : 'NOT FOUND');
console.log('Service Key:', supabaseServiceKey ? 'Found (length: ' + supabaseServiceKey.length + ')' : 'NOT FOUND');
console.log('');

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabaseAnon = createClient(supabaseUrl, supabaseAnonKey);
const supabaseAdmin = supabaseServiceKey ? createClient(supabaseUrl, supabaseServiceKey) : null;

async function testConnection() {
  try {
    console.log('='.repeat(60));
    console.log('TESTING WITH ANON KEY (Public/Frontend)');
    console.log('='.repeat(60));
    
    // Test 1: Basic connection with Anon Key
    console.log('\nTest 1: Testing basic connection (Anon Key)...');
    const { data, error } = await supabaseAnon.from('profiles').select('count').limit(1);
    
    if (error) {
      console.log('⚠️  Table "profiles" might not exist yet');
      console.log('   Error:', error.message);
    } else {
      console.log('✅ Successfully connected to Supabase!');
      console.log('   Data:', data);
    }

    // Test 2: Check auth
    console.log('\nTest 2: Testing auth service (Anon Key)...');
    const { data: { user }, error: authError } = await supabaseAnon.auth.getUser();
    
    if (authError && authError.message !== 'Auth session missing!') {
      console.log('❌ Auth error:', authError.message);
    } else {
      console.log('✅ Auth service is accessible');
      console.log('   Current user:', user ? user.email : 'No user logged in (expected)');
    }

    // Test 3: Try to list tables with Anon Key (should fail)
    console.log('\nTest 3: Attempting to list tables (Anon Key)...');
    const { data: tables, error: tablesError } = await supabaseAnon
      .from('information_schema.tables')
      .select('table_name')
      .limit(5);
    
    if (tablesError) {
      console.log('⚠️  Cannot list tables with Anon Key (expected)');
      console.log('   This is normal - anon key has limited permissions');
    } else {
      console.log('✅ Can access database schema');
      console.log('   Tables:', tables);
    }

    // Tests with Service Role Key
    if (supabaseAdmin) {
      console.log('\n' + '='.repeat(60));
      console.log('TESTING WITH SERVICE ROLE KEY (Admin/Backend)');
      console.log('='.repeat(60));
      
      // Test 4: Basic connection with Service Key
      console.log('\nTest 4: Testing basic connection (Service Key)...');
      const { data: adminData, error: adminError } = await supabaseAdmin
        .from('profiles')
        .select('count')
        .limit(1);
      
      if (adminError) {
        console.log('⚠️  Error:', adminError.message);
      } else {
        console.log('✅ Admin connection successful!');
        console.log('   Data:', adminData);
      }

      // Test 5: List all tables in public schema
      console.log('\nTest 5: Listing tables in public schema (Service Key)...');
      const { data: publicTables, error: publicError } = await supabaseAdmin.rpc('get_public_tables', {});
      
      // Alternative method: direct query
      const { data: schemaData, error: schemaError } = await supabaseAdmin
        .from('pg_tables')
        .select('tablename')
        .eq('schemaname', 'public');
      
      if (schemaError) {
        console.log('⚠️  Cannot query pg_tables, trying alternative...');
        
        // Try listing known tables
        const knownTables = ['profiles', 'projects', 'tasks', 'workspaces', 'workspace_members', 'app_minis'];
        console.log('   Checking known tables:');
        
        for (const table of knownTables) {
          const { error } = await supabaseAdmin.from(table).select('count').limit(1);
          if (!error) {
            console.log(`   ✅ ${table} - exists`);
          } else {
            console.log(`   ❌ ${table} - ${error.message}`);
          }
        }
      } else {
        console.log('✅ Successfully listed tables:');
        schemaData.forEach(t => console.log(`   - ${t.tablename}`));
      }

      // Test 6: Check RLS policies
      console.log('\nTest 6: Checking RLS status (Service Key)...');
      const { data: rlsData, error: rlsError } = await supabaseAdmin
        .from('pg_tables')
        .select('tablename, rowsecurity')
        .eq('schemaname', 'public');
      
      if (rlsError) {
        console.log('⚠️  Cannot check RLS status');
      } else {
        console.log('✅ RLS Status:');
        rlsData.forEach(t => {
          const status = t.rowsecurity ? '🔒 Enabled' : '🔓 Disabled';
          console.log(`   ${status} - ${t.tablename}`);
        });
      }
    } else {
      console.log('\n' + '='.repeat(60));
      console.log('⚠️  Service Role Key not found - skipping admin tests');
      console.log('='.repeat(60));
    }

    console.log('\n✅ Connection test completed!');
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    process.exit(1);
  }
}

testConnection();
