module.exports = {
    env: {
        browser: true,
        node: true,
        es6: true
    },
    extends: ["eslint:recommended"],
    //plugins: ["prettier"],
    ignorePatterns: ["/**/node_modules/*"],
    parserOptions: {
        ecmaVersion: "latest"
    },
    rules: {
        //"prettier/prettier": "warn", // see https://github.com/prettier/eslint-plugin-prettier
        "no-console": "off" // Disabled for common usage of console in development
    },
    globals: {}
};
