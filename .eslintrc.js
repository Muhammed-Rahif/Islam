module.exports = {
  extends: [
    'react-app',
    'plugin:react/recommended',
    'eslint:recommended',
    'plugin:react-hooks/recommended',
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.ts', '.tsx'] }],
  },
  overrides: [
    {
      files: ['*.ts'],
      rules: {
        'no-undef': 'off',
        'react/display-name': 'off',
      },
    },
  ],
};
