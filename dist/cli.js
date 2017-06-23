#! /usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var extractScssVariables_1 = require("./extractScssVariables");
var _yargs = require("yargs");
var yargs = _yargs
    .usage('Usage: extract-sass-vars <file.scss> [args]')
    .option('include-path', {
    describe: 'Path to look for imported scss files. If many, join with commas.',
})
    .option('v', { describe: 'verbose' })
    .help('h')
    .showHelpOnFail(true);
var argv = yargs.argv;
try {
    var filePath = argv._[0];
    if (!filePath) {
        yargs.showHelp();
        throw '';
    }
    var fullFilePath = path.resolve(filePath);
    var result = extractScssVariables_1.default(fullFilePath, {
        includePaths: (argv.includePath || '')
            .split(',')
            .filter(function (s) { return s; })
            .map(function (s) { return path.resolve(s); })
    });
    console.log(JSON.stringify(result, null, 2));
}
catch (error) {
    console.error(argv.v ? error : error.message || error);
    process.exit(1);
}
