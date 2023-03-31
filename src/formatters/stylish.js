import _ from 'lodash';

const space = ' ';
const spaceCount = 4;

const getIndent = (depth) => space.repeat(depth * spaceCount).slice(0, -2);

const stringify = (value, depth) => {
  if (!_.isPlainObject(value)) {
    return String(value);
  }
  const lines = Object
    .entries(value)
    .map(([key, val]) => `${getIndent(depth + 1)}  ${key}: ${stringify(val, (depth + 1))}`);
  return `{\n${lines.join('\n')}\n${getIndent(depth)}  }`;
};

const iter = (tree, depth = 1) => {
  const result = tree
    .flatMap((node) => {
      switch (node.type) {
        case 'nested': {
          return `${getIndent(depth)}  ${node.key}: {\n${iter(node.value, depth + 1).join('\n')}\n${getIndent(depth)}  }`;
        }
        case 'deleted': {
          return `${getIndent(depth)}- ${node.key}: ${stringify(node.value, depth)}`;
        }
        case 'added': {
          return `${getIndent(depth)}+ ${node.key}: ${stringify(node.value, depth)}`;
        }
        case 'changed': {
          return `${getIndent(depth)}- ${node.key}: ${stringify(node.value1, depth)}\n${getIndent(depth)}+ ${node.key}: ${stringify(node.value2, depth)}`;
        }
        case 'unchanged': {
          return `${getIndent(depth)}  ${node.key}: ${stringify(node.value, depth)}`;
        }
        default:
          throw new Error(`Error: ${node.type} this type doesn't exist in this file`);
      }
    });
  return result;
};
export default (diff) => `{\n${iter(diff).join('\n')}\n}`;
