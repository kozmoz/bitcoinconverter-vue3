<template>
  <div class="form-group row">
    <label class="col-sm-3 col-form-label" for="amount">{{ i18n.t('message.amount') }}</label>
    <div class="col-sm-9">
      <div class="input-group w-75">
        <div class="input-group-prepend">
          <span class="input-group-text">{{ i18n.t(`message.${currency}_sign`) }}</span>
        </div>

        <!--suppress JSUnresolvedVariable -->
        <input
            id="amount"
            type="text"
            v-model="modelValue"
            maxlength="10"
            class="form-control"
            :class="{ 'is-invalid': isInvalid}"
            @input="updateAmount($event.target.value)"
        />

        <div v-if="isInvalid" class="invalid-feedback">
          {{ i18n.t('message.amount_error') }}
        </div>
      </div>
      <small class="form-text text-muted">{{ i18n.t('message.inputamount-formtext-integer') }}</small>
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
  emits: ['update:modelValue'],
  setup(props) {

    // For internal use. Contains the exact contents of the input field.
    const modelValue = ref(`${props.modelValue}`);

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

    /**
     * Test if given value is valid.
     */
    const isInvalid: ComputedRef<boolean> = computed(() => !!(modelValue.value && !isNumeric(modelValue.value)));

    return {
      i18n: useI18n(),
      modelValue,
      isInvalid,
      updateAmount
    }
  }
});

</script>
