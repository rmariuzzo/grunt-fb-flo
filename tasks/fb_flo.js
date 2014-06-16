/*
 * grunt-fb-flo
 * https://github.com/rmariuzzo/grunt-fb-flo
 *
 * Copyright (c) 2014 Rubens Mariuzzo
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    // Module dependencies.
    var flo = require('fb-flo');
    var minimatch = require('minimatch');
    var fs = require('fs');

    grunt.registerMultiTask('flo', 'Starts a fb-flo server.', function() {

        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            dir: null,
            port: 8888,
            host: 'localhost',
            verbose: false,
            glob: [],
            useFilePolling: false,
            pollingInterval: null,
            resolver: function() {}
        });

        // Are we using resolvers?
        if (this.data.resolvers) {
            options.glob = makeGlob(this.data.resolvers);
            options.resolver = makeResolver(this.data.resolvers);
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

        this.async();
    });

    /**
     * Make a resolver function from resolvers.
     *
     * @param {Array} An array of resolvers.
     *
     * @return {Function} A resolver function.
     */
    function makeResolver(resolvers) {
        return function(filepath, callback) {
            resolvers.forEach(function(resolver) {

                // Find first resolver that match a file pattern.
                var match = resolver.files.some(function(pattern) {
                    return minimatch(filepath, pattern);
                });

                if (!match) {
                    return; // Nothing to do here!
                }

                grunt.log.writeln('File: ' + filepath + ' changed!');

                grunt.util.spawn({
                    grunt: true,
                    args: [resolver.tasks.join(' ')]
                }, function(error, result) {

                    // Did something went wrong?
                    if (error) {
                        grunt.log.error(result);
                        return;
                    }

                    grunt.log.writeln(result);

                    // Here we finished.
                    if (typeof(resolver.callback) === 'function') {
                        callback(resolver.callback(filepath, resolver));
                    } else {
                        callback({
                            resourceURL: resolver.callback.resourceURL,
                            contents: fs.readFileSync(resolver.callback.contentsPath),
                            reload: resolver.callback.reload,
                            match: resolver.callback.match
                        });
                    }
                });
            });
        };
    }

    /**
     * Make an array of glob patterns from resolvers.
     *
     * @param {Array} An array of resolvers.
     *
     * @return {Array} An array of glob patterns.
     */
    function makeGlob(resolvers) {
        return resolvers.reduce(function(previous, current) {
            if (Array.isArray(current.files)) {
                current.files.forEach(function(file) {
                    previous.push(file);
                });
            } else {
                previous.push(current.files);
            }
            return previous;
        }, []);
    }

};