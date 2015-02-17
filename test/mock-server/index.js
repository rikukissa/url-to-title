'use strict';

var path = require('path'),
    express = require('express'),
    compression = require('compression'),
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

app.get('/user-agent', function(req, res) {
  var userAgent = req.get('User-Agent');
  var title = '<title>Update your browser</title>';

  if(userAgent !== undefined && userAgent.length > 0) {
    title = '<title>bar</title>';
  }

  res.send(title);
});

app.get('/gzipped', compression(), function(req, res) {
  res.setHeader('content-type', 'text/html;');
  res.sendfile(path.join(__dirname, 'files', 'UTF-8.html'));
});

app.get('/no-content-type', function(req, res) {
  res.removeHeader('content-type');
  res.send('<title>foo bar</title>');
});

app.get('/multiline', function(req, res) {
  res.send('<title>\nfoo\nbar\n</title>');
});

if(require.main === module) {
  app.listen(9005);
}

module.exports = app;
