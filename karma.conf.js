var typescriptConfig = require('./tsconfig.json');
typescriptConfig.compilerOptions.allowJs = true;
typescriptConfig.compilerOptions.declaration = false;
module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine', 'karma-typescript'],
        files: ['src/**/*.+(js|ts)'],
        preprocessors: {
            'src/**/*.+(js|ts)': ['karma-typescript']
        },
        reporters: ['progress', 'karma-typescript'],
        browsers: ['PhantomJS'],
        autoWatch: false,
        singleRun: true,
        plugins: [
            'karma-jasmine',  'karma-phantomjs-launcher',  'karma-typescript'
        ],
        karmaTypescriptConfig: {
            compilerOptions: typescriptConfig.compilerOptions,
            bundlerOptions: {
                entrypoints: /\.spec\.ts$/
            }
        },
    });
}
