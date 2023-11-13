<script lang="ts" setup>

import {useI18n} from 'vue-i18n';

const {locale, availableLocales} = useI18n();

</script>

<template>
  <!--suppress HtmlFormInputWithoutLabel -->
  <select v-model="locale" class="form-control form-control-sm">
    <option v-for="l of availableLocales" :key="l" :value="l">
      {{ $t(`message.${l}`) }}
    </option>
  </select>
</template>
