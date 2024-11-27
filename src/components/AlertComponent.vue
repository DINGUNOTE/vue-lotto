<script setup>
import { toRefs } from 'vue'
import { useLottoStore } from '@/stores'

const lottoStore = useLottoStore()

const { isShowAlert, alertMessage, clearAlertMessage } = toRefs(lottoStore)
</script>

<template>
  <v-overlay v-model="isShowAlert" persistent scroll-strategy="block" class="alert-container">
    <v-alert
      type="warning"
      max-width="400"
      @click:close="clearAlertMessage"
      closable
      close-label="닫기"
    >
      {{ alertMessage }}
    </v-alert>
  </v-overlay>
</template>

<style lang="scss" scoped>
.alert-container {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
