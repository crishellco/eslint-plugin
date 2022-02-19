'use strict';

var rule = require('./newlines-between');
var RuleTester = require('eslint').RuleTester;

var tester = new RuleTester({
  parser: require.resolve('vue-eslint-parser'),
  parserOptions: { ecmaVersion: 2015, sourceType: 'module' }
});
tester.run('newlines-between', rule, {
  valid: [
    {
      filename: 'valid-newlines-between-props.vue',
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
      filename: 'invalid-no-newlines-between-props.vue',
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
      `,
      errors: [
        {
          line: 7,
          message: 'Expected newline before property'
        },
        {
          line: 9,
          message: 'Expected newline before property'
        }
      ],
      output: `
<template></template>
<script>
  export default {
    props: {
      a: { type: String },
      \nb: { type: String }
    },
    \ncomputed: {
      c() { return 'test'; }
    }
  };
</script>
      `
    }
  ]
});
