<script setup>
import { useLottoStore } from '@/stores'
import BallComponent from '../components/BallComponent.vue'

const lottoStore = useLottoStore()
</script>

<template>
  <v-dialog v-model="lottoStore.isHistoryOpen" width="700">
    <v-card>
      <v-card-title>추천번호 추첨기록</v-card-title>

      <v-card-text>
        <ul v-if="lottoStore.history.length" class="history-list">
          <li v-for="(entry, index) in lottoStore.history" :key="index">
            <span>{{ entry.dateTime }}</span>

            <div>
              <ul class="history-item">
                <BallComponent
                  v-for="(number, index) in entry.numbers"
                  :key="index"
                  :number="number"
                >
                  {{ number }}
                </BallComponent>
              </ul>

              <v-btn text @click="lottoStore.removeHistoryEntry(index)"
                >삭제</v-btn
              >
            </div>
          </li>
        </ul>

        <p v-else>추첨기록이 없습니다.</p>
      </v-card-text>

      <v-card-actions>
        <v-btn text @click="lottoStore.clearHistory">초기화</v-btn>
        <v-btn text @click="lottoStore.isHistoryOpen = false">닫기</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style lang="scss" scoped>
.history-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-height: 370px;
  overflow-y: auto;

  > li {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;

    > div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.5rem;
      padding: 0 0.5rem;
      width: 100%;

      .v-btn {
        flex-shrink: 0;
        min-width: 50px;
      }
    }
  }
}

.history-item {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 0.5rem;
  width: 100%;
}
</style>
