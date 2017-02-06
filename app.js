// levenshtein法によるcsvの比較
var lev = require('levenshtein'),
    fs = require('fs'),
    iconv = require('iconv-lite'),
    csv = require('csv');

console.log(lev('あああ', 'あいあ'));

var res = readBtCsv();
var rs = null;
function readBtCsv() {
    rs = fs.createReadStream('bt.csv')
            .pipe(iconv.decodeStream('SJIS'))
            .pipe(iconv.encodeStream('UTF-8'))
            .pipe(csv.parse())
            .pipe(csv.transform(function(record){
                return record;
            }));
    rs.on('data', function(data) { console.log(data)} );
}
