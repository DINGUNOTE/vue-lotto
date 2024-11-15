<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'

const lottoData = ref({
  lottoNumbers: [], // 로또 당첨 번호
  drawDate: '', // 추첨 날짜 : YYYY-MM-DD 형식
  totalSellAmount: 0, // 총 판매 금액
  totalPrize: 0, // 1등 당첨 금액
  firstPrizeWinners: 0, // 1등 당첨 인원
  latestDrawNumber: null, // 최신 회차 번호
})

const errorMsg = ref('') // 에러 메세지
const isLoading = ref(false) // 회차 탐색 중 여부

const fetchLatestDrawNumber = async () => {
  try {
    isLoading.value = true

    let low = 1100 // 검색 시작할 회차
    let high = 1500 // 검색 마지막 회차
    let mid // 현재 검색 회차

    // 최신 회차 번호를 찾을 때까지 반복
    while (low <= high) {
      mid = Math.floor((low + high) / 2)
      // 로컬 테스트용
      // const response = await axios.get(`/api/common.do?method=getLottoNumber&drwNo=${mid}`)

      // 배포용
      const response = await axios.get(
        `https://cors-anywhere.herokuapp.com/https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=${mid}`,
      )
      if (response.data.returnValue === 'success') {
        low = mid + 1
        lottoData.value.latestDrawNumber = mid
      } else {
        high = mid - 1
      }
    }

    // 최신 회차 번호를 찾았다면 해당 회차의 당첨 번호를 불러옴
    if (lottoData.value.latestDrawNumber) {
      fetchLottoData(lottoData.value.latestDrawNumber)
    } else {
      errorMsg.value = '최신 회차 번호를 불러오는 데 실패했습니다.'
    }
  } catch (error) {
    errorMsg.value = `API 호출 중 오류가 발생했습니다 : ${error}`
  } finally {
    isLoading.value = false
  }
}

const fetchLottoData = async (drawNumber) => {
  try {
    isLoading.value = true

    // const response = await axios.get(`/api/common.do?method=getLottoNumber&drwNo=${drawNumber}`)
    const response = await axios.get(
      `https://cors-anywhere.herokuapp.com/https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=${drawNumber}`,
    )
    if (response.data.returnValue === 'success') {
      const data = lottoData.value

      data.lottoNumbers = [
        response.data.drwtNo1,
        response.data.drwtNo2,
        response.data.drwtNo3,
        response.data.drwtNo4,
        response.data.drwtNo5,
        response.data.drwtNo6,
        response.data.bnusNo,
      ]

      data.drawDate = response.data.drwNoDate
      data.totalSellAmount = response.data.totSellamnt
      data.totalPrize = response.data.firstAccumamnt
      data.firstPrizeWinners = response.data.firstPrzwnerCo
      data.latestDrawNumber = response.data.drwNo
    } else {
      errorMsg.value = '최신 당첨 회차를 불러오는 데 실패했습니다.'
    }
  } catch (error) {
    errorMsg.value = `API 호출 중 오류가 발생했습니다: ${error.message}`
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchLatestDrawNumber()
})

// computed를 사용해서 lottodata.value의 값을 각각 변수에 할당 및 구조 변환
const lottoNumbers = computed(() => lottoData.value.lottoNumbers)
const drawDate = computed(() => {
  const date = new Date(lottoData.value.drawDate)

  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`
})

const totalSellAmount = computed(() =>
  lottoData.value.totalSellAmount.toLocaleString('ko-KR', { style: 'currency', currency: 'KRW' }),
)
const totalPrize = computed(() =>
  lottoData.value.totalPrize.toLocaleString('ko-KR', { style: 'currency', currency: 'KRW' }),
)
const firstPrizeWinners = computed(() => lottoData.value.firstPrizeWinners)
// 1등 게임 당 당첨금액
const prizePerGame = computed(() => {
  const totalPrize = lottoData.value.totalPrize
  const firstPrizeWinners = lottoData.value.firstPrizeWinners
  return firstPrizeWinners > 0
    ? (totalPrize / firstPrizeWinners).toLocaleString('ko-KR', {
        style: 'currency',
        currency: 'KRW',
      })
    : '0'
})
const latestDrawNumber = computed(() => lottoData.value.latestDrawNumber)

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
    <div v-if="isLoading" class="text-center">최신 회차를 검색중입니다.</div>
    <div v-else>
      <div v-if="errorMsg" class="text-center">{{ errorMsg }}</div>
      <div v-else class="lotto-info">
        <h1>
          {{ latestDrawNumber }}회 당첨결과<br />
          <span class="draw-date">({{ drawDate }} 추첨)</span>
        </h1>
        <v-list lines="two">
          <v-list-item title="총 판매금액" :subtitle="totalSellAmount" />

          <v-list-item title="1등 당첨금액" :subtitle="totalPrize" />

          <v-list-item title="1등 당첨게임 수" :subtitle="firstPrizeWinners" />

          <v-list-item title="1게임당 당첨금액" :subtitle="prizePerGame" />
        </v-list>

        <ul>
          <li v-for="(number, index) in lottoNumbers" :key="index" :class="getNumberClass(number)">
            {{ number }}
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
