const utils = require('eslint-plugin-vue/lib/utils');

const exceptions = ['components'];

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'enforce newlines between base properties of vue component code',
      category: undefined
    },
    fixable: 'code',
    schema: [],
    messages: {
      expected: 'Expected newline before property'
    }
  },
  create: context => {
    const sourceCode = context.getSourceCode();

    function report(node) {
      context.report({
        node,
        messageId: 'expected',
        fix(fixer) {
          return fixer.insertTextBefore(node, '\n');
        }
      });
    }

    function calcCommentLines(node, lineNumTokenBefore) {
      const comments = sourceCode.getCommentsBefore(node);
      let numLinesComments = 0;

      if (!comments.length) {
        return numLinesComments;
      }

      comments.forEach(comment => {
        numLinesComments++;

        if (comment.type === 'Block') {
          numLinesComments += comment.loc.end.line - comment.loc.start.line;
        }

        // avoid counting lines with inline comments twice
        if (comment.loc.start.line === lineNumTokenBefore) {
          numLinesComments--;
        }

        if (comment.loc.end.line === node.loc.start.line) {
          numLinesComments--;
        }
      });

      return numLinesComments;
    }

    function hasNewLineBefore(node) {
      const lineNumNode = node.loc.start.line;
      const lineNumTokenBefore = getLineNumberOfTokenBefore(node);
      const commentLines = calcCommentLines(node, lineNumTokenBefore);

      return lineNumNode - lineNumTokenBefore - commentLines > 1;
    }

    function getLineNumberOfTokenBefore(node) {
      const tokenBefore = sourceCode.getTokenBefore(node);
      let lineNumTokenBefore;

      /**
       * Global return (at the beginning of a script) is a special case.
       * If there is no token before `return`, then we expect no line
       * break before the return. Comments are allowed to occupy lines
       * before the global return, just no blank lines.
       * Setting lineNumTokenBefore to zero in that case results in the
       * desired behavior.
       */
      if (tokenBefore) {
        lineNumTokenBefore = tokenBefore.loc.end.line;
      } else {
        lineNumTokenBefore = 0; // global return at beginning of script
      }

      return lineNumTokenBefore;
    }

    function maybeReportLackOfnewLine(node, nodeIndex) {
      if (nodeIndex !== 0) {
        const hasNewLine = hasNewLineBefore(node);

        if (!hasNewLine) {
          report(node);
        }
      }
    }

    return utils.executeOnVue(context, obj => {
      const rootProperties = obj.properties.filter(p => exceptions.indexOf(p.key.name) === -1);

      rootProperties.forEach((property, i) => {
        maybeReportLackOfnewLine(property, i);

        const subProperties = property.value.properties;
        if (subProperties) {
          subProperties.forEach(maybeReportLackOfnewLine);
        }
      });
    });
  }
};
