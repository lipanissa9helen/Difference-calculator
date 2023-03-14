import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import { expect, test } from '@jest/globals';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const filename1 = getFixturePath('file1.json');
const filename2 = getFixturePath('file2.json');

const result = getFixturePath('result_jSON.txt');

test('file json', () => {
  expect(genDiff(filename1, filename2)).toBe(result);
});
