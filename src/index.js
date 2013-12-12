var crowdprocess = require('crowdprocess');
var fs = require('fs');
var path = require('path');

//Task bid
var bid = 1;
var program = fs.readFileSync(path.join(__dirname, 'run.js'), 'utf8');
var textLines = JSON.parse(fs.readFileSync(path.join(__dirname, 'osmaias_data.json'), 'utf8'));

// Get credentials
var credentialsSrc = path.join(__dirname, 'credentials.json');
var credentials = require(credentialsSrc);
var email = credentials.email;
var password = credentials.password;

crowdprocess(program, bid, undefined, email, password, function(err, job){

  var tSent = 0;
  var rRcvd = 0;
  var eRcvd = 0;
  var tRcvd = 0;
  var wordCounter = {};

  for (var i = 0; i < textLines.length; i++) {

    //Data unit object
    var dataUnit = textLines[i];
    job.write(dataUnit);
    tSent++;
  }    
  job.end();

  //Deal with results
  job.on('data', handleResult);
  job.on('error', handleErrors);

  function handleResult(result){
    tRcvd = ++rRcvd + eRcvd;

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
      job.destroy();
    }
  }

  function handleErrors(error){
    eRcvd++;
    console.log(error);
  }

});