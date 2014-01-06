#!/usr/bin/env node
var CrowdProcess = require('crowdprocess');
var fs = require('fs');
var path = require('path');
var argv = require('optimist').argv;

// Job config
var bid = 1;
var program = fs.readFileSync(path.join(__dirname, 'run.js'), 'utf8');
var textLines = JSON.parse(fs.readFileSync(path.join(__dirname, 'osmaias_data_10.json'), 'utf8'));
console.log(textLines.length);

// Credentials
var credentialsSrc = path.join(__dirname, 'credentials.json');
var credentials = require(credentialsSrc);
var email = credentials.email;
var password = credentials.password;

// Counters
var totalWords = {};
var rcvd = 0;

var data = [];
initData(data);
console.log(data.length);

// var specialWord = argv.w;
var wordLimit = argv.l;
var wordsOverLimit = {};
var wordsOverLimitCount = 0;

// 
var crp = new CrowdProcess(email, password);
crp.map(program, data, function(words) {
  rcvd++;
  for (w in words) {
    if (totalWords[w]) {
      totalWords[w] += words[w];
    } else {
      totalWords[w] = words[w];
    }
    if (totalWords[w] > wordLimit && !wordsOverLimit[w]) {
      wordsOverLimit[w] = totalWords[w];
      console.log('New word: ' + w );
      wordsOverLimitCount++;
    } else {wordsOverLimit[w] += totalWords[w];}
  }
  if (rcvd == data.length) { 
    console.log('# words over limit: ' + wordsOverLimitCount);
  }
});

function initData(data){
  var nlines = argv.n || 10;
  var j = 0;
  data[j] = [];
  for (var i = 0; i < textLines.length; i++) {
    data[j].push(textLines[i]);
    if (i % nlines === 0 && i !== 0) {
      data[++j] = [];
    }
  }
}