import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import axios from 'axios';

axios.get('/api/')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });



const app = createApp(App)

app.use(router)

app.mount('#app')
