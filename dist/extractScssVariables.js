"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var sass = require("node-sass");
var fs = require("fs");
var path = require("path");
var lodash_1 = require("lodash");
function getSassToJsSassPath() {
    return path.join(__dirname, 'sass/sass-to-js');
}
var BOUNDARY = '__JSON_CONTENT_BOUNDARY__';
function extractScssVariables(sassFilename, options) {
    if (options === void 0) { options = {}; }
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
        "@import \"" + getSassToJsSassPath() + "\";"
    ].concat(variables.map(function (v) { return v + ": null !default;"; }), [
        // Create a dummy CSS class that will hold a
        // JSON representation of all detected variables
        ".bridge {content: " + BOUNDARY + " sassToJs(("
    ], variables.map(function (v) { return "'" + v + "': " + v + ","; }), [
        ")) " + BOUNDARY + ";}",
    ]).join('\n');
    var compiled = sass.renderSync(__assign({}, options, { data: scss, includePaths: [
            path.dirname(sassFilename)
        ].concat((options.includePaths || [])) }));
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
    return vars;
}
exports.default = extractScssVariables;
