# React TypeScript app
React TypeScript + SWC project configure guide

### Step 1. Create Vite template
npm create vite@latest project-name --template react-swc-ts

### Step 2. Configurate Vite & TypeScript files
tsconfig.json
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

tsconfig.app.json
```
// empty or delete
```

tsconfig.node.json
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

vite.config.ts
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

App.tsx
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
