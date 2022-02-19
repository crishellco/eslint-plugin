module.exports = {
  configs: {
    recommended: require('./configs/recommended')
  },

  rules: {
    alphabetize: require('./rules/alphabetize'),
    'newlines-between': require('./rules/newlines-between')
  }
};
