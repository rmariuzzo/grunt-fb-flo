/*
 * grunt-fb-flo
 * https://github.com/rmariuzzo/grunt-fb-flo
 *
 * Copyright (c) 2014 Rubens Mariuzzo
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({

        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                '<%= nodeunit.tests %>'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        flo: {
            minimal_options: {
                options: {
                    dir: '.'
                }
            }
        },

        jasmine: {
            all: {
                src: 'tasks/**/*.js',
                options: {
                    specs: 'specs/*_spec.js',
                    template: require('grunt-template-jasmine-requirejs')
                }
            }
        }

    });

    // Load this tasks.
    grunt.loadTasks('tasks');

    // Load task dependencies.
    require('load-grunt-tasks')(grunt);

    grunt.registerTask('default', ['jshint', 'flo']);

};