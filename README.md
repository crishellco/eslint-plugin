<p align="center">
  <img src="https://github.com/crishellco/eslint-plugin/actions/workflows/node-ci.yml/badge.svg" alt="Build">
  <a href="https://codecov.io/gh/crishellco/eslint-plugin"><img src="https://codecov.io/gh/crishellco/eslint-plugin/branch/master/graph/badge.svg?token=IKcXpNL84k" alt="codecov"></a>
  <a href="https://codeclimate.com/github/crishellco/eslint-plugin/maintainability"><img src="https://api.codeclimate.com/v1/badges/d1cd1c83761a23f610fd/maintainability" /></a>
  <br>
</p>

# @crishellco/eslint-plugin

An opinionated [ESLint](https://eslint.org) [Plugin](https://eslint.org/docs/developer-guide/working-with-plugins)
for [Vue.js](https://vuejs.org/) projects.

## Table of Contents

* [Usage](#usage)
  * [Installation](#installation)
  * [Add to the project config](#add-to-the-project-config)
  * [Extend the recommended config](#extend-the-recommended-config)
* [Contributing](#contributing)
  * [Dependencies](#dependencies)
  * [Verification](#verification)

## Usage

<!--consumer-badges start -->

<!--consumer-badges end -->

### Installation

```sh
$ yarn add @crishellco/eslint-plugin --dev
```

### Add to the project config

Such as in an `.eslintrc.js`

```js
module.exports = {
  plugins: [ '@crishellco' ]
};
```

### Extend the recommended config

```js
module.exports = {
  extends: [ 'plugin:@crishellco/recommended' ],
  plugins: [ '@crishellco' ]
};
```

## Contributing

<!--contribution-badges start -->

[![Conventional Commits][commit-convention-badge]][commit-convention-link]
[![Commitizen friendly][commitizen-badge]][commitizen-link]

<!--contribution-badges end -->

### Dependencies

```sh
$ nvm install
$ yarn install
```

### Verification

```sh
$ yarn test
```

[commit-convention-link]: https://conventionalcommits.org

[commit-convention-badge]: https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg

[commitizen-link]: http://commitizen.github.io/cz-cli/

[commitizen-badge]: https://img.shields.io/badge/commitizen-friendly-brightgreen.svg
