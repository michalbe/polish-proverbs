'use strict';

//var jsdom = require('jsdom');
var fs = require('fs');

var PROVERB_FILE = __dirname + '/proverbs.txt';
console.log(PROVERB_FILE);

if (fs.existsSync(PROVERB_FILE)) {
    // Do something
}
