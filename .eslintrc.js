module.exports = {
    env: {
        node: true,
        es6: true,
    },
    extends: ['eslint:recommended', 'prettier'],
    parserOptions: {
        ecmaVersion: 2019,
    },
    rules: {
        'prettier/prettier': 'error',
    },
};