module.exports = {
  plugins: [require('postcss-preset-env'), 
  require('postcss-pxtorem')({
    rootValue: 16,
    propList: ['*'],
    exclude: /node_modules/i
  })]
}