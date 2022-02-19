const utils = require('eslint-plugin-vue/lib/utils');

const membersToAlphabetize = ['computed', 'methods', 'props', 'watch'];

function isComma(node) {
  return node.type === 'Punctuator' && node.value === ',';
}

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'alphabetize properties in computed, methods, props and watch blocks',
      category: undefined
    },
    fixable: 'code',
    schema: []
  },
  create: context => {
    const sourceCode = context.getSourceCode();

    return utils.executeOnVue(context, obj => {
      const properties = obj.properties.filter(property => membersToAlphabetize.includes(property.key.name));

      properties.forEach(property => {
        const sortableProperties = property.value.properties.filter(p => 'key' in p && 'name' in p.key);
        const currentOrder = sortableProperties.map(p => p.key.name);
        const fixedOrder = currentOrder.slice(0).sort();

        sortableProperties.forEach((subProperty, j) => {
          const subPropertiesAbove = sortableProperties.slice(0, j);
          const unorderedProperties = subPropertiesAbove
            .filter(p => fixedOrder.indexOf(p.key.name) > fixedOrder.indexOf(subProperty.key.name))
            .sort((p1, p2) => (fixedOrder.indexOf(p1.name) > fixedOrder.indexOf(p2.name) ? 1 : -1));

          const firstUnorderedProperty = unorderedProperties[0];

          if (firstUnorderedProperty) {
            const line = firstUnorderedProperty.loc.start.line;
            context.report({
              node: property,
              message: `The "{{name}}" property on line {{line}} should be above the "{{firstUnorderedPropertyName}}" property.`,
              data: {
                name: subProperty.key.name,
                firstUnorderedPropertyName: firstUnorderedProperty.key.name,
                line
              },
              fix(fixer) {
                const propertyNode = subProperty;
                const firstUnorderedPropertyNode = firstUnorderedProperty;

                const afterComma = sourceCode.getTokenAfter(propertyNode);
                const hasAfterComma = isComma(afterComma);

                const beforeComma = sourceCode.getTokenBefore(propertyNode);
                const codeStart = beforeComma.range[1]; // to include comments
                const codeEnd = hasAfterComma ? afterComma.range[1] : propertyNode.range[1];

                const propertyCode = sourceCode.text.slice(codeStart, codeEnd) + (hasAfterComma ? '' : ',');
                const insertTarget = sourceCode.getTokenBefore(firstUnorderedPropertyNode);

                const removeStart = hasAfterComma ? codeStart : beforeComma.range[0];

                return [fixer.removeRange([removeStart, codeEnd]), fixer.insertTextAfter(insertTarget, propertyCode)];
              }
            });
          }
        });
      });
    });
  }
};
