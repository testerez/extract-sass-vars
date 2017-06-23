import * as fs from 'fs';
import * as path from 'path';
import extractScssVariables from './extractScssVariables';

try {
  const filePath = process.argv[2];
  if (!filePath) {
    throw 'Usage: extract-sass-vars <SCSS file path>';
  }
  const fullFilePath = path.resolve(filePath);
  console.log(JSON.stringify(
    extractScssVariables(fullFilePath),
    null,
    2,
  ));
} catch (error) {
  console.error(error.message || error);
  process.exit(1); 
}


