'use strict';

var rule = require('./alphabetize');
var RuleTester = require('eslint').RuleTester;

var tester = new RuleTester({
  parser: require.resolve('vue-eslint-parser'),
  parserOptions: { ecmaVersion: 2015, sourceType: 'module' }
});
tester.run('alphabetize', rule, {
  valid: [
    {
      filename: 'valid-props-alphabetized.vue',
      code: `
<template></template>
<script>
  export default {
    props: {
      a: { type: String },
      b: { type: String }
    },
    computed: {
      c() { return 'test'; }
    }
  };
</script>
      `
    }
  ],
  invalid: [
    {
      filename: 'invalid-props-not-alphabetized.vue',
      code: `
<template></template>
<script>
  export default {
    props: {
      b: { type: String },
      a: { type: String }
    },
    computed: {
      c() { return 'test'; },
      d() { return 'test'; }
    }
  };
</script>
      `,
      errors: [
        {
          line: 5,
          message: 'The "a" property on line 6 should be above the "b" property.'
        }
      ],
      output: `
<template></template>
<script>
  export default {
    props: {
      a: { type: String },
      b: { type: String }
    },
    computed: {
      c() { return 'test'; },
      d() { return 'test'; }
    }
  };
</script>
      `
    }
  ]
});
