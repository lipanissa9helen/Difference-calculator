import { readFileSync } from 'fs';
import path from 'path';
import { cwd } from 'process';
import buildTree from './buildTree.js';
import parse from './parsers.js';
import formatTree from './formatters/index.js';

const getPath = (filepath) => path.resolve(cwd(), filepath);
const getFormat = (fileName) => path.extname(fileName);

export default (filepath1, filepath2, formatName = 'stylish') => {
  const path1 = getPath(filepath1);
  const path2 = getPath(filepath2);
  const data1 = readFileSync(filepath1, 'utf-8');
  const data2 = readFileSync(filepath2, 'utf-8');
  const parseData1 = parse(data1, getFormat(path1));
  const parseData2 = parse(data2, getFormat(path2));
  return formatTree(buildTree(parseData1, parseData2), formatName);
};
