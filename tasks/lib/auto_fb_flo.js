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

    var minimatch = require('minimatch');
    var fs = require('fs');

    // Class definition //

    var AutoFbFlo = function() {};

    // Methods //

    /**
     * Make an array of glob patterns from resolvers.
     *
     * @param {Array} An array of resolvers.
     *
     * @return {Array} An array of glob patterns.
     */
    AutoFbFlo.prototype.makeGlob = function(resolvers) {
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
    };

    /**
     * Make a resolver function from resolvers.
     *
     * @param {Array} An array of resolvers.
     *
     * @return {Function} A resolver function.
     */
    AutoFbFlo.prototype.makeResolver = function(resolvers) {
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
    };

};