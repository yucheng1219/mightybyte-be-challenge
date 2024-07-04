/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
  extends: [
    'prettier',
  ],
  plugins: [
    '@typescript-eslint',
    'import',
    'filename-rules'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': [
      'error',
      {
        allowArgumentsExplicitlyTypedAsAny: true,
      },
    ],
    '@typescript-eslint/consistent-type-imports': 'error',
    // Allow _ for no-unused-variables https://stackoverflow.com/a/64067915/8930600
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_+',
        varsIgnorePattern: '^_+',
        caughtErrorsIgnorePattern: '^_+',
      },
    ],
    '@typescript-eslint/no-non-null-assertion': 'error',
    '@typescript-eslint/no-explicit-any': 'error',    
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],

    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'typeLike',
        format: ['PascalCase'],
        leadingUnderscore: 'allow',
      },
      {
        selector: 'parameter',
        format: ['camelCase'],
        leadingUnderscore: 'allow',
      },
      {
        /** We must support PascalCase because both zod schemas and unstated-next objects do use it */
        selector: 'variable',
        format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
        leadingUnderscore: 'allow',
      },
    ],

    'import/extensions': 'off',
    'import/no-relative-parent-imports': 'error',
    'filename-rules/match': ['error', /^([a-z0-9]+-)*[a-z0-9]+(?:\..*)?$/],
  },
}
