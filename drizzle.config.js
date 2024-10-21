import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    schema: './src/db/schemas.js',
    out: './drizzle',
    dialect:'postgresql'// any additional configurations...
});

  