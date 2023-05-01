module.exports = {
    extends: ["eslint:recommended", "react-app"],
    //plugins: ["prettier"],
    ignorePatterns: ["/**/node_modules/*"],
    rules: {
        //"prettier/prettier": "warn", // see https://github.com/prettier/eslint-plugin-prettier
        "no-console": "off" // Disabled for common usage of console in development
    }
};
