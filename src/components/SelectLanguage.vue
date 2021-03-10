<template>
  <div class="position-absolute pr-2 language-selection">
    <div class="form-group my-0">
      <!--suppress HtmlFormInputWithoutLabel -->
      <select :value="locale" class="form-control form-control-sm" @input="setLanguage($event.target.value)">
        <option v-for="language of languages" :key="language" :value="language">
          {{ t(`message.${language}`) }}
        </option>
      </select>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from '@vue/runtime-core';
import {useI18n} from 'vue-i18n';

/**
 * Component to select currency from a list of currencies.
 */
export default defineComponent({
  setup() {

    const i18n = useI18n();
    const languages = i18n.availableLocales;

    /**
     * Set new active language.
     * @param newLanguage
     */
    function setLanguage(newLanguage: string): void {
      if (languages.indexOf(newLanguage) === -1) {
        throw Error(`Cannot set language to ${newLanguage}. Valid are ${JSON.stringify(languages)}`);
      }
      i18n.locale.value = newLanguage;
    }

    return {
      setLanguage,
      languages: languages,
      locale: i18n.locale,
      t: i18n.t
    };
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.language-selection {
  right: 0;
  /* Vertical align. */
  top: 50%;
  transform: translateY(-50%);
}
</style>
