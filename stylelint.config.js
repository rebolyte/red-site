module.exports = {
	extends: 'stylelint-config-standard',
	rules: {
		'at-rule-empty-line-before': null,
		'at-rule-no-unknown': [
			true,
			{
				ignoreAtRules: ['extends', 'tailwind']
			}
		],
		indentation: 'tab',
		'length-zero-no-unit': null
	}
};
