import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test('file json', () => {
  const expected = readFile('result_json.txt');
  const actual = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
  expect(actual).toEqual(expected);
});
