module.exports = {
  preset: 'react-native',
  testEnvironment: 'node',
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|@reduxjs|redux-logger|immer|react-redux)/)'
  ],
  setupFiles: ['./jest.setup.js'],
};
