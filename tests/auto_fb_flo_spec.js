'use strict';

// Dependencies //

var grunt = require('grunt');
var AutoFlo = require('../tasks/lib/auto_fb_flo.js')(grunt);

describe('The AutoFlo object', function() {

    it('should exists', function() {
        expect(AutoFlo).toBeDefined();
    });

});