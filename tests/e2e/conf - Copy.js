var ScreenshotReporter = require('./screenshotReporter.js');

exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['spec.js'],
  framework: 'jasmine2',
  multiCapabilities: [ 
  {
    browserName: 'chrome'
  }],
  jasmineNodeOpts: {
        // Use colors in the command line report.
        showColors: true,

        // If true, include stack traces in failures.
        includeStackTrace : false,

        // Default time to wait in ms before a test fails.
        defaultTimeoutInterval: 60000,

        // If true, print timestamps for failures
        showTiming: true,

        // Print failures in real time.
        realtimeFailure: true
  },
  
  onPrepare: function() {
    jasmine.getEnv().addReporter(new ScreenshotReporter("./tmp/protractorss"));
  }
}