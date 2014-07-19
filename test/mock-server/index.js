var fs = require('fs'),
    path = require('path'),
    express = require('express'),
    app = express();

app.get('/default', function(req, res) {
  res.send('<title>default</title>');
});
app.get('/foo', function(req, res) {
  res.send('<title>foo</title>');
});

app.get('/broken', function(req, res) {
  res.writeHead(200);
});

app.get('/ISO-8859-1', function(req, res) {
  res.setHeader('content-type', 'text/html; charset=ISO-8859-1');
  res.sendfile(path.join(__dirname, 'files', 'ISO-8859-1.html'));
});

app.get('/UTF-8', function(req, res) {
  res.setHeader('content-type', 'text/html; charset=UTF-8');
  res.sendfile(path.join(__dirname, 'files', 'UTF-8.html'));
});

app.get('/image', function(req, res) {
  res.sendfile(path.join(__dirname, 'files', 'image.jpg'));
});

if(require.main === module) {
  app.listen(9005);
}

module.exports = app;
