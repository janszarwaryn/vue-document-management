module.exports = {
    root: true,
    env: {
        node: true,
        browser: true,
    },
    extends: [
        'plugin:vue/essential',
        'airbnb-base',
    ],
    parserOptions: {
        parser: 'babel-eslint',
        ecmaVersion: 2020,
        sourceType: 'module',
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'import/no-extraneous-dependencies': ['error', { 'devDependencies': true }],
        'max-len': ['error', { 'code': 150 }],
        'no-param-reassign': ['error', { 'props': false }],
        'indent': 'off',
        "quotes": "off",
        "object-curly-newline": "off",
        "no-undef": "off",
        "no-multiple-empty-lines": "off",
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.vue'],
            },
        },
    },
};
