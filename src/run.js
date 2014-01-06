function isWord(w) {
  return w.length > 0;
}

function Run (data) {
  
  var r = {};
    
  for(var i = 0; i < data.length; i++){
    var s = data[i].toLowerCase();

    //split by comma, period, single space
    var a = s.split(/[ ,.!?:;]/);

    while(a.length) {
      var w = a.pop();
      if (!isWord(w)) continue;

      if (r[w]) {
        r[w]++;
      } else {
        r[w] = 1;
      }
    }    
  }

  return r;
}