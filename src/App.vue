<template>
  <div class="container">
    <div class="row">
      <div class="col converter-block-title text-center text-white">
        <h2>{{ title }}</h2>
        <select-language/>
      </div>
    </div>

    <div v-cloak id="app" class="row py-3 bg-light">
      <div class="col-sm-12 col-md-6">
        <form novalidate="novalidate">

          <!-- Reusable components, not dependent on data store. -->
          <select-currency v-model:currency="currency"/>
          <select-conversion-direction v-model:direction="direction" :currency="currency"/>
          <input-amount v-model:amount="amount" :currency="currency" class="mb-0"></input-amount>

        </form>
      </div>

      <div class="col-sm-12 col-md-6 m-auto bg-light">
        <div class="converter-block-result bg-white text-center px-3 py-3 my-3">
          <!-- Component reads the data from the store. -->
          <conversion-result :amount="amount" :currency="currency" :direction="direction"/>

          <p v-if="errors.length" class="mb-0 text-danger">
            {{ $t('message.form_error') }}
          </p>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <p>
          Example Vue3 TypeScript web application, following this blog post:
          <a href="https://juur.link/2021/03/vue3-typescript/" target="_blank"
          >https://juur.link/2021/03/vue3-typescript/</a
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from '@vue/runtime-core'
import ConversionResult from './components/ConversionResult.vue';
import InputAmount from './components/InputAmount.vue';
import SelectConversionDirection from './components/SelectConversionDirection.vue';
import SelectCurrency from './components/SelectCurrency.vue';
import SelectLanguage from './components/SelectLanguage.vue';
import {CONVERT_DIR, CURRENCY} from './domain/enums';
import "bootstrap/dist/css/bootstrap.min.css";

export default defineComponent({
  components: {
    ConversionResult,
    InputAmount,
    SelectConversionDirection,
    SelectCurrency,
    SelectLanguage
  },
  setup() {

    // Set defaults.
    const currency = ref(CURRENCY.EUR);
    const direction = ref(CONVERT_DIR.FROM_BTC);
    const amount = ref(1);

    return {
      title: 'process.env.VUE_APP_TITLE',
      currency,
      direction,
      amount,
      errors: [] /* todo */
    }
  }
})
</script>


<style>

body {
  padding: 1em;
}

body > * {
  max-width: 1024px;
}

a {
  color: #42b983;
}

[v-cloak] {
  display: none;
}
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.converter-block-title {
  background: linear-gradient(to bottom, #184791 0%, #00256f 100%);
}

.converter-block-result {
  border: 3px solid #00256f;
  border-radius: 10px;
}
</style>