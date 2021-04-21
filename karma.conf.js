module.exports = function(config) {
    config.set({
        frameworks: ["mocha", "chai", "karma-typescript"],
        files: ["JsonFormComponent/**/*.ts"],
        preprocessors: {
            "JsonFormComponent/**/*.ts": ["karma-typescript"]
        },
        colors: true,
        ports: 9876,
        karmaTypescriptConfig: {
            tsconfig: "./tsconfig.json"
        },
        logLevel: config.LOG_INFO,
        autoWatch: false,
        reporters: ["karma-typescript", "progress"],
        browsers: ["ChromeHeadless"],
        customLaunchers: {
            'ChromeHeadless': {
                base: 'Chrome',
                flags: [
                    //'--headless'
                ],
                prefs: {
                    'network.proxy.type': 0
                }
            },
        },
        concurrecy: Infinity
    });
};