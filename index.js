'use strict';

var jsdom = require('jsdom');
var fs = require('fs');

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

  var getProverbs = function(cb) {
    jsdom.env(
      host+urls[0],
      [],
      function (errors, window) {
        if (errors) {
          cb(errors);
          return;
        }
        cb(null, window.document.querySelectorAll('li > a'));
      }
    );
  };

  if (fs.existsSync(PROVERB_FILE)) {
    console.log('we have list');
  } else {
    getProverbs(function(err, proverbs){
      if (!err) {
        for (var i=0, l=proverbs.length; i<l; i++) {
          console.log(proverbs[i].innerHTML);
        }
      }
    });
  }
});

PP();
module.exports = PP;
