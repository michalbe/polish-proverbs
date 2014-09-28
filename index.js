'use strict';

var jsdom = require('jsdom');
var fs = require('fs');
var each = require('async-each');

var PP = (function(callback) {
  var PROVERB_FILE_PATH = __dirname + '/proverbs.txt';
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

  var showProverbs = function() {
    callback(fs.readFileSync(PROVERB_FILE_PATH).toString());
  };

  if (fs.existsSync(PROVERB_FILE_PATH)) {
    return showProverbs();
  } else {
    each(urls, getProverbs, function() {
        proverbList = proverbList.map(function(el) {
          return el.innerHTML;
        }).filter(function(pro){
          return pro !== 'Aneks:Przysłowia polskie - indeks tematyczny';
        });
        fs.writeFile(PROVERB_FILE_PATH, proverbList.join('\n'), function(err){
          if (err) {
            console.log(err);
            return;
          }
          showProverbs();
        });
    });
  }
});

module.exports = PP;
