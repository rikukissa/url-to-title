# url-to-title

[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][npm-url]
[![Issue tracking][issues-image]][issues-url]
[![Travis CI][travis-image]][travis-url]

Well tested and easy to use page title scraper

![url-to-title](https://raw.githubusercontent.com/rikukissa/url-to-title/master/logo.png)

### Usage

* Use with callback pattern
```javascript
var title = require('url-to-title');
title('https://github.com/rikukissa/url-to-title', function(err, title) {
    if(!err) {
        console.log(title); // rikukissa/url-to-title
    }
});
```
* Use with promise pattern
```javascript
var title = require('url-to-title');
title('https://github.com/rikukissa/url-to-title').then(function(title) {
    console.log(title); // rikukissa/url-to-title
});
```
* Fetch multiple titles at once
```javascript
var title = require('url-to-title');
title([
    'https://github.com/rikukissa/url-to-title',
    'https://github.com/rikukissa/domo'
]).then(function(titles) {
    console.log(titles[0]); // rikukissa/url-to-title
    console.log(titles[1]); // rikukissa/domo
});
```
---
### Contributors
[Keksike](https://github.com/keksike) - Logo

---
### License

The MIT License (MIT)

Copyright (c) 2014 Riku Rouvila

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[logo]: https://raw.githubusercontent.com/rikukissa/url-to-title/master/logo.png
[downloads-image]: http://img.shields.io/npm/dm/url-to-title.svg
[npm-url]: https://npmjs.org/package/url-to-title
[npm-image]: http://img.shields.io/npm/v/url-to-title.svg

[issues-url]: https://github.com/rikukissa/url-to-title/issues
[issues-image]: http://img.shields.io/github/issues/rikukissa/url-to-title.svg
[travis-url]: http://travis-ci.org/rikukissa/url-to-title
[travis-image]: http://img.shields.io/travis/rikukissa/url-to-title.svg
