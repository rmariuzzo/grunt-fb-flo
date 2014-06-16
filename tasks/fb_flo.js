/*
 * grunt-fb-flo
 * https://github.com/rmariuzzo/grunt-fb-flo
 *
 * Copyright (c) 2014 Rubens Mariuzzo
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    // Dependencies //

    var Auto = require('./lib/auto_fb_flo.js')(grunt);

    // Task definition //

    grunt.registerMultiTask('flo', 'Starts a fb-flo server.', function() {

        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({

            // fb-flo options.
            dir: null,
            port: 8888,
            host: 'localhost',
            verbose: false,
            glob: [],
            useFilePolling: false,
            pollingInterval: null,
            resolver: function() {},

            // extra options.
            forever: true
        });

        var auto = new Auto(options);
        auto.start();

        if (options.forever) {
            this.async();
        }
    });

};