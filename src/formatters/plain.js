const stringify = (value) => {
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  if (typeof value === 'object' && value !== null) {
    return '[complex value]';
  }
  return value;
};

const iter = (tree, pathKey = '') => {
  const result = tree
    .filter(({ type }) => type !== 'unchanged')
    .flatMap((node) => {
      const keys = [...pathKey, node.key];
      const path = keys.join('.');
      switch (node.type) {
        case 'nested': {
          return iter(node.value, keys);
        }
        case 'deleted': {
          return `Property '${path}' was removed`;
        }
        case 'added': {
          return `Property '${path}' was added with value: ${stringify(node.value)}`;
        }
        case 'changed': {
          return `Property '${path}' was updated. From ${stringify(node.value1)} to ${stringify(node.value2)}`;
        }
        default:
          throw new Error(`Error: ${node.key} unknown node type`);
      }
    });
  return result;
};
export default (tree) => iter(tree).join('\n');
