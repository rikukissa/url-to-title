'use strict';

var _ = require('lodash'),
    request = require('request'),
    Promise = require('bluebird');

var encoder = require('./encoder');

var TITLE_REGEX = /(<\s*title[^>]*>(.+?)<\s*\/\s*title)>/,
    CHARSET_REGEX = /charset=(.*)($|;)/;

function crawl(url, done) {
  var chunks = [],
      headers = null,
      title = null;

  return new Promise(function(resolve, reject) {

    request({
      url: url,
      encoding: null,
      headers: {
        'Accept-Language': 'en-US,en;q=0.8,fi;q=0.6',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.125 Safari/537.36'
      }
    })
    .on('error', reject)
    .on('end', resolve)
    .on('data', function(chunk) {
      var charset = null,
          headers = null;

      chunks.push(chunk);

      if (headers === null) {
        headers = this.response.headers;
      }

      var contentType = headers['content-type'];

      if(!contentType) {
        reject(new Error('No content-type specified'));
        return this.abort();
      }

      if(contentType.indexOf('text/html') === -1) {
        reject(new Error('Invalid content-type'));
        return this.abort();
      }

      if (headers['content-type'].indexOf('charset=') > -1) {
        var match = headers['content-type'].match(CHARSET_REGEX);
        if(match && match[1]) {
          charset = match[1];
        }
      }

      var html = _.map(chunks, function(chunk) {
        return encoder(chunk, charset);
      }).join('');

      var match = TITLE_REGEX.exec(html);

      if(match && match[2]) {
        resolve(match[2]);
        return this.abort();
      }
    });
  });
}

module.exports = function scrape(urls, callback) {
  var promise;

  if('string' === typeof urls) {
    promise = crawl(urls);
  } else {
    promise = Promise.all(urls.map(crawl));
  }

  if(!callback) {
    return promise;
  }

  promise.then(function(result) {
    callback(null, result);
  }, function(err) {
    callback(err);
  });
}
