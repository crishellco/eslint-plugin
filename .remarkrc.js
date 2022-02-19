exports.plugins = [
  '@rms/remark-preset',
  ['remark-toc', {tight: true}],
  ['validate-links', {repository: false}]
];
