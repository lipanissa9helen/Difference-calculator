import { readFileSync } from 'fs';
import path from 'path';
import { cwd } from 'process';
import buildTree from './buildTree.js';
import parse from './parsers.js';
import formatTree from './formatters/index.js';

const getPath = (filepath) => readFileSync(path.resolve(cwd(), filepath));
const getFormat = (fileName) => path.extname(fileName).slice(1);

export default (filepath1, filepath2, formatName = 'stylish') => {
  const parseData1 = parse(getPath(filepath1), getFormat(filepath1));
  const parseData2 = parse(getPath(filepath2), getFormat(filepath2));
  return formatTree(buildTree(parseData1, parseData2), formatName);
};
