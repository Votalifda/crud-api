const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.cjs',
        path: path.resolve(__dirname, 'dist'),
    },
    mode: 'development',
    target: 'node',
};