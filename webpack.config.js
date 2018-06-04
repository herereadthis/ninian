const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TransformFunctionBindPlugin = require('babel-plugin-transform-function-bind');
const webpack = require('webpack');
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
						plugins: [TransformFunctionBindPlugin]
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
		new HtmlWebpackPlugin({
			template: "./src/app.html",
			filename: "index.html",
			inject: 'body',
			minify: { collapseWhitespace: true, removeComments: true },
			hash: true,
			xhtml: true
		}),
		new MiniCssExtractPlugin({
			filename: "app.min.css"
	    }),
        new webpack.DefinePlugin({
			LAST_UPDATED: `\'${timestamp}\'`
        })
	]
};
