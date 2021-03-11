<template>
  <div class="form-group row">
    <legend class="col-form-label col-sm-3 pt-0">
      {{ i18n.t('message.direction') }}
    </legend>
    <div class="col-sm-9">
      <div v-for="d in directions" :key="d" class="form-check">
        <input
            type="radio"
            :value="d"
            :id="`direction-${d}`"
            :checked="d === modelValue"
            class="form-check-input"
            @change="$emit('update:modelValue', $event.target.value)"
        />
        <label :for="`direction-${d}`" class="form-check-label">
          {{ i18n.t(`message.${d}_label`, {currency: i18n.t(`message.${currency}_label`)}) }}
        </label>

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from '@vue/runtime-core';
import {CONVERT_DIR, CURRENCY} from '../domain/enums';
import {useI18n} from 'vue-i18n';

/**
 * Component to select the conversion direction.
 */
export default defineComponent({
  props: {
    modelValue: {
      type: String,
      required: true,
      /** Test if the enum value is valid. */
      validator: v => !!CONVERT_DIR[v]
    },
    currency: {
      type: String,
      required: true,
      /** Test if the enum value is valid. */
      validator: v => !!CURRENCY[v]
    }
  },
  emits: ['update:modelValue'],
  setup() {
    return {
      i18n: useI18n(),
      directions: Object.keys(CONVERT_DIR)
    };
  }
});

</script>
