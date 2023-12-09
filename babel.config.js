module.exports = function (api) {
  api.cache(true)
  return {
    plugins: [
      // Required for expo-router
      'expo-router/babel',
    ],
    presets: ['babel-preset-expo'],
  }
}
