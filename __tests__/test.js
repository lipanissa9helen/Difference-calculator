import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { expect, test } from '@jest/globals';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test('file json', () => {
  const expected = readFile('result_json.txt');
  const actual = genDiff(getFixturePath('filepath1.json'), getFixturePath('filepath2.json'));
  expect(actual).toBe(expected);
});

test('file yml', () => {
  const expected = readFile('result_json.txt');
  const actual = genDiff(getFixturePath('filepath1.yml'), getFixturePath('filepath2.yml'));
  expect(actual).toBe(expected);
});
