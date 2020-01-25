const fabric = require('@umijs/fabric');

module.exports = {
  ...fabric.stylelint,
  rules: Object.assign({}, fabric.stylelint.rules, {
    'property-no-unknown': [ true, {
      // ignoreSelectors: [/^\.function-/]
      ignoreProperties: ['return']
    }]
  })
};
