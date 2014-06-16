'use strict';

// Dependencies //

var spawn = require('child_process').spawn;
var grunt = require('grunt');
var AutoFlo = require('../tasks/lib/auto_fb_flo.js')(grunt);

describe('The "flo" grunt task', function() {

    it('should be executable', function() {
        var ready = false;
        var cmd = spawn('grunt', ['flo']);

        cmd.stdout.on('data', function(data) {
            var out = data.toString();
            console.log(out);
            if (out.indexOf('Started fb-flo server on') !== -1) {
                ready = true;
            }
        });

        waitsFor(function() {
            return ready;
        }, 1000);

        runs(function() {
            cmd.kill('SIGHUP');
            expect(true).toBe(true);
        });
    });

});