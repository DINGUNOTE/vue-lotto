import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { fetchLottoNumber } from '@/api'
import { formatDate, formatCurrency } from '@/utils'

export const useLottoStore = defineStore('lotto', () => {
  const lottoNumbers = ref([]) // 로또 당첨 번호
  const bonusNumber = ref(null) // 보너스 번호
  const drawDate = ref('') // 추첨 날짜 : YYYY-MM-DD 형식
  const totalSellAmount = ref(0) // 총 판매 금액
  const totalPrize = ref(0) // 1등 당첨 금액
  const firstPrizeWinners = ref(0) // 1등 당첨 인원
  const latestDrawNumber = ref(null) // 최신 회차 번호
  const errorMsg = ref('') // 에러 메세지
  const isLoading = ref(false) // 회차 탐색 중 여부

  // 최신 회차 검색
  const fetchLatestDrawNumber = async () => {
    try {
      isLoading.value = true

      let low = 1100 // 검색 시작할 회차
      let high = 1500 // 검색 마지막 회차
      let mid // 현재 검색 회차

      // 최신 회차 번호를 찾을 때까지 반복
      while (low <= high) {
        mid = Math.floor((low + high) / 2)

        const data = await fetchLottoNumber(mid)

        if (data.returnValue === 'success') {
          low = mid + 1
          latestDrawNumber.value = mid
        } else {
          high = mid - 1
        }
      }

      // 최신 회차 번호를 찾았다면 해당 회차의 당첨 번호를 불러옴
      if (latestDrawNumber.value) {
        await fetchLottoData(latestDrawNumber.value)
      } else {
        errorMsg.value = '최신 회차 번호를 불러오는 데 실패했습니다.'
      }
    } catch (error) {
      errorMsg.value = `API 호출 중 오류가 발생했습니다 : ${error}`
    } finally {
      isLoading.value = false
    }
  }

  // 최신 회차 번호를 받아서 당첨 번호 불러오기
  const fetchLottoData = async (drawNumber) => {
    try {
      isLoading.value = true

      const data = await fetchLottoNumber(drawNumber)

      if (data.returnValue === 'success') {
        lottoNumbers.value = [
          data.drwtNo1,
          data.drwtNo2,
          data.drwtNo3,
          data.drwtNo4,
          data.drwtNo5,
          data.drwtNo6,
        ]

        bonusNumber.value = data.bnusNo
        drawDate.value = data.drwNoDate
        totalSellAmount.value = data.totSellamnt
        totalPrize.value = data.firstAccumamnt
        firstPrizeWinners.value = data.firstPrzwnerCo
        latestDrawNumber.value = data.drwNo
      } else {
        errorMsg.value = '최신 당첨 회차를 불러오는 데 실패했습니다.'
      }
    } catch (error) {
      errorMsg.value = `API 호출 중 오류가 발생했습니다: ${error.message}`
    } finally {
      isLoading.value = false
    }
  }

  // 데이터 포맷팅
  const formattedDrawDate = computed(() => formatDate(drawDate.value))
  const formattedTotalSellAmount = computed(() => formatCurrency(totalSellAmount.value))
  const formattedTotalPrize = computed(() => formatCurrency(totalPrize.value))
  const prizePerGame = computed(() => {
    return firstPrizeWinners.value > 0
      ? formatCurrency(totalPrize.value / firstPrizeWinners.value)
      : '0 원'
  })

  return {
    lottoNumbers,
    bonusNumber,
    drawDate,
    totalSellAmount,
    totalPrize,
    firstPrizeWinners,
    latestDrawNumber,
    errorMsg,
    isLoading,
    fetchLatestDrawNumber,
    fetchLottoData,
    formattedDrawDate,
    formattedTotalSellAmount,
    formattedTotalPrize,
    prizePerGame,
  }
})
