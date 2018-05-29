module.exports = {
    entry: './src/xpath.ts',
    output: {
        filename: './dist/xpath.js',
        libraryTarget: 'umd'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader'
            }
        ]
    },
    node: {
        fs: 'empty' // needed for the XPATH parser
    }
}
