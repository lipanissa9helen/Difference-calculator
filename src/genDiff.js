import _ from 'lodash';

const genDiff = (data1, data2) => {
  const keys1 = _.keys(data1);
  const keys2 = _.keys(data2);
  const keys = _.sortBy(_.union(keys1, keys2));

  const iter = (objString, key) => {
    const emptiness = `  ${key}`;
    const plus = `+ ${key}`;
    const minus = `- ${key}`;

    if (!_.has(data2, key)) {
      objString.push(`  ${minus}: ${data1[key]}`);
    } else if (!_.has(data1, key)) {
      objString.push(`  ${plus}: ${data2[key]}`);
    } else if (data1[key] !== data2[key]) {
      objString.push(`  ${minus}: ${data1[key]}`);
      objString.push(`  ${plus}: ${data2[key]}`);
    } else {
      objString.push(`  ${emptiness}: ${data1[key]}`);
    }
    return objString;
  };
  const result = (keys.reduce(iter, []).join('\n'));
  result.toString();
  return `{\n${result}\n}`;
};
export default genDiff;
