'use strict';

// Karma configuration
module.exports = function(config) {
    config.set({
        frameworks: ['jasmine', 'jasmine-matchers'],
        reporters: ['nyan', 'coverage'],
        coverageReporter: {
            includeAllSources: true,
            dir: 'coverage/karma',
            reporters: [
                {type: 'html'},
                {type: 'text-summary'},
                {type: 'json'}
            ]
        },
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['PhantomJS'], // Chrome|ChromeCanary|Firefox|Opera|Safari|PhantomJS|IE
        captureTimeout: 60000,
        singleRun: true
    });
};