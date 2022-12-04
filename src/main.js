import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const forumApp = createApp(App).use(router)
forumApp.mount('#app')
