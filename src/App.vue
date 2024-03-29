<script lang="ts" setup>
import {ref} from 'vue'
import {CONVERT_DIR, CURRENCY} from './domain/enums';
import {computed} from '@vue/runtime-core';

import ConversionResult from './components/ConversionResult.vue';
import InputAmount from './components/InputAmount.vue';
import SelectConversionDirection from './components/SelectConversionDirection.vue';
import SelectCurrency from './components/SelectCurrency.vue';
import SelectLanguage from './components/SelectLanguage.vue';
import 'bootstrap/dist/css/bootstrap.min.css';

// Set defaults.
const currency = ref(CURRENCY.EUR);
const direction = ref(CONVERT_DIR.FROM_BTC);
const amount = ref(1);

/**
 * Determine if we have to show 'USD', 'EUR' or 'BTC'.
 */
const currencyForInput
  = computed<string>(() => direction.value === CONVERT_DIR.FROM_BTC ? CURRENCY.BTC : currency.value);

const title = import.meta.env.VITE_APP_TITLE || 'NO TITLE CONFIGURED';

</script>


<template>
  <div v-cloak class="container">
    <div class="row">
      <div class="col converter-block-title text-center text-white">
        <div class="float-right pt-2">
          <select-language/>
        </div>
        <h2>{{ title }}</h2>
      </div>
    </div>

    <div class="row py-3 bg-light">
      <div class="col-sm-12 col-md-6">
        <form novalidate autocomplete="off">

          <!--suppress RequiredAttributes -->
          <select-currency v-model="currency"/>
          <!--suppress RequiredAttributes -->
          <select-conversion-direction v-model="direction" :currency="currency"/>
          <!--suppress RequiredAttributes -->
          <input-amount v-model="amount" :currency="currencyForInput"/>

        </form>
      </div>

      <div class="col-sm-12 col-md-6 m-auto bg-light">
        <conversion-result :amount="amount" :currency="currency" :direction="direction"/>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <p>
          Example Vue3 TypeScript web application.
        </p>
      </div>
    </div>
  </div>
</template>

<!-- Global styling. -->
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

</style>
