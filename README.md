# @crishellco/eslint-plugin

Opinionated [ESLint](https://eslint.org) [Plugin](https://eslint.org/docs/developer-guide/working-with-plugins)
for [Vue.js](https://vuejs.org/) projects.

<!--status-badges start -->

<!--status-badges end -->

## Table of Contents

* [Usage](#usage)
  * [Installation](#installation)
  * [Add to the project config](#add-to-the-project-config)
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
