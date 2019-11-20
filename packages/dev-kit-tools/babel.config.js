module.exports = function(api) {
  api.cache(true);
  return {
    presets: [
      [
        '@babel/preset-env',
        {
          useBuiltIns: 'usage'
        }
      ],
      '@babel/plugin-transform-typescript'
    ],
    plugins: [
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      ['@babel/plugin-proposal-class-properties', { loose: true }],
      '@babel/plugin-proposal-numeric-separator',
      '@babel/plugin-proposal-object-rest-spread',
      '@babel/plugin-transform-literals'
    ]
  };
};
