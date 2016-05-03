var path = require('path');
var fs = require('fs');

module.exports = function () {
  this.plugin('done', function (stats) {
    var outputPath = path.join(__dirname, 'dist', 'index.html');

    var git = require('git-rev-2');

    git.short(function (err, sha) {
      var html = '<!DOCTYPE html>' +
'<html lang="en">' +
'<head>' +
'<meta charset="UTF-8">' +
'<meta data-sha="' + sha + '" data-date="' + new Date().toString() + '">' +
'<title>EE 109</title>' +
'<link href="//fonts.googleapis.com/css?family=Roboto+Condensed:300|Roboto:100,300,400,500" rel="stylesheet" type="text/css">' +
'<link href="//fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">' +
'</head>' +
'<body>' +
'<div id="content"></div>' +
'<script src="bundle.' + stats.hash + '.js"></script>' +
'</body>' +
'</html>';

      fs.writeFileSync(outputPath, html);
    });
  });
};
