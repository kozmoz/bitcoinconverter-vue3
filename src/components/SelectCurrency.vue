<template>
  <div class="form-group row">
    <label class="col-sm-3 col-form-label" for="currencyField">{{ i18n.t('message.currency') }}</label>
    <div class="col-sm-9">
      <select id="currencyField" :value="modelValue" class="form-control"
              @change="$emit('update:modelValue', $event.target.value)">
        <option v-for="c in currencies" :key="c" :value="c">
          {{ i18n.t(`message.${c}_label`) }}
          {{ i18n.t(`message.${c}_sign`) }}
        </option>
      </select>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from '@vue/runtime-core';
import {CURRENCY} from '../domain/enums';
import {useI18n} from 'vue-i18n';

const CURRENCIES = [CURRENCY.EUR, CURRENCY.USD];

/**
 * Component to select currency from a list of currencies.
 */
export default defineComponent({
  props: {
    modelValue: {
      type: String,
      required: true,
      validator: (v: string) => Object.keys(CURRENCY).indexOf(v) !== -1
    }
  },
  emits: ['update:currency'],
  setup() {
    return {
      i18n: useI18n(),
      currencies: CURRENCIES
    };
  }
});
</script>
