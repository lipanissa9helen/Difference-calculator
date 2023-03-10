#!/usr/bin/env node
import { program } from 'commander';
import genDiff from '../src/index.js';

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filePath1, filePath2) => {
    console.log(genDiff(filePath1, filePath2, program.format));
  });

program.parse();
