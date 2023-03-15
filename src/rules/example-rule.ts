import { Rule } from 'eslint';
import { Identifier } from 'estree';

export const exampleRule: Rule.RuleModule = {
  meta: {
    docs: {
      description: 'An example rule.',
      recommended: true,
      url: 'https://github.com/pivaszbs/template-typescript-eslint-plugin/blob/master/docs/rules/example-rule.md',
    },
    messages: {
      disallowExample: "'example' identifier is forbidden.",
    },
    schema: [],
    type: 'suggestion',
  },

  create(context) {
    return {
      "Identifier[name='example']"(node: Identifier) {
        context.report({
          node,
          messageId: 'disallowExample',
        });
      },
    };
  },
};
