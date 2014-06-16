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

    var flo = require('fb-flo');
    var auto = require('./lib/auto_fb_flo.js');

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

        // Are we using resolvers?
        if (this.data.resolvers) {
            options.glob = auto.makeGlob(this.data.resolvers);
            options.resolver = auto.makeResolver(this.data.resolvers);
        }

        // Clean up options.
        var dir = options.dir;
        var resolver = options.resolver;

        delete options.dir;
        delete options.resolver;

        // Start fb-flo server
        var server = flo(dir, options, resolver);

        server.once('ready', function() {
            var target = 'http://' + options.host + ':' + options.port;
            grunt.log.writeln('Started fb-flo server on ' + target);
        });

        if (forever) {
            this.async();
        }
    });

};