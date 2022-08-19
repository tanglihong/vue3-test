import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { Button, Field, Picker, Popup  } from 'vant';

// import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(Button);
app.use(Field);
app.use(Picker);
app.use(Popup);

app.mount('#app')
