import { readFileSync } from 'fs';
import path from 'path';
import { cwd } from 'process';
import genDiff from './genDiff.js';

const getPath = (filepath) => readFileSync(path.resolve(cwd(), '__fixtures__', filepath));

export default (filepath1, filepath2) => {
  const parseData1 = JSON.parse(getPath(filepath1));
  const parseData2 = JSON.parse(getPath(filepath2));

  return genDiff(parseData1, parseData2);
};
