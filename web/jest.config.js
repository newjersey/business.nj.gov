module.exports = {
  setupFilesAfterEnv: ["./setupTests.js"],
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  moduleNameMapper: {
    "\\.(scss|sass|css)$": "identity-obj-proxy",
  },
  transform: {
    "\\.md$": "jest-raw-loader",
    "\\.[jt]sx?$": "babel-jest",
  },
};
