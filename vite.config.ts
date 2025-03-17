
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
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