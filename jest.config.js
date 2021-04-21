module.exports = {
    // The root of your source code, typically /src
    // `<rootDir>` is a token Jest substitutes
    roots: ["<rootDir>/src"],

    // Jest transformations -- this adds support for TypeScript
    // using ts-jest
    transform: {
        "^.+\\.tsx?$": "ts-jest",
        "^.+\\.svg$": "<rootDir>/src/__tests__/jest/svgTransform.js"
    },

    // Runs special logic, such as cleaning up components
    // when using React Testing Library and adds special
    // extended assertions to Jest
    setupFiles: [
        // "@testing-library/react/cleanup-after-each",
        // "@testing-library/jest-dom/extend-expect"
        "<rootDir>/src/__tests__/jest/initializeEnv.js"
    ],

    collectCoverageFrom: [
        "src/**/*{.ts,.tsx}",
        "!src/stories/*",
        "!src/__tests__/**/*",
        "!src/components/**/*.stories.tsx",
        "!src/components/Alerts/*",
        "!src/store/**/*",
        "!src/layouts/Router.tsx",
        "!src/react-app-env.d.ts",
        "!src/setupTests.ts",
       // "!src/index.tsx",
        //"!src/App.tsx"
    ],

    // Test spec file resolution pattern
    // Matches parent folder `__tests__` and filename
    // should contain `test` or `spec`.
    testRegex: "(/src/__tests__/(pages|components|layouts)/.*|(\\.|/)(test|spec))\\.tsx?$",

    // Module file extensions for importing
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"]
};