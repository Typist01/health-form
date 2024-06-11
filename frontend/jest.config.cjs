module.exports = {
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },    
    transform: {
      '^.+\\.[t|j]sx?$': 'babel-jest',
    },
    testEnvironment: 'jsdom',
    testPathIgnorePatterns: ["<rootDir>/node_modules/"]
  };
  