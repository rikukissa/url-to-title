'use strict';

var he = require('he'),
    iconv = require('iconv-lite'),
    jschardet = require('jschardet');

var defaultEncoding = 'utf-8';

module.exports = function decode(text, charset) {

  if(!charset) {
    var encoding = jschardet.detect(text).encoding;
    charset = encoding || defaultEncoding;
  }

  if(!iconv.encodingExists(charset) || charset === defaultEncoding) {
    return he.decode(text.toString(defaultEncoding));
  }

  return he.decode(iconv.decode(text, charset));

};
