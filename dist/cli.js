"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var extractScssVariables_1 = require("./extractScssVariables");
try {
    var filePath = process.argv[2];
    if (!filePath) {
        throw 'Usage: extract-sass-vars <SCSS file path>';
    }
    var fullFilePath = path.resolve(filePath);
    console.log(JSON.stringify(extractScssVariables_1.default(fullFilePath), null, 2));
}
catch (error) {
    console.error(error.message || error);
    process.exit(1);
}
