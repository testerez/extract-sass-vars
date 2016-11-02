import { extractScssVariables } from '../src';
import * as assert from 'assert';
import * as path from 'path';

describe('extractScssVariables', function() {
  it('should parse variables', function() {
    var vars = extractScssVariables(
      path.join(__dirname, 'test-variables.scss')
    );
    assert.equal(vars['$red'], 'red');
    assert.equal(vars['$hexGreen'], '#0f0');
    assert.equal(vars['$size'], '12px');
    assert.equal(vars['$lightenRed'], '#ff0303'); 
    assert.equal(vars['$override'], 'green');
    assert.equal(vars['$noOverride'], 'green');
    assert(!('$commented' in vars));
  });

  it('should parse empty files', function() {
    var vars = extractScssVariables(
      path.join(__dirname, 'test-empty.scss')
    );
    assert.deepEqual(vars, {});
  });
});