module.exports = {
	root: true,
	env: { browser: true, es2020: true },
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react-hooks/recommended',
		'plugin:react/jsx-runtime',
	],
	ignorePatterns: ['dist', '.eslintrc.cjs'],
	parser: '@typescript-eslint/parser',
	plugins: ['react-refresh'],
	rules: {
		"react/jsx-uses-react": "off",
		"react/react-in-jsx-scope": "off",
		"react/jsx-key": 1,
		"@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
		'react-refresh/only-export-components': [
			'warn',
			{
				allowConstantExport: true
			},
		],
		"@typescript-eslint/naming-convention": [2,  {
			"selector": "enumMember",
			"format": ["PascalCase"]
		  }
		]
	},
}
