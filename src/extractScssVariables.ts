import * as sass from 'node-sass';
import * as fs from 'fs';
import * as path from 'path';
import {uniq} from 'lodash';

function getSassToJsSassPath(){
  return path.join(__dirname, 'sass/sass-to-js');
}

const BOUNDARY = '__JSON_CONTENT_BOUNDARY__';

export default function extractScssVariables(sassFilename: string, options: sass.Options = {}) {
  const content = fs.readFileSync(sassFilename, 'utf8');

  // Detect variables declarations.
  // No need to be picky here,
  // we take care of udefined variable in following code
  const variables = uniq(content.match(/\$[\w\d-_]+/g));

  if(!variables.length){
    return {};
  }

  // Generate SCSS code to extract SASS variables.
  const scss = [
    // Original SCSS code
    content,

    // Import SASS function that generates JSON from a SASS map
    `@import "${getSassToJsSassPath()}";`,

    // Init detected variables so invalid detections do not
    // lead to SASS undefined variable error.
    ...variables.map(v => `${v}: null !default;`),

    // Create a dummy CSS class that will hold a
    // JSON representation of all detected variables
    `.bridge {content: ${BOUNDARY} sassToJs((`,
    ...variables.map(v => `'${v}': ${v},`),
    `)) ${BOUNDARY};}`,

  ].join('\n');

  const compiled = sass.renderSync({
    ...options,
    data: scss,
    includePaths: [
      path.dirname(sassFilename),
      ...(options.includePaths || []),
    ],
  });
  const css = String(compiled.css);
  const json = new RegExp(`${BOUNDARY}\\s*['"](.+)['"]\\s*${BOUNDARY}`)
    .exec(css)[1];
  const vars = JSON.parse(json);

  // Filter out null values
  Object.keys(vars).forEach(k => {
    if(vars[k] === null){
      delete vars[k];
    }
  });

  return vars;
}
