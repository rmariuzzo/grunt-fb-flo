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
                'tasks/**/*.js',
                'tests/**/*.js'
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

        shell: {
            jasmine_node: {
                command: './node_modules/jasmine-node/bin/jasmine-node --color tests/'
            },
            jasmine_node_watch: {
                command: './node_modules/jasmine-node/bin/jasmine-node --color --autotest tests/'
            }
        },

        githooks: {
            all: {
                'pre-commit': 'jshint shell:jasmine_node'
            }
        }

    });

    // Load this tasks.
    grunt.loadTasks('tasks');

    // Load task dependencies.
    require('load-grunt-tasks')(grunt);

    // Register tasks.
    grunt.registerTask('setup', ['githooks']);
    grunt.registerTask('test', ['shell:jasmine_node']);
    grunt.registerTask('test:watch', ['shell:jasmine_node_watch']);
    grunt.registerTask('default', ['test:watch']);

};