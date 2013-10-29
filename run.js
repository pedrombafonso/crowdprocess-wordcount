function isWord(w) {
  return w.length > 0;
}

function Run (data) {
  var s = data.toLowerCase();

  //split by comma, period, single space
  var a = s.split(/[ ,.!?:;]/);

  var r = {};
  while(a.length) {
    var w = a.pop();
    if (!isWord(w)) continue;

    if (r[w]) {
      r[w]++;
    } else {
      r[w] = 1;
    }
  }
  return r;
}