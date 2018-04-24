const webpack = require('webpack');
const path = require('path');
const glob = require('glob-all');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PurgeCssPlugin = require('purgecss-webpack-plugin');
const WebpackAssetsManifest = require('webpack-assets-manifest');

const isProd = process.env.NODE_ENV === 'production';

const ifProd = (val, alt) => {
	if (typeof val === 'undefined') {
		return isProd;
	}
	return isProd ? val : alt;
};
const ifDev = (val, alt) => {
	if (typeof val === 'undefined') {
		return !isProd;
	}
	return !isProd ? val : alt;
};

const paths = {
	CWD: path.resolve(__dirname),
	DIST: path.resolve(__dirname, 'static'),
	SRC: path.resolve(__dirname, 'src')
};

// Custom PurgeCSS extractor for Tailwind that allows special characters in class names.
class TailwindExtractor {
	static extract(content) {
		// eslint-disable-next-line no-useless-escape
		return content.match(/[A-z0-9-:\/]+/g) || [];
	}
}

module.exports = {
	entry: {
		main: path.join(paths.SRC, 'js', 'main.ts')
		// vendor: ['vue', 'wretch', 'date-fns']
	},
	output: {
		path: paths.DIST,
		filename: 'js/[name].[chunkhash:10].js'
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				use: ['ts-loader']
			},
			{
				test: /\.s?css$/,
				// Loader chaining works from right to left
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1,
							minimize: ifProd()
							// sourceMap: true
						}
					},
					'postcss-loader'
				]
			}
		]
	},
	resolve: {
		extensions: ['.ts', '.js']
	},
	plugins: [
		// https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/701
		new MiniCssExtractPlugin({
			filename: 'styles/[name].[contenthash:10].css'
		}),
		// https://tailwindcss.com/docs/controlling-file-size
		// https://www.purgecss.com/with-webpack
		ifProd(
			new PurgeCssPlugin({
				paths: glob.sync([
					path.join(paths.CWD, 'layouts/**/*.html'),
					path.join(paths.SRC, 'js', '/**/*.{js,ts,vue}')
				]),
				extractors: [
					{
						extractor: TailwindExtractor,
						extensions: ['html', 'js', 'ts', 'vue']
					}
				]
			})
		),
		new WebpackAssetsManifest({
			output: '../data/assetMap.json'
		}),
		ifDev(new webpack.NamedModulesPlugin())
	].filter(el => el)
};
