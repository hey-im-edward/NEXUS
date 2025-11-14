import nextConfig from 'eslint-config-next';

const projectIgnores = [
  'node_modules/**',
  '.next/**',
  'out/**',
  'build/**',
  'coverage/**',
  'UX-UI/**',
  'docs/**',
  'public/**',
  '**/*.config.js',
  '**/*.config.mjs'
];

export default [
  {
    ignores: projectIgnores,
  },
  ...nextConfig,
];
