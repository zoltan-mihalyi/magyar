var fs = require('fs');
var decode = require('iconv-lite').decode;

var str = fs.readFileSync('csunyaszavak1.txt','utf-8');

var szavak = str.split('\r\n').map(szo=>szo.toLowerCase());
const result = szavak.join('\n');
fs.writeFileSync('../csunyaszavak.txt',result,'utf-8');