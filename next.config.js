module.exports = {
  env: {
    settings: {
      dataBaseURL: 'http://127.0.0.1:1337/graphql',
    },
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    });
    return config;
  },
  experimental: { scss: true },
  webpackDevMiddleware: (config) => {
    return config;
  },
};
