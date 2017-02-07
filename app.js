// levenshtein法によるcsvの比較
var lev = require('levenshtein'),
    fs = require('fs'),
    iconv = require('iconv-lite'),
    csv = require('csv');

console.log(lev('あああ', 'あいあ'));

fs.createReadStream('sample.csv')
    .pipe(iconv.decodeStream('SJIS'))
    .pipe(iconv.encodeStream('UTF-8'))
    .pipe(csv.parse())
    .pipe(csv.transform(function(record) {
        readBtCsv(record);
    }));

function readBtCsv(sample) {
    fs.createReadStream('bt.csv')
        .pipe(iconv.decodeStream('SJIS'))
        .pipe(iconv.encodeStream('UTF-8'))
        .pipe(csv.parse())
        .pipe(csv.transform(function(record) {
            levenshtein(sample, record);
        }));
}

function levenshtein(sample, bt) {
    console.log(sample);
    console.log(bt);
}
