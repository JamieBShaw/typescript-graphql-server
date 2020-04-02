module.exports = {
    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    extends: ['prettier/@typescript-eslint', 'plugin:prettier/recommended'],
    rules: {
        '@typescipt-eslint/interface-name-prefix': [1],
        'no-underscore-dangle': 'error',
    },
};
