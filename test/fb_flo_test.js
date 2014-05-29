'use strict';

var grunt = require('grunt');

exports.flo = {
    setUp: function(done) {
        done();
    },
    minimal_options: function(test) {
        test.expect(0);
        test.done();
    }
};