import {createApp} from '@vue/runtime-dom';
import {createI18n} from 'vue-i18n';
import App from './App.vue';
import messages from './i18n/messages';

const i18n = createI18n({
    // you must set `false`, to use Composition API.
    // https://vue-i18n.intlify.dev/guide/advanced/composition.html
    legacy: false,
    locale: 'en',
    fallbackLocale: 'en',
    messages
})

createApp(App)
  .use(i18n)
  .mount('#app');
