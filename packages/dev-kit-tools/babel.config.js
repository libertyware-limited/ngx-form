module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['@babel/plugin-transform-typescript', '@babel/preset-env'],
    plugins: [
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      ['@babel/plugin-proposal-class-properties', { loose: true }],
      '@babel/plugin-proposal-numeric-separator',
      '@babel/plugin-proposal-object-rest-spread',
      '@babel/plugin-transform-literals'
    ]
  };
};
