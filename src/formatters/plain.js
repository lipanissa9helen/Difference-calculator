import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return String(value);
};

const plain = (diff) => {
  const iter = (innerData, oldKey = '') => {
    const result = innerData.map((data) => {
      switch (data.type) {
        case 'nested':
          return iter(data.children, `${oldKey}${data.key}.`);
        case 'added':
          return `Property ${oldKey}${data.key} was added with value: ${stringify(data.value)}`;
        case 'delited':
          return `Property ${oldKey}${data.key} was removed`;
        case 'changed':
          return `Property ${oldKey}${data.key} was updated. From ${stringify(data.oldValue)} to ${stringify(data.value)}`;
        case 'unchanged':
          return [];
        default:
          throw new Error(`Unknown type ${data.key}`);
      }
    });
    return result.join('\n');
  };
  return iter(diff);
};
export default plain;
