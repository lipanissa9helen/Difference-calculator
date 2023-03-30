import _ from 'lodash';

const buildTree = (obj1, obj2) => {
  const keys = _.sortBy(_.union(_.keys(obj1), _.keys(obj2)));

  const tree = keys.map((key) => {
    if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
      return { key, type: 'nested', value: buildTree(obj1[key], obj2[key]) };
    }
    if (!_.has(obj2, key)) {
      return { key, type: 'deleted', value: obj1[key] };
    }
    if (!_.has(obj1, key)) {
      return { key, type: 'added', value: obj2[key] };
    }
    if (obj1[key] !== obj2[key]) {
      return {
        key, type: 'changed', value1: obj1[key], value2: obj2[key],
      };
    }
    return { key, type: 'unchanged', value: obj1[key] };
  });
  return tree;
};
export default buildTree;
