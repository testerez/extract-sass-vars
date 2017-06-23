#! /usr/bin/env node
import * as fs from 'fs';
import * as path from 'path';
import extractScssVariables from './extractScssVariables';
import * as _yargs from 'yargs';

const yargs = _yargs
  .usage('Usage: extract-sass-vars <file.scss> [args]')
  .option('include-path', {
    describe: 'Path to look for imported scss files. If many, join with commas.',
  })
  .option('v', {describe: 'verbose'})
  .help('h')
  .showHelpOnFail(true);
const { argv } = yargs;

try {
  const filePath = argv._[0];
  if (!filePath) {
    yargs.showHelp();
    throw '';
  }
  const fullFilePath = path.resolve(filePath);

  const result = extractScssVariables(
    fullFilePath,
    {
      includePaths: (argv.includePath || '')
        .split(',')
        .filter((s: string) => s)
        .map((s: string) => path.resolve(s))
    }
  );

  console.log(JSON.stringify(result, null, 2,));
} catch (error) {
  console.error(argv.v ? error : error.message || error);
  process.exit(1); 
}


