# React TypeScript app
React TypeScript + SWC project configure guide

### Step 1. Create Vite template
npm create vite@latest project-name --template react-swc-ts

### Step 2. Configurate Vite & TypeScript files
tsconfig.json:
```
{
  "compilerOptions": {
    // "outDir": "dist",
    "target": "ESNext",
    "lib": ["DOM", "DOM.Iterable", "ESNext"],
    "jsx": "react-jsx",
		"moduleResolution": "node",
    "resolveJsonModule": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "useDefineForClassFields": true,
    "isolatedModules": true,
    "noEmit": true,

		"baseUrl": "./",
		"paths": {
      "src/*": ["./src/*"]
    },
  },
  "include": ["src"],
  "references": [
    { "path": "./tsconfig.node.json" }
  ]
}
```

tsconfig.app.json:
```
// empty or delete
```

tsconfig.node.json:
```
{
  "compilerOptions": {
		"composite": true,
		"forceConsistentCasingInFileNames": true,
		"module": "ESNext",
		"moduleResolution": "node",
		"allowSyntheticDefaultImports": true,

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true
  },
  "include": ["vite.config.ts"]
}
```

vite.config.ts:
```
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // specific server settings
  server: {
		port: 3000,
		proxy: {
			'/api': {
				target: 'https://localhost:5001',
				changeOrigin: true,
				ws: true,
				secure: false
			}
		}
	},
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/_mantine";`,
      },
    },
  },
  resolve: {
		alias: [{ find: 'src', replacement: '/src' }],
	},
})
```

### Step 3. Install component lib (option)
#### 2.1 Install Mantine Packages
https://mantine.dev/getting-started/
npm install @mantine/core @mantine/hooks @mantine/modals @mantine/form @mantine/dates dayjs @mantine/notifications @mantine/nprogress
npm install --save-dev postcss postcss-preset-mantine postcss-simple-vars

App.tsx:
```
import '@mantine/core/styles.css';
import { createTheme, MantineProvider } from '@mantine/core';

const theme = createTheme({
  /** Put your mantine theme override here */
});

function App() {
  return (
    <MantineProvider theme={theme}>
      
    </MantineProvider>
  )
}

export default App
```

and so on...

#### 2.2 Install Sass
https://mantine.dev/styles/sass/
... up to Usage with Next.js

#### 2.2 Configure Mantine (option)
Upcoming...

### Step 4. Extend .vscode
By default project including recommended extension to work with.

extension.json:
```
{
	"recommendations": [
		"vunguyentuan.vscode-css-variables",
		"csstools.postcss",
		"burkeholland.simple-react-snippets",
		"dbaeumer.vscode-eslint",
		"editorconfig.editorconfig",
		"wix.glean",
		"christian-kohler.npm-intellisense",
		"christian-kohler.path-intellisense",
		"rafaelsalguero.csharp2ts",
	]
}
```

Also project has settings.json file to provide work with css variables.
If you want to share settings between team add to .gitignore:
`!.vscode/settings.json`

settings.json:
```
{
    "cssVariables.lookupFiles": [
        "**/*.css",
        "**/*.scss",
        "**/*.sass",
        "**/*.less",
        "node_modules/@mantine/core/styles.css"
    ]
}
```

### Step 5. Configuring Eslint
Before starting we need to install several packages with --save-dev flag.
npm install --save-dev @eslint/compat @eslint/eslintrc

Create .eslint.cjs file:
```
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
```

Change eslint.config.js file extension to .mjs:
```
import { fixupConfigRules } from "@eslint/compat";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    ignores: ["**/dist", "**/.eslintrc.cjs"],
}, ...fixupConfigRules(compat.extends(
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:react/jsx-runtime",
)), {
    plugins: {
        "react-refresh": reactRefresh,
    },

    languageOptions: {
        globals: {
            ...globals.browser,
        },

        parser: tsParser,
    },

    rules: {
        "react/jsx-uses-react": "off",
        "react/react-in-jsx-scope": "off",
        "react/jsx-key": 1,

        "@typescript-eslint/no-unused-vars": ["error", {
            argsIgnorePattern: "^_",
        }],

        "react-refresh/only-export-components": ["warn", {
            allowConstantExport: true,
        }],

        "@typescript-eslint/naming-convention": [2, {
            selector: "enumMember",
            format: ["PascalCase"],
        }],
    },
}];
```

# Настройка работы с Nexus Repository Manager

Полезные ссылки:
1. https://stackoverflow.com/questions/35043155/how-should-i-set-auth-in-npmrc-when-using-a-nexus-https-npm-registry-proxy
2. https://help.sonatype.com/en/npm-security.html

## Для публикации пакетов

1. Основной вариант
1.1 Настроить package.json
```json
{
  "name": "package-name",
  "version": "1.0.0",
}
```

1.2 Создать .npmrc
```ini
registry=https://localhost:8080/repository/npm-public/
cafile=./localhost
```

1.3 Создать cafile с данными сертификата (при необходимости)
```
-----BEGIN CERTIFICATE-----
...
-----END CERTIFICATE-----
```

1.4 Проверить работу
Чтобы проверить работу registry:
```bash
npm ping
```
npm отправит запрос к registry, чтобы проверить соединение и авторизацию:
```
npm notice PING https://localhost:8080/repository/npm-public/
npm notice PONG 150ms
```

Чтобы проверить работу публикации в hosted:
```bash
npm publish --registry https://localhost:8080/repository/npm-hosted/ --dry-run
```

Или если пакет уже опубликован (иначе будет 404 с '... is not in this registry.'):
```bash
npm info package-name
```
или
```bash
npm view package-name
```

2. При помощи @scope
2.1 Настроить package.json
```json
{
  "name": "@scope-name/package-name",
  "version": "1.0.0",
}
```

2.2 Создать .npmrc
```ini
registry=https://localhost:8080/repository/npm-public/
@scope-name:registry=https://localhost:8080/repository/npm-hosted/
cafile=./localhost
```

2.3 Создать cafile с данными сертификата (при необходимости)
```
-----BEGIN CERTIFICATE-----
...
-----END CERTIFICATE-----
```

2.4 Проверить работу
Чтобы проверить работу основного registry:
```bash
npm ping
```
npm отправит запрос к основному registry, чтобы проверить соединение и авторизацию:
```
npm notice PING https://localhost:8080/repository/npm-public/
npm notice PONG 150ms
```

Чтобы проверить работу @scope-name:registry:
```bash
npm publish --dry-run
```

Или если пакет уже опубликован (иначе будет 404 с '... is not in this registry.'):
```bash
npm info @scope-name/package-name
```
или
```bash
npm view @scope-name/package-name
```

3. При помощи publishConfig
Но он не умеет передавать cafile и прочие низкоуровневые параметры.

3.1 Настроить package.json
```json
{
  "name": "package-name",
  "version": "1.0.0",
  "publishConfig": {
    "registry": "https://localhost:8080/repository/npm-hosted/"
  }
}
```

3.2 Создать .npmrc
```ini
cafile=./localhost.pem
```

3.3 Создать cafile с данными сертификата

3.4 Проверить работу

## Для получения пакетов

Создать .npmrc
```ini
registry=https://localhost:8080/repository/npm-public/
cafile=./localhost.pem
```

Создать cafile с данными сертификата (при необходимости)

Проверить работу

## CI

Важно при настройке CI учесть наличие приоритетов для разных областей .npmrc. Так как у корневого .npmrc проекта будет высший приоритет, то при наличии значения registry в .npmrc, потребуется перезаписывать непосредственно в корень значения registry после выполнения билда:
```bash
npm config set registry https://localhost:8080/repository/npm-hosted/ --location=project
```

Как вариант, также можно избавиться от значения registry в корневом .npmrc и отдать управление над ним пользовательскому. Соответсвенно на шаге с получением пакетов обращаться к public директории:
```bash
npm config set registry https://localhost:8080/repository/npm-public/
```

А при необходимости публикации к hosted:
```bash
npm config set registry https://localhost:8080/repository/npm-hosted/
```

# Cheat Sheet
### Update packages
```
npx npm-check-updates -u && npm i
```

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
