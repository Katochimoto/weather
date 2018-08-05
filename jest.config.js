module.exports = {
  "verbose": false,
  "testURL": "http://localhost/",
  "moduleFileExtensions": [
    "js",
    "jsx"
  ],
  "moduleNameMapper": {
    "^@/(.*)$": "<rootDir>/src/$1",
    ".+\\.(png|jpg|ttf|woff|woff2)$": "identity-obj-proxy",
  },
  "transform": {
    "^.+\\.js$": "<rootDir>/node_modules/babel-jest",
    ".+\\.(postcss|css|styl|less|sass|scss)$": "<rootDir>/node_modules/jest-css-modules-transform"
  },
  "snapshotSerializers": [
  ],
  "collectCoverage": true,
  "collectCoverageFrom": [
    "**/*.{js}",
    "!**/node_modules/**"
  ],
  "coverageReporters": [
    "html",
    "text-summary"
  ],
  "moduleDirectories": [
    "node_modules"
  ],
  "coverageThreshold": {
    "global": {
    "branches": 80,
    "functions": 80,
    "lines": 80,
    "statements": 80
    }
  },
  "cache": true
}
