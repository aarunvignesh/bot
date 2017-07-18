var webpack = require('webpack'),
    path = require('path');

module.exports = {
    entry:{
        app:'./app/bootstrap.ts',
        vendor:'./app/vendor.ts'
    },
    resolve:{
        extensions: ['.ts','.js']
    },
    output:{
        filename: '[name].js',
        path: path.resolve(__dirname,'public/js'),
        chunkFilename: '[name]-[id].chunk.js',
        library: 'ac_[name]',
        libraryTarget: 'var'
    },
    module:{
        rules:[
            {
                test: /.ts$/,
                use:[
                    {
                        loader:'awesome-typescript-loader',
                        options: {
                            configFileName: path.resolve(__dirname, 'app/tsconfig.json')
                        }
                    },
                    {
                        loader: 'angular2-template-loader'
                    }
                ]
            },
            {
                test:/.css$/,
                use:[
                    {
                        loader: 'to-string-loader'
                    },
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    }
                ]
            },
            {
                test: /.html$/,
                use:[
                    {
                        loader: 'html-loader'
                    }
                ]
            }
        ]
    },

    plugins: [
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)@angular/,
            path.resolve(__dirname),
            {}
        ),

        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor'],
            children: true,
            async: true,
            minChunks: 3
        })
    ]
};