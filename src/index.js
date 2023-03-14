import { readFileSync } from 'fs';
import path from 'path';
import { cwd } from 'process';
import genDiff from './genDiff.js';

export default (filepath1, filepath2) => {
  const data1 = readFileSync(path.resolve(cwd(), filepath1), 'utf-8');
  const data2 = readFileSync(path.resolve(cwd(), filepath2), 'utf-8');
  const parseData1 = JSON.parse(data1);
  const parseData2 = JSON.parse(data2);

  return genDiff(parseData1, parseData2);
};
