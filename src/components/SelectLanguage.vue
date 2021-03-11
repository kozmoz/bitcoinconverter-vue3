<template>
  <!--suppress HtmlFormInputWithoutLabel -->
  <select :value="language" class="form-control form-control-sm" @input="setLanguage($event.target.value)">
    <option v-for="locale of i18n.availableLocales" :key="locale" :value="locale">
      {{ i18n.t(`message.${locale}`) }}
    </option>
  </select>
</template>

<script lang="ts">
import {defineComponent, ref} from '@vue/runtime-core';
import {useI18n} from 'vue-i18n';

/**
 * Component to select currency from a list of currencies.
 */
export default defineComponent({
  setup() {
    const i18n = useI18n();
    // Keep a local copy, so we know which language is active.
    const language = ref<string>(i18n.locale.value);

    /**
     * Set new active language.
     * @param newLanguage
     */
    function setLanguage(newLanguage: string): void {
      language.value = newLanguage;
      i18n.locale.value = newLanguage;
    }

    return {
      setLanguage,
      language,
      i18n
    };
  }
});
</script>
