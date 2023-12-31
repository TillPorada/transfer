import vue from '@vitejs/plugin-vue'
import Icons from 'unplugin-icons/vite'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import { defineConfig } from 'vite'
import commonjs from '@rollup/plugin-commonjs' // Importiere das CommonJS-Plugin
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import ViteFonts from 'unplugin-fonts/vite'

import type { InlineConfig } from 'vitest'
import type { UserConfig } from 'vite'

interface VitestConfigExport extends UserConfig {
  test: InlineConfig;
}

module.exports = defineConfig({
	plugins: [
		vue({ customElement: true }),
		Icons({
			autoInstall: true,
		}),
		VueI18nPlugin({ }),
		commonjs(),
		vuetify({
			autoImport: true,
		  }),
		  ViteFonts({
			google: {
			  families: [{
				name: 'Roboto',
				styles: 'wght@100;300;400;500;700;900',
			  }],
			},
		  }),
	],
	define: { 'process.env': {} },
  	resolve: {
    	extensions: [
			'.js',
			'.json',
			'.jsx',
			'.mjs',
			'.ts',
			'.tsx',
			'.vue',
    	],
  	},
	build: {
		lib: {
			entry: './src/view/index.ts',
			formats: ['es', 'cjs'],
			fileName: (format) => `index.${format}.js`
		},
		emptyOutDir: false,
		outDir: 'dist/compiled'
	},
	test: {
		globals: true,
		include: ['**/*.spec.ts'],
		setupFiles: [
			'./setupTests.ts',
		],
		environment: 'jsdom',
	},
} as VitestConfigExport)
