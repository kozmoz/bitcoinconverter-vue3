<script lang="ts" setup>

import {useI18n} from 'vue-i18n';
import {ref} from '@vue/runtime-core';

const i18n = useI18n();

// Keep a local copy, so we know which language is active.
const language = ref<string>(i18n.locale.value);

</script>

<template>
  <!--suppress HtmlFormInputWithoutLabel -->
  <select v-model="language" class="form-control form-control-sm" @change="i18n.locale.value=language">
    <option v-for="locale of i18n.availableLocales" :key="locale" :value="locale">
      {{ i18n.t(`message.${locale}`) }}
    </option>
  </select>
</template>
