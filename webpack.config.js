const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TransformFunctionBindPlugin = require('babel-plugin-transform-function-bind');
const TransformRuntimePlugin = require('babel-plugin-transform-runtime');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// https://nolanlawson.com/2018/03/20/smaller-lodash-bundles-with-webpack-and-babel/
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const webpack = require('webpack');
const appConstants = require('./src/constants/app-constants');
const date = new Date();
const timestamp = date.toString();

module.exports = {

	entry: {
		bundle: './src/index.js'
	},

	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'app.min.js'
	},


    resolve: {
        modules: ['node_modules']
    },

	module: {
		rules: [
			{
				test: /(\.css|\.less)$/,
				exclude: /(node_modules|dist)/,
				use: [
					MiniCssExtractPlugin.loader,
					{ loader: "css-loader" },
					{ loader: "postcss-loader" },
					{ loader: "less-loader" }
				]
			},
			{
				test: /\.js$/,
				exclude: /(node_modules|dist)/,
                use: {
					loader: 'babel-loader',
					options: {
                        presets: ['env'],
						plugins: [
							TransformFunctionBindPlugin,
                            ["transform-runtime", {
                              "polyfill": false,
                              "regenerator": true
                            }]
                        ]
                    }
				}
			},
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {}
                    }
                ]
            }
		]
	},

	plugins: [
		new LodashModuleReplacementPlugin,
		// new BundleAnalyzerPlugin(),
		new HtmlWebpackPlugin({
			template: "./src/app.html",
			filename: "index.html",
			inject: 'body',
			minify: { collapseWhitespace: true, removeComments: true },
			hash: true,
			xhtml: true,
            paths: {
                assetsImages: appConstants.ASSETS_IMAGES_PATH,
                assetsData: appConstants.ASSETS_DATA_PATH,
                site: appConstants.SITE_PATH
            },
            assetsImagesPath: appConstants.ASSETS_IMAGES_PATH,
            assetsDataPath: appConstants.ASSETS_DATA_PATH,
            sitePath: appConstants.SITE_PATH
		}),
		new MiniCssExtractPlugin({
			filename: "app.min.css"
	    }),
        new webpack.DefinePlugin({
			LAST_UPDATED: `\'${timestamp}\'`
        })
	]
};
