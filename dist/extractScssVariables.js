"use strict";
var sass = require('node-sass');
var fs = require('fs');
var path = require('path');
var lodash_1 = require('lodash');
function getSassToJsSassPath() {
    var jsPath = require.resolve('sass-to-js');
    var root = jsPath.replace(/(node_modules.sass-to-js).+/, function (m, p1) { return p1; });
    return path.join(root, 'sass/sass-to-js');
}
var BOUNDARY = '__JSON_CONTENT_BOUNDARY__';
function extractScssVariables(sassFilename) {
    var content = fs.readFileSync(sassFilename, 'utf8');
    // Detect variables declarations.
    // No need to be picky here,
    // we take care of udefined variable in following code
    var variables = lodash_1.uniq(content.match(/\$[\w\d-_]+/g));
    if (!variables.length) {
        return {};
    }
    // Generate SCSS code to extract SASS variables.
    var scss = [
        // Original SCSS code
        content,
        // Import SASS function that generates JSON from a SASS map
        ("@import \"" + getSassToJsSassPath() + "\";")
    ].concat(variables.map(function (v) { return (v + ": null !default;"); }), [
        // Create a dummy CSS class that will hold a
        // JSON representation of all detected variables
        (".bridge {content: " + BOUNDARY + " sassToJs((")
    ], variables.map(function (v) { return ("'" + v + "': " + v + ","); }), [
        (")) " + BOUNDARY + ";}"),
    ]).join('\n');
    var compiled = sass.renderSync({
        data: scss,
        includePaths: [path.dirname(sassFilename)],
    });
    var css = String(compiled.css);
    var json = new RegExp(BOUNDARY + "\\s*['\"](.+)['\"]\\s*" + BOUNDARY)
        .exec(css)[1];
    var vars = JSON.parse(json);
    // Filter out null values
    Object.keys(vars).forEach(function (k) {
        if (vars[k] === null) {
            delete vars[k];
        }
    });
    return null;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = extractScssVariables;
