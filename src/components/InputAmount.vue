<template>
  <div class="form-group row">
    <label class="col-sm-3 col-form-label" for="amount">{{ t('message.amount') }}</label>
    <div class="col-sm-9">
      <div class="input-group w-75">
        <div class="input-group-prepend">
          <span class="input-group-text">{{ t(`message.${currency}_sign`) }}</span>
        </div>

        <!--suppress JSUnresolvedVariable -->
        <input
            id="amount"
            name="amount"
            type="text"
            v-model="model"
            maxlength="10"
            class="form-control"
            :class="{ 'is-invalid': isInvalid}"
            @input="updateAmount($event.target.value)"
        />

        <div v-if="isInvalid" class="invalid-feedback">
          {{ t('message.amount_error') }}
        </div>
      </div>
      <small class="form-text text-muted">{{ t('message.inputamount-formtext-integer') }}</small>
    </div>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, ref} from '@vue/runtime-core';
import {CURRENCY} from '../domain/enums';
import {useI18n} from 'vue-i18n';
import {ComputedRef} from '@vue/reactivity';

/**
 * Component to enter the amount for the exchange.
 */
export default defineComponent({
  props: {
    currency: {
      type: String,
      required: true,
      /** Test if the enum value is valid. */
      validator: v => !!CURRENCY[v]
    },
    modelValue: {
      type: Number,
      required: true
    }
  },

  emits: [
    'update:modelValue'
  ],

  setup(props) {

    // For internal use. Contains the exact contents of the input field.
    const model = ref(`${props.modelValue}`);

    /**
     * Convert amount to number/0 and emit an update event.
     * @param value Input element value to update
     */
    function updateAmount(value: string): void {
      this.$emit('update:modelValue', isNumeric(value) || 0);
    }

    /**
     * Tests if the given value is numeric.
     * @param value The string value to test
     * @returns The number or 0 if not recognized as number
     */
    function isNumeric(value: string): number {
      return /^[0-9]+$/.test(value) ? parseInt(value, 10) : 0;
    }

    const isInvalid: ComputedRef<boolean> = computed(() => !!(model.value && !isNumeric(model.value)));

    return {
      t: useI18n().t,
      model,
      updateAmount,
      isInvalid
    }
  }
});

</script>
