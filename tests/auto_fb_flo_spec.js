'use strict';

// Dependencies //

var grunt = require('grunt');
var AutoFlo = require('../tasks/lib/auto_fb_flo.js')(grunt);

describe('The AutoFlo object', function() {

    it('should exists', function() {
        expect(AutoFlo).toBeDefined();
    });

    it('should works with expected fb-flo options', function() {
        var done = false;
        var auto = new AutoFlo({
            port: 8888,
            dir: './',
            glob: [
                'assets/js/**/*.js',
                'vendors/**/*.js',
                'bower_components/**/*.js'
            ],
            resolver: function(filepath, callback) {
                callback({
                    resourceURL: 'assets/js/main.js?dist',
                    contents: '(function(){})();'
                });
            }
        });

        auto.resolver('assets/js/main.js', function(callback) {
            expect(callback.resourceURL).toBe('assets/js/main.js?dist');
            expect(callback.contents).toBe('(function(){})();');
            done = true;
        });

        waitsFor(function() {
            return done;
        }, 3000);

        runs(function() {});
    });

    it('should create a full resolver from resolvers', function() {
        var done = false;
        var auto = new AutoFlo({
            resolvers: [{
                files: [
                    'assets/js/**/*.js',
                    'vendors/**/*.js',
                    'bower_components/**/*.js'
                ],
                tasks: ['dummy_1', 'dummy_2'],
                callback: function(filepath) {
                    return {
                        resourceURL: filepath + '?dist',
                        contents: '(function(){})();'
                    };
                }
            }]
        });

        auto.resolver('assets/js/main.js', function(callback) {
            expect(callback.resourceURL).toBe('assets/js/main.js?dist');
            expect(callback.contents).toBe('(function(){})();');
            done = true;
        });

        waitsFor(function() {
            return done;
        }, 3000);

        runs(function() {});
    });

});