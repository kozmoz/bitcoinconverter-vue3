<template>
  <div class="form-group row">
    <legend class="col-form-label col-sm-3 pt-0">
      {{ t('message.direction') }}
    </legend>
    <div class="col-sm-9">
      <div v-for="d in directions" :key="d" class="form-check">
        <!--suppress HtmlFormInputWithoutLabel -->
        <input
            :id="`direction-${d}`"
            :checked="d === direction"
            :value="d"
            class="form-check-input"
            name="direction"
            type="radio"
            @change="$emit('update:direction', $event.target.value)"
        />
        <label :for="`direction-${d}`" class="form-check-label">
          {{
            t(`message.${d}_label`, {
              currency: t(`message.${currency}_label`)
            })
          }}
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
    currency: {
      type: String,
      required: true,
      /** Test if the enum value is valid. */
      validator: v => !!CURRENCY[v]
    },
    direction: {
      type: String,
      required: true,
      /** Test if the enum value is valid. */
      validator: v => !!CONVERT_DIR[v]
    }
  },
  emits: ['update:direction'],
  setup() {
    return {
      t: useI18n().t,
      directions: Object.keys(CONVERT_DIR)
    };
  }
});

</script>
