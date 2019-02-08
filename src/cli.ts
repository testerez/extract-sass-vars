#! /usr/bin/env node
import * as fs from 'fs';
import * as path from 'path';
import extractScssVariables from './extractScssVariables';
import * as _yargs from 'yargs';

const yargs = _yargs
  .usage('Usage: extract-sass-vars <file1.scss> <file2.scss>... [args]')
  .option('include-path', {
    describe: 'Path to look for imported scss files.\nYou can specify it many times.',
  })
  .option('v', {describe: 'verbose'})
  .help('h')
  .showHelpOnFail(true);
const { argv } = yargs;

const resolvePathsArg = (arg: string | string[]) => {
  if (!arg) {
    return [];
  }
  if (!Array.isArray(arg)) {
    arg = [arg];
  }
  return arg
    .filter((s: string) => s)
    .map((s: string) => path.resolve(s));
}

try {
  if (!argv._.length) {
    yargs.showHelp();
    throw '';
  }
  

  const results = resolvePathsArg(argv._)
    .map(scssPath => extractScssVariables(
      scssPath,
      {
        includePaths: resolvePathsArg(argv.includePath as any),
      }
    ));
  
  // Merge all vars from many files together
  const result = results.reduce((acc, o) => ({
    ...acc,
    ...o,
  }), {})

  console.log(JSON.stringify(result, null, 2,));
} catch (error) {
  console.error(argv.v ? error : error.message || error);
  process.exit(1); 
}


