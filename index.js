'use strict';

/**
 * Module dependencies.
 */
/***Including custom modules***/
var utils = require('./customutils');
var exec = require('child_process').exec;
var fs = require('fs');

var Tesseract = {

  /**
   * options default options passed to Tesseract binary
   * @type {Object}
   */
  options: {
    'l': 'eng',
    'psm': 3,
    'config': null,
    'binary': 'tesseract'
  },

  /**
   * outputEncoding
   * @type {String}
   */
  outputEncoding: 'UTF-8',

  /**
   * Runs Tesseract binary with options
   *
   * @param {String} image
   * @param {Object} options to pass to Tesseract binary
   * @param {Function} callback
   */
  process: function(image, options, callback) {

	if (typeof options === 'function') {
      callback = options;
      options = null;
    }

    options = utils.merge(Tesseract.options, options);

    // generate output file name
    var output = '';
	if (options.output !== null) {
      output = options.output;
	}
    
    // assemble tesseract command
    var command = [options.binary, image, output];

    if (options.l !== null) {
      command.push('-l ' + options.l);
    }

    if (options.psm !== null) {
      command.push('-psm ' + options.psm);
    }

    if (options.config !== null) {
      command.push(options.config);
	  output += '.' + options.config;
	}

    command = command.join(' ');

    var opts = options.env || {};

    // Run the tesseract command
    exec(command, opts, function(err) {
      if (err) {
        // Something went wrong executing the assembled command
        callback(err, null);
        return;
      }
	  else{
		  callback(null, output);
		  return;    
	  }
    }); // end exec

  }

};

/**
 * Module exports.
 */
module.exports.process = Tesseract.process;
