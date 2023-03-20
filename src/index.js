import { readFileSync } from 'fs';
import path from 'path';
import { cwd } from 'process';
import genDiff from './genDiff.js';
import parse from './parsers.js';

const getPath = (filepath) => path.resolve(cwd(), filepath);
const getFormat = (fileName) => path.extname(fileName);

export default (filepath1, filepath2) => {
  const path1 = getPath(filepath1);
  const path2 = getPath(filepath2);
  const data1 = readFileSync(filepath1, 'utf-8');
  const data2 = readFileSync(filepath2, 'utf-8');
  
  const parseData1 = parse(data1, getFormat(path1));
  const parseData2 = parse(data2, getFormat(path2));
  return genDiff(parseData1, parseData2);
};
