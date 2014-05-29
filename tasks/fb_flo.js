/*
 * grunt-fb-flo
 * https://github.com/rmariuzzo/grunt-fb-flo
 *
 * Copyright (c) 2014 Rubens Mariuzzo
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    grunt.registerMultiTask('flo', 'Starts a fb-flo server.', function() {

        var flo = require('fb-flo');
        
        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            dir: null,
            port: 8888,
            host: 'localhost',
            verbose: false,
            glob: [],
            useFilePolling: false,
            pollingInterval: null
        });

        var server = flo(options.dir, options);
    });

};