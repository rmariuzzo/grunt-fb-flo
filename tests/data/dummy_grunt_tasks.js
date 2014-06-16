'use strict';

module.exports = function(grunt) {
    
    // Dummy tasks for testing purposes.
    [1, 2, 3].forEach(function(i) {
        grunt.registerTask('dummy_' + i, function() {
            grunt.log.writeln('Dummy ' + i + ' done!');
        });
    });

};