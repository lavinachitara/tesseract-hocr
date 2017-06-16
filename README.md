# Tesseract for node.js

[![NPM](https://nodei.co/npm/node-tesseract.png)](https://nodei.co/npm/node-tesseract/)

A simple wrapper for the Tesseract OCR package for node.js

You can then go about installing the node-module to expose the JavaScript API:

    npm install tesseract-hocr

## Usage

```JavaScript
var tesseract = require('tesseract-hocr');

// Recognize text of any language in any format
tesseract.process(__dirname + '/path/to/image.jpg',function(err, text) {
	if(err) {
		console.error(err);
	} else {
		console.log(text);
	}
});

// Recognize German text in a single uniform block of text and set the binary path

var options = {
	l: 'deu',
	psm: 6,
	binary: '/usr/local/bin/tesseract',
	output: 'path/to/store/hocrfile'
};

tesseract.process(__dirname + '/path/to/image.jpg', options, function(err, text) {
	if(err) {
		console.error(err);
	} else {
		console.log(text);
	}
});
