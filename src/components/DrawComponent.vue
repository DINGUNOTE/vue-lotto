<script setup>
import { useLottoStore } from '@/stores'
import BallComponent from './BallComponent.vue'

const lottoStore = useLottoStore()
</script>

<template>
  <v-dialog v-model="lottoStore.isDrawOpen" width="auto">
    <v-card>
      <v-card-title>추천번호 추첨 결과</v-card-title>

      <v-card-text>
        <ul v-if="lottoStore.resultNumbers.length">
          <BallComponent
            v-for="(number, index) in lottoStore.resultNumbers"
            :key="index"
            :number="number"
          >
            {{ number }}
          </BallComponent>
        </ul>

        <p v-else>번호 추첨중...</p>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="lottoStore.isDrawOpen = false">닫기</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style lang="scss" scoped></style>
