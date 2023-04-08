module.exports = {
    preset: "@vue/cli-plugin-unit-jest",
    testEnvironment: "jest-environment-jsdom",
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
    },
    moduleFileExtensions: ["js", "vue"],
    transform: {
        ".*\\.(vue)$": "vue-jest",
        "^.+\\.js$": "babel-jest",
    },
    testMatch: [
        "**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)",
    ],
    collectCoverage: true,
    collectCoverageFrom: [
        "src/**/*.{js,vue}",
        "!src/main.js",
        "!**/node_modules/**",
    ],
    coverageReporters: ["html", "text-summary"],
    setupFiles: ["<rootDir>/src/tests/unit/setup.js"],
};
