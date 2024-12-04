<script setup>
import { useLottoStore } from '@/stores'

const lottoStore = useLottoStore()
</script>

<template>
  <v-overlay
    v-model="lottoStore.isLoading"
    class="align-center justify-center"
    persistent
  >
    <v-progress-circular indeterminate color="primary" />
  </v-overlay>
</template>
