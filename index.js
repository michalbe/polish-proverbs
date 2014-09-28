'use strict';

var jsdom = require('jsdom');
var fs = require('fs');
var each = require('async-each');

var PP = (function() {
  var PROVERB_FILE = __dirname + '/proverbs.txt';
  var host = 'http://pl.wiktionary.org';
  var urls = [
    '/wiki/Kategoria:Polskie_przysłowia',
    '/w/index.php?title=Kategoria:Polskie_przys%C5%82owia&pagefrom=' +
      'kropla+dr%C4%85%C5%BCy+ska%C5%82%C4%99#mw-pages',
    '/w/index.php?title=Kategoria:Polskie_przysłowia&pagefrom=' +
      'w+święto+Trzech+Króli+człek+się+w+kożuch+tuli#mw-pages'
  ];

  var proverbList = [];

  var getProverbs = function(url, cb) {
    jsdom.env(
      host + url,
      [],
      function (errors, window) {
        var elements = window.document.querySelectorAll('td li > a');

        proverbList = proverbList.concat(Array.prototype.slice.call(elements));
        cb();
      }
    );
  };

  if (fs.existsSync(PROVERB_FILE)) {
    console.log('we have list');
  } else {
    each(urls, getProverbs, function() {
        proverbList = proverbList.map(function(el) {
          return el.innerHTML;
        });
        console.log(proverbList.length);
    });
  }
});

PP();
module.exports = PP;
