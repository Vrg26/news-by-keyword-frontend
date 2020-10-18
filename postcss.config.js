// eslint-disable-next-line import/no-extraneous-dependencies
const autoprefixer = require('autoprefixer');
// eslint-disable-next-line import/no-extraneous-dependencies
const cssnano = require('cssnano');

module.exports = {
  plugins: [
    autoprefixer,
    cssnano({
      preset: 'default',
    }),
  ],
};
