<script setup>
import { ref } from 'vue'
import { useLottoStore } from '@/stores'
import { sortArr } from '@/utils'
import BallComponent from './BallComponent.vue'

const lottoStore = useLottoStore()
const isOpen = ref(false) // Dialog open, close 상태
const resultNumbers = ref([]) // 추천번호 뽑기 결과

const drawNumbers = () => {
  const availableNumbers = Array.from({ length: 45 }, (_, i) => i + 1) // 1 ~ 45까지의 숫자 배열 생성
    .filter((n) => !lottoStore.fixedNumbers.includes(n) && !lottoStore.excludedNumbers.includes(n)) // 고정번호, 제외번호 제외

  const randomNumbers = []

  while (randomNumbers.length < 6 - lottoStore.fixedNumbers.length) {
    const randomIndex = Math.floor(Math.random() * availableNumbers.length)
    const number = availableNumbers.splice(randomIndex, 1)[0]
    randomNumbers.push(number)
  }

  resultNumbers.value = sortArr([...lottoStore.fixedNumbers, ...randomNumbers])
  isOpen.value = true
}

const openDialog = () => {
  drawNumbers()
}

defineExpose({ openDialog })
</script>

<template>
  <v-dialog v-model="isOpen" width="auto">
    <v-card>
      <v-card-title>추천번호 추첨 결과</v-card-title>
      <v-card-text>
        <ul v-if="resultNumbers.length">
          <BallComponent v-for="(number, index) in resultNumbers" :key="index" :number="number">
            {{ number }}
          </BallComponent>
        </ul>

        <p v-else>번호 추첨중...</p>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style lang="scss" scoped></style>
