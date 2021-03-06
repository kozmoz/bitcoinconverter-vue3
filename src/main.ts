import {createApp} from '@vue/runtime-dom';
import {createI18n} from 'vue-i18n';
import App from './App.vue';
import messages from './i18n/messages';

const i18n = createI18n({
    legacy: false,
    locale: 'en',
    fallbackLocale: 'en',
    messages
})

const app = createApp(App);

app.use(i18n);
app.mount('#app')
