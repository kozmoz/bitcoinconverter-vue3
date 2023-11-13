<script lang="ts" setup>

import {CURRENCY} from '../domain/enums';
import {ref} from 'vue';

const props = defineProps<{
  modelValue: string;
}>();

defineEmits(['update:currency'])

if (!props.modelValue) {
  throw new Error('modelValue is required');
}
if (!Object.keys(CURRENCY).includes(props.modelValue)) {
  throw new Error(`modelValue must be one of ${Object.keys(CURRENCY).join(', ')}`);
}

// For internal use. Contains the exact contents of the input field.
const modelValue = ref(props.modelValue);

const currencies = [CURRENCY.EUR, CURRENCY.USD];

</script>

<template>
  <div class="form-group row">
    <label class="col-sm-3 col-form-label" for="currencyField">{{ $t('message.currency') }}</label>
    <div class="col-sm-9">
      <select id="currencyField" class="form-control" v-model="modelValue"
              @change="$emit('update:modelValue', modelValue)">
        <option v-for="c in currencies" :key="c" :value="c">
          {{ $t(`message.${c}_label`) }}
          {{ $t(`message.${c}_sign`) }}
        </option>
      </select>
    </div>
  </div>
</template>
