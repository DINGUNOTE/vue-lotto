<script setup>
import { onMounted } from 'vue'
import { useLottoStore } from '@/stores/lotto'

const lottoStore = useLottoStore()

onMounted(() => {
  lottoStore.fetchLatestDrawNumber()
})

// 공 색깔 부여
const getNumberClass = (number) => {
  if (number >= 1 && number <= 10) return 'yellow'
  if (number >= 11 && number <= 20) return 'blue'
  if (number >= 21 && number <= 30) return 'red'
  if (number >= 31 && number <= 40) return 'grey'
  if (number >= 41 && number <= 45) return 'green'
  return ''
}
</script>

<template>
  <section>
    <div v-if="lottoStore.isLoading" class="text-center">최신 회차를 검색중입니다.</div>
    <div v-else>
      <div v-if="lottoStore.errorMsg" class="text-center">{{ lottoStore.errorMsg }}</div>
      <div v-else class="lotto-info">
        <h1>
          {{ lottoStore.latestDrawNumber }}회 당첨결과<br />
          <span class="draw-date">({{ lottoStore.formattedDrawDate }} 추첨)</span>
        </h1>
        <v-list lines="two">
          <v-list-item title="총 판매금액" :subtitle="lottoStore.formattedTotalSellAmount" />

          <v-list-item title="1등 당첨금액" :subtitle="lottoStore.formattedTotalPrize" />

          <v-list-item title="1등 당첨게임 수" :subtitle="lottoStore.firstPrizeWinners" />

          <v-list-item title="1게임당 당첨금액" :subtitle="lottoStore.prizePerGame" />
        </v-list>

        <ul>
          <li
            v-for="(number, index) in lottoStore.lottoNumbers"
            :key="index"
            :class="getNumberClass(number)"
          >
            {{ number }}
          </li>
          <li :class="getNumberClass(lottoStore.bonusNumber)">
            {{ lottoStore.bonusNumber }}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.lotto-info {
  text-align: center;

  h1 {
    font-size: 1.25rem;
    font-weight: 700;

    span {
      font-size: 1rem;
      color: #767676;
      font-weight: 400;
    }
  }

  p {
    position: relative;
    text-align: left;
  }

  ul {
    display: flex;
    align-content: center;
    justify-content: center;
    gap: 0.5rem;

    li {
      display: flex;
      align-content: center;
      justify-content: center;
      width: 3rem;
      height: 3rem;
      color: #fff;
      line-height: 3rem;
      font-weight: 600;
      text-shadow: 0px 0px 3px rgba(73, 57, 0, 0.8);
      border-radius: 50%;

      &.yellow {
        background-color: #fbc400;
      }
      &.blue {
        background-color: #69c8f2;
      }

      &.red {
        background-color: #ff7272;
      }
      &.grey {
        background-color: #aaa;
      }
      &.green {
        background-color: #b0d840;
      }

      &:last-child {
        position: relative;
        margin-left: 3rem;

        &:before {
          position: absolute;
          top: 0;
          left: -2.5rem;
          content: '+';
          width: 2rem;
          height: 100%;
          font-size: 2rem;
          font-weight: 700;
          color: #000;
          text-shadow: none;
        }
      }
    }
  }
}
</style>
