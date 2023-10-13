import { createApp } from 'vue'
import App from './App.vue'
import { createI18n } from 'vue-i18n'
import { createVuetify } from 'vuetify'
import 'vuetify/styles'

import 'vuetify/dist/vuetify.min.css' // Importiere die Vuetify-Stile

import { messages } from '../locales'

const i18n = createI18n({
	legacy: false,
	locale: 'en',
	messages,
})

const app = createApp(App)
const vuetify = createVuetify({
	theme: {
	  themes: {
		light: {
		  colors: {
			primary: '#36689C',
			secondary: '#F6F8FA',
		  },
		},
	  },
	},
  })

// Verwende Vuetify in deiner Vue-App
app.use(vuetify)

app.use(i18n)

app.mount('#app')
