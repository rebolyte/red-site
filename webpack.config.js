const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackAssetsManifest = require('webpack-assets-manifest');

const paths = {
	CWD: path.resolve(__dirname),
	DIST: path.resolve(__dirname, 'static'),
	SRC: path.resolve(__dirname, 'src'),
	JS: path.resolve(__dirname, 'src/js')
};

module.exports = {
	entry: {
		main: path.join(paths.JS, 'main.js'),
		vendor: ['vue', 'wretch', 'date-fns']
	},
	output: {
		path: paths.DIST,
		filename: 'js/[name].[chunkhash:10].js'
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				use: ['ts-loader']
			},
			{
				test: /\.s?css$/,
				// Loader chaining works from right to left
				use: [
					MiniCssExtractPlugin.loader,
					{ loader: 'css-loader', options: { importLoaders: 1 } },
					'postcss-loader'
				]
			}
		]
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js']
	},
	plugins: [
		// https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/701
		new MiniCssExtractPlugin({
			filename: 'styles/[name].[contenthash:10].css'
		}),
		new WebpackAssetsManifest({
			output: '../data/assetMap.json'
		}),
		new webpack.NamedModulesPlugin()
	]
};
