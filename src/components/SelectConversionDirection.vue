<script lang="ts" setup>

import {useI18n} from 'vue-i18n';
import {CONVERT_DIR, CURRENCY} from '../domain/enums';

const props = defineProps<{
  currency: string,
  modelValue: string;
}>();

defineEmits(['update:modelValue'])

if (!props.currency) {
  throw new Error('currency is required');
}
if (!props.modelValue) {
  throw new Error('modelValue is required');
}
if (!Object.keys(CURRENCY).includes(props.currency)) {
  throw new Error(`currency must be one of ${Object.keys(CURRENCY).join(', ')}`);
}
if (!Object.keys(CONVERT_DIR).includes(props.modelValue)) {
  throw new Error(`modelValue must be one of ${Object.keys(CONVERT_DIR).join(', ')}`);
}

const directions = Object.keys(CONVERT_DIR);

const i18n = useI18n();

</script>

<template>
  <div class="form-group row">
    <!--suppress HtmlUnknownTag -->
    <legend class="col-form-label col-sm-3 pt-0">
      {{ i18n.t('message.direction') }}
    </legend>
    <div class="col-sm-9">
      <div v-for="d in directions" :key="d" class="form-check">
        <!--suppress HtmlFormInputWithoutLabel -->
        <input
          type="radio"
          :value="d"
          :id="`direction-${d}`"
          :checked="d === modelValue"
          class="form-check-input"
          @change="$emit('update:modelValue', d)"
        />
        <label :for="`direction-${d}`" class="form-check-label">
          {{ i18n.t(`message.${d}_label`, {currency: i18n.t(`message.${currency}_label`)}) }}
        </label>

      </div>
    </div>
  </div>
</template>
