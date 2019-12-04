var fs = require('fs');
var decode = require('iconv-lite').decode;

var str = decode(fs.readFileSync('szavak.csv'),'windows-1250');

var szavak = str.split('\r\n').map(szo=>szo.substr(0,szo.length-1));
const result = szavak.join('\n');
fs.writeFileSync('../szavak.txt',result,'utf-8');