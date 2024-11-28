<script setup>
import { useLottoStore } from '@/stores'
import BallComponent from '../components/BallComponent.vue'

const lottoStore = useLottoStore()
</script>

<template>
  <v-dialog v-model="lottoStore.isHistoryOpen" width="400">
    <v-card>
      <v-card-title>추천번호 추첨기록</v-card-title>

      <v-card-text>
        <ul v-if="lottoStore.history.length" class="history-list">
          <li v-for="(numbers, index) in lottoStore.history" :key="index">
            <ul class="history-item">
              <BallComponent
                v-for="(number, index) in numbers"
                :key="index"
                :number="number"
              >
                {{ number }}
              </BallComponent>
            </ul>
          </li>
        </ul>

        <p v-else>추첨기록이 없습니다.</p>
      </v-card-text>

      <v-card-actions>
        <v-btn color="primary" text @click="lottoStore.isHistoryOpen = false"
          >닫기</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style lang="scss" scoped>
.history-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.history-item {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
}
</style>
