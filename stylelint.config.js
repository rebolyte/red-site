module.exports = {
	extends: 'stylelint-config-standard',
	rules: {
		'at-rule-empty-line-before': null,
		'at-rule-no-unknown': [
			true,
			{
				ignoreAtRules: ['extends', 'tailwind', 'variants', 'responsive', 'screen']
			}
		],
		indentation: 'tab',
		'length-zero-no-unit': null
	},
	ignoreFiles: 'public/**/*.css'
};
