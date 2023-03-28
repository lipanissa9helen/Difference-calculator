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
const fileYML1 = getFixturePath('file1.yml');
const fileYML2 = getFixturePath('file2.yml');

const resultStylish = readFile('result_stylish.txt');
const resultPlain = readFile('result_plain.txt');
const resultJSON = readFile('result_json.txt');

test.each([{
  file1: fileJSON1, file2: fileJSON2, format: 'stylish', expected: resultStylish,
},
{
  file1: fileJSON1, file2: fileJSON2, format: 'plain', expected: resultPlain,
},
{
  file1: fileJSON1, file2: fileJSON2, format: 'json', expected: resultJSON,
},
{
  file1: fileYML1, file2: fileYML2, format: 'stylish', expected: resultStylish,
},
{
  file1: fileYML1, file2: fileYML2, format: 'plain', expected: resultPlain,
},
{
  file1: fileYML1, file2: fileYML2, format: 'json', expected: resultJSON,
},
])('tests', ({
  file1, file2, format, expected,
}) => {
  expect(genDiff(file1, file2, format)).toBe(expected);
});
