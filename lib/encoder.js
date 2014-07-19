var he = require('he'),
    iconv = require('iconv-lite'),
    jschardet = require('jschardet');

module.exports = function encode(text, charset) {

  if(!charset) {
    var encoding = jschardet.detect(text).encoding;
    if(encoding) {
      charset = encoding;
    }
  }

  if(!iconv.encodingExists(charset) || charset === 'utf-8') {
    return he.decode(text.toString('utf-8'));
  }

  return he.decode(iconv.decode(text, charset));

}
