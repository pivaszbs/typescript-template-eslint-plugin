import fs from 'fs';
import path from 'path';
import { pluginId } from './plugin-id';
const rootDir = path.resolve(__dirname, '../../src/rules/');

type RuleType = 'suggestion' | 'problem' | 'layout';

export type RuleInfo = {
  filePath: string;
  id: string;
  name: string;
  category: string;
  description: string;
  recommended: boolean;
  deprecated: boolean;
  fixable: boolean;
  replacedBy: string[];
};

export type CategoryInfo = {
  id: RuleType;
  rules: RuleInfo[];
};

export const rules: RuleInfo[] = fs
  .readdirSync(rootDir)
  .sort()
  .map(
    (filename): RuleInfo | false => {
      const filePath = path.join(rootDir, filename);
      const name = filename.slice(0, -3);
      const file = require(filePath).default;
      if (!file) return false;

      const { meta } = file

      return {
        filePath,
        id: `${pluginId}/${name}`,
        name,
        deprecated: Boolean(meta.deprecated),
        fixable: Boolean(meta.fixable),
        replacedBy: [],
        ...meta.docs,
      };
    }
  ).filter<RuleInfo>((rule): rule is RuleInfo => Boolean(rule));

const ruleTypes: RuleType[] = ['suggestion', 'problem', 'layout'];

export const categories: CategoryInfo[] = ruleTypes.map(
  (id): CategoryInfo => ({
    id,
    rules: rules.filter((rule) => rule.category === id && !rule.deprecated),
  })
);
