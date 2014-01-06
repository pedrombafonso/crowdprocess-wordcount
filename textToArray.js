var fs = require('fs');

function readLines(input, func) {
  var remaining = '';

  input.on('data', function(data) {
    remaining += data;
    var index = remaining.indexOf('\n');
    while (index > -1) {
      var line = remaining.substring(0, index);
      remaining = remaining.substring(index + 1);
      func(line);
      index = remaining.indexOf('\n');
    }
  });

  input.on('end', function() {
    if (remaining.length > 0) {
      func(remaining);
    }
    // console.log(JSON.stringify(array));
    fs.writeFileSync('./src/osmaias_data.json', JSON.stringify(array));
  });
}

function func(data) {
  if (data){
    array.push(data)
  }

  // console.log('Line: ' + data);
}

var array = [];
var input = fs.createReadStream('./data/osmaias_content.txt');
readLines(input, func);