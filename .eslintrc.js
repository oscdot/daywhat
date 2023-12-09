module.exports = {
  extends: ['universe/native', 'plugin:prettier/recommended'],
  plugins: ['perfectionist'],
  root: true,
  rules: {
    'perfectionist/sort-objects': [
      'error',
      {
        order: 'asc',
        type: 'natural',
      },
    ],
  },
}
