module.exports = {
	root: true,
	parser: 'babel-eslint',
	parserOptions: {
		sourceType: 'module'
	},
	env: {
		browser: true,
		node: true
	},
	extends: 'standard',
	globals: {
		__static: true
	},
	plugins: [
		'html'
	],
	'rules': {
		'semi': [2, 'always'], // 强制语句分号结尾
		'indent': [2, 4], // 强制缩进4 spaces
		'no-new': [0], // 不允许new一个实例后不赋值或不比较
		'camelcase': [0, { 'properties': 'never' }], // 关闭驼峰命名规则
		'generator-star-spacing': 0, // allow async-await
		'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0, // allow debugger during development
		'padded-blocks': 0
	}
}