module.exports = {
  roots: ["<rootDir>/src"],
  testMatch: [
    "**/tests/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)"
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  globals: {
    // Suppress noise about enabling `esModuleInterop`
    "ts-jest": { diagnostics: { ignoreCodes: [151001] } },
    _VERSION: true
  }
};
