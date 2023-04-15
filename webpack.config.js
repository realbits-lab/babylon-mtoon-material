const path = require('path');
const { resolve } = require('path');
const { merge } = require('webpack-merge');

const baseConfig = {
    //* TODO: Handle later.
    // mode: 'production',
    mode: 'development',
    entry: resolve(__dirname, 'src', 'index'),
    module: {
        rules: [
            {
                test: /\.(vert|frag)$/,
                type: 'asset/source',
            },
            {
                test: /\.ts$/,
                loader: 'ts-loader',
            },
        ],
    },
    resolve: {
        modules: [resolve(__dirname, 'node_modules')],
        extensions: ['.js', '.ts'],
    },
    //* TODO: Handle later.
    // target: 'web',
    target: ['es2021'],
};

module.exports = [
    merge(baseConfig, {
        output: {
            library: {
                type: 'module',
            },
            filename: '[name].es6.js',
            path: path.resolve(__dirname, 'dist'),
            environment: { module: true },
        },
        externalsType: 'module',
        experiments: {
            outputModule: true,
        },
    }),
    /**
     * to UMD for npm
     */
    // merge(baseConfig, {
    //     output: {
    //         library: {
    //             name: 'babylon-mtoon-material',
    //             type: 'umd',
    //         },
    //         filename: 'index.module.js',
    //     },
    //     externals: [/^@babylonjs\/core.*$/],
    // }),
    /**
     * to window.MToonMaterial
     */
    // merge(baseConfig, {
    //     output: {
    //         library: {
    //             name: 'MToonMaterial',
    //             type: 'window',
    //             export: 'MToonMaterial',
    //         },
    //         filename: 'index.js',
    //     },
    //     externals: [
    //         ({ context, request }, callback) => {
    //             if (/^@babylonjs\/core.*$/.test(request)) {
    //                 return callback(null, `window BABYLON`);
    //             }
    //             callback();
    //         },
    //     ],
    // }),
];
