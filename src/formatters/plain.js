import _ from 'lodash';

const stringify = (value) => {
  if (!_.isObject(value)) {
    const formattedValue = _.isString(value) ? `${value}` : `${value}`;
    return formattedValue;
  }
  return '[complex value]';
};

const iter = (tree, pathKey = '') => {
  const result = tree
    .filter(({ type }) => type !== 'unchanged')
    .flatMap(({
      type, key, value, value1, value2,
    }) => {
      const keys = [...pathKey, key];
      const path = keys.join('.');
      switch (type) {
        case 'nested': {
          return iter(value, keys);
        }
        case 'deleted': {
          return `Property '${path}' was removed`;
        }
        case 'added': {
          return `Property '${path}' was added with value: ${stringify(value)}`;
        }
        case 'changed': {
          return `Property '${path}' was updated. From ${stringify(value1)} to ${stringify(value2)}`;
        }
        default:
          throw new Error(`Error: ${key} unknown node type`);
      }
    });
  return result;
};
export default (tree) => iter(tree).join('\n');
