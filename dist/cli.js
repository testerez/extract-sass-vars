#! /usr/bin/env node
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
var path = require("path");
var extractScssVariables_1 = require("./extractScssVariables");
var _yargs = require("yargs");
var yargs = _yargs
    .usage('Usage: extract-sass-vars <file1.scss> <file2.scss>... [args]')
    .option('include-path', {
    describe: 'Path to look for imported scss files.\nYou can specify it many times.',
})
    .option('v', { describe: 'verbose' })
    .help('h')
    .showHelpOnFail(true);
var argv = yargs.argv;
var resolvePathsArg = function (arg) {
    if (!arg) {
        return [];
    }
    if (!Array.isArray(arg)) {
        arg = [arg];
    }
    return arg
        .filter(function (s) { return s; })
        .map(function (s) { return path.resolve(s); });
};
try {
    if (!argv._.length) {
        yargs.showHelp();
        throw '';
    }
    var results = resolvePathsArg(argv._)
        .map(function (scssPath) { return extractScssVariables_1.default(scssPath, {
        includePaths: resolvePathsArg(argv.includePath),
    }); });
    // Merge all vars from many files together
    var result = results.reduce(function (acc, o) { return (__assign({}, acc, o)); }, {});
    console.log(JSON.stringify(result, null, 2));
}
catch (error) {
    console.error(argv.v ? error : error.message || error);
    process.exit(1);
}
