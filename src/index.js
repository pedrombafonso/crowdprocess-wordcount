var crowdprocess = require('crowdprocess');
var fs = require('fs');

//Task bid
var bid = 1;

var program = fs.readFileSync('run.js', 'utf8');
var textLines = JSON.parse(fs.readFileSync('data.json', 'utf8'));

crowdprocess(program, bid, function(err, task){

  var tSent = 0;
  var tRcvd = 0;
  var wordCounter = {};

  for (var i = 0; i < textLines.length; i++) {

    //Data unit object
    var dataUnit = textLines[i];
    task.write(dataUnit);
    tSent++;
  }

  //Deal with results
  task.on('result', handleResult);

  function handleResult(result){
    tRcvd++;

    var words = result;
    for (var w in words) {
      if (wordCounter[w]){
        wordCounter[w] += words[w];
      } else {
        wordCounter[w] = words[w];
      }
    }

    if (tSent === tRcvd) {
      console.log('Words counted:\n', wordCounter);
    }
  }

});