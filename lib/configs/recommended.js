module.exports = {
  plugins: ['import'],
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        '@crishellco/alphabetize': 'error',
        '@crishellco/newlines-between': 'error'
      }
    }
  ],
  rules: {
    'import/named': 'off',
    'import/no-named-default': 'off',
    'import/order': [
      'error',
      {
        alphabetize: {
          order: 'asc',
        },
        groups: [
          ['builtin', 'external', 'unknown'],
          ['internal'],
          ['parent', 'sibling', 'index'],
        ],
        'newlines-between': 'always',
        pathGroups: [
          {
            group: 'internal',
            pattern: '{@,~}/*/**',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
      },
    ],

  }
};
