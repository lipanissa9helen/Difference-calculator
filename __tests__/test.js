import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const fileJSON1 = getFixturePath('file1.json');
const fileJSON2 = getFixturePath('file2.json');
const resultStylish = readFile('result_stylish.txt');

test.each([{
  file1: fileJSON1, file2: fileJSON2, format: 'stylish', expected: resultStylish,
},
])('tests', ({
  a, b, format, expected,
}) => {
  expect(genDiff(a, b, format)).toBe(expected);
});
