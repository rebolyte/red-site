'use strict';

const sass = require('node-sass');
const purify = require('purify-css');

// console.log('processing sass');

let isProd = (process.argv[2] === '-p');

let rendered = sass.renderSync({
	file: './src/styles/main.scss',
	includePaths: [
		'node_modules/tachyons-sass/',
		'node_modules/tachyons-sass/scss/',
		'node_modules/breakpoint-sass/stylesheets/',
		'node_modules/breakpoint-slicer/stylesheets/'
	],
	outFile: './static/styles/main.css', // for reference; doesn't write to disk
	sourceMap: !isProd,
	sourceMapEmbed: !isProd,
	outputStyle: 'expanded'
});


// --- Purify CSS (treeshake)
let content = ['**/src/js/**/*.ts', '**/src/js/**/*.js', '**/themes/**/*.html', '**/layouts/**/*.html', '**/content/**/*.md'];

let options = {
 	// Will minify CSS code in addition to purify.
	minify: true

	// logs out rejected selectors
	// rejected: true
};

let out = isProd ? purify(content, rendered.css.toString(), options) : rendered.css;

process.stdout.write(out);
