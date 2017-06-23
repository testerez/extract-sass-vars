import { extractScssVariables } from '../src';
import * as assert from 'assert';
import * as path from 'path';
const symbolsParser = require('scss-symbols-parser');

describe('extractScssVariables', function() {
  it('should parse variables', function () {

    const symbols = symbolsParser.parseSymbols(
      require('fs').readFileSync(path.join(__dirname, 'test-variables.scss'), 'utf8')
    );
    console.log(symbols);

    var vars = extractScssVariables(
      path.join(__dirname, 'test-variables.scss')
    );
    assert.equal(vars['$red'], 'red');
    assert.equal(vars['$hexGreen'], '#0f0');
    assert.equal(vars['$size'], '12px');
    assert.equal(vars['$lightenRed'], '#ff0303'); 
    assert.equal(vars['$override'], 'green');
    assert.equal(vars['$noOverride'], 'green');
    assert.equal(vars['$font'], 'italic bold 12px/30px Georgia, serif');
    assert.deepEqual(vars['$map'], {
      a: 1,
      b: 'something',
      c: 'something, else',
      k: 'value',
    });
    assert(!('$commented' in vars));
  });

  it('should parse empty files', function() {
    var vars = extractScssVariables(
      path.join(__dirname, 'test-empty.scss')
    );
    assert.deepEqual(vars, {});
  });
});