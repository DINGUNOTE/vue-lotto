<script setup>
import { onMounted } from 'vue'
import { useLottoStore } from '@/stores'

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
  <div v-if="lottoStore.isLoading">
    최근 당첨 100회차의 통계를 불러오는 중입니다.
  </div>

  <div v-else>
    <h3>최근 당첨 100회차 통계</h3>
    <p>
      가장 많이 나온 번호:
      {{ lottoStore.mostFrequentNumbers }}
    </p>
    <p>
      가장 적게 나온 번호:
      {{ lottoStore.leastFrequentNumbers }}
    </p>
    <p>
      가장 많이 나온 번호의 출현 횟수:
      {{ lottoStore.maxFrequency }}
    </p>
    <p>
      가장 적게 나온 번호의 출현 횟수:
      {{ lottoStore.minFrequency }}
    </p>
  </div>
</template>

<style lang="scss" scoped></style>
