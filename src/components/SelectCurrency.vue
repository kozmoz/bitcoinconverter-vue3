<template>
  <div class="form-group row">
    <label class="col-sm-3 col-form-label" for="currencyField">{{ t('message.currency') }}</label>
    <div class="col-sm-9">
      <select id="currencyField" :value="currency" class="form-control" name="currencyField"
              @change="$emit('update:currency', $event.target.value)">
        <option v-for="currency in currencies" :key="currency" :value="currency">
          {{ t(`message.${currency}_label`) }}
          {{ t(`message.${currency}_sign`) }}
        </option>
      </select>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from '@vue/runtime-core';
import {CURRENCY} from '../domain/enums';
import {useI18n} from 'vue-i18n';

/**
 * Component to select currency from a list of currencies.
 */
export default defineComponent({
  props: {
    currency: {
      type: String,
      required: true,
      validator: v => !!CURRENCY[v]
    }
  },
  emits: ['update:currency'],
  setup() {
    return {
      t: useI18n().t,
      currencies: Object.keys(CURRENCY)
    };
  }
});
</script>
