<script setup>
import { onMounted } from 'vue'
import { useLottoStore } from '@/stores'
import BallComponent from '@/components/BallComponent.vue'

const lottoStore = useLottoStore()

const fetchStatistics = async () => {
  // 데이터가 존재하는 경우 다시 호출하지 않음
  if (lottoStore.hasStats) return

  if (lottoStore.isFetched) {
    // 최신 당첨회차 정보가 있는 경우 통계 정보를 가져옴
    await lottoStore.getMostAndLeastFrequentNumbers()
  } else {
    await lottoStore.fetchLatestDrawNumber() // 최신 당첨회차 정보가 없는 경우 최신 당첨회차 정보를 먼저 가져온 후에 통계 정보를 가져옴

    if (lottoStore.isFetched) {
      await lottoStore.getMostAndLeastFrequentNumbers()
    }
  }
}

onMounted(() => {
  fetchStatistics()
})
</script>

<template>
  <div v-if="lottoStore.isLoading" class="text-center">
    최신 당첨 회차로부터 10회차까지의 통계를 가져오는 중입니다.
  </div>

  <div v-else>
    <v-list lines="two" class="lotto-stats">
      <h1>최근 당첨 10회차 통계</h1>
      <v-list-item title="가장 많이 나온 번호">
        <ul>
          <BallComponent
            v-for="(number, index) in lottoStore.mostFrequentNumbers"
            :key="index"
            :number="number"
          >
            {{ number }}
          </BallComponent>
        </ul>
      </v-list-item>

      <v-list-item title="가장 적게 나온 번호">
        <ul>
          <BallComponent
            v-for="(number, index) in lottoStore.leastFrequentNumbers"
            :key="index"
            :number="number"
          >
            {{ number }}
          </BallComponent>
        </ul>
      </v-list-item>

      <v-list-item title="가장 많이 나온 번호의 출현 횟수">
        총 10회차 중 <strong>{{ lottoStore.maxFrequency }}</strong
        >회
      </v-list-item>

      <v-list-item title="가장 적게 나온 번호의 출현 횟수">
        총 10회차 중 <strong>{{ lottoStore.minFrequency }}</strong
        >회
      </v-list-item>
    </v-list>
  </div>
</template>

<style lang="scss" scoped>
.lotto-stats {
  padding-top: 0;
  text-align: center;

  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.5rem;
  }
}

h1 {
  font-size: 1.25rem;
  font-weight: 700;
}
</style>
