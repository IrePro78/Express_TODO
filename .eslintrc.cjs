module.exports = {
	'env': {
		'browser': true,
		'es2022': true,
		'node': true
	},
	'extends': 'eslint:recommended',
	'parserOptions': {
		'ecmaVersion': 'latest',
		'sourceType': 'module'
	},
	'rules': {
		'quotes': ['warn', 'single', 'avoid-escape'],
		'semi': ['warn', 'always'],
		'keyword-spacing':1,
		'no-unused-vars': 1,
		'no-undef': 1,
	}
};

