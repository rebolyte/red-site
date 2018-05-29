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
		'length-zero-no-unit': null,
		'declaration-colon-newline-after': null,
		'value-list-comma-newline-after': null
	},
	ignoreFiles: 'public/**/*.css'
};
