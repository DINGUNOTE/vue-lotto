import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { fetchLottoNumber } from '@/api'
import { formatDate, formatCurrency, sortArr } from '@/utils'

export const useLottoStore = defineStore('lotto', () => {
  const lottoNumbers = ref([]) // 로또 당첨 번호
  const bonusNumber = ref(0) // 보너스 번호
  const drawDate = ref('') // 추첨 날짜 : YYYY-MM-DD 형식
  const totalSellAmount = ref(0) // 총 판매 금액
  const totalPrize = ref(0) // 1등 당첨 금액
  const firstPrizeWinners = ref(0) // 1등 당첨 인원
  const latestDrawNumber = ref(null) // 최신 회차 번호
  const errorMsg = ref('') // 에러 메세지
  const isLoading = ref(false) // 회차 탐색 중 여부
  const isFetched = ref(false) // 데이터 불러오기 성공 여부

  const fixedNumbers = ref([]) // 고정 번호 리스트
  const excludedNumbers = ref([]) // 제외 번호 리스트

  const alertMessage = ref('') // 알림 메세지
  const isShowAlert = ref(false) // 알림 표시 여부

  // 최신 회차 검색
  const fetchLatestDrawNumber = async () => {
    if (isFetched.value) return

    try {
      isLoading.value = true

      let low = 1100 // 검색 시작할 회차
      let high = 1200 // 검색 마지막 회차
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
        isFetched.value = true
      } else {
        errorMsg.value = '최신 회차 번호를 불러오는 데 실패했습니다.'
      }
    } catch (error) {
      errorMsg.value = `API 호출 중 오류가 발생했습니다 : ${error}`
    } finally {
      isLoading.value = false
    }
  }

  // 당첨 데이터 불러오기
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

  // 고정 번호 추가
  const addFixedNumber = (number) => {
    if (fixedNumbers.value.includes(number)) {
      setAlertMessage('이미 등록된 번호입니다.')
    }

    if (excludedNumbers.value.includes(number)) {
      setAlertMessage('해당 번호는 이미 제외 번호에 포함되어 있습니다.')
      return
    }

    if (fixedNumbers.value.length >= 5) {
      setAlertMessage('고정 번호는 최대 5개까지 입력 가능합니다.')
      return
    }

    if (isNaN(number) || number < 1 || number > 45) {
      setAlertMessage('1부터 45 사이의 숫자를 입력해주세요.')
      return
    }

    if (fixedNumbers.value.length < 5 && !fixedNumbers.value.includes(number)) {
      fixedNumbers.value = sortArr([...fixedNumbers.value, number])
    }
  }

  // 제외 번호 추가
  const addExcludedNumber = (number) => {
    if (excludedNumbers.value.includes(number)) {
      setAlertMessage('이미 등록된 번호입니다.')
    }

    if (fixedNumbers.value.includes(number)) {
      setAlertMessage('해당 번호는 이미 등록 번호에 포함되어 있습니다.')
      return
    }

    if (excludedNumbers.value.length >= 38) {
      setAlertMessage('제외 번호는 최대 38개까지 입력 가능합니다.')
      return
    }

    if (isNaN(number) || number < 1 || number > 45) {
      setAlertMessage('1부터 45 사이의 숫자를 입력해주세요.')
      return
    }

    if (excludedNumbers.value.length < 38 && !excludedNumbers.value.includes(number)) {
      excludedNumbers.value = sortArr([...excludedNumbers.value, number])
    }
  }

  // 고정 번호 삭제
  const removeFixedNumber = (number) => {
    fixedNumbers.value = sortArr(fixedNumbers.value.filter((n) => n !== number))
  }

  // 제외 번호 삭제
  const removeExcludedNumber = (number) => {
    excludedNumbers.value = sortArr(excludedNumbers.value.filter((n) => n !== number))
  }

  // 알림 메세지 설정
  const setAlertMessage = (message) => {
    alertMessage.value = message
    isShowAlert.value = true
  }

  // 알림 메세지 초기화
  const clearAlertMessage = () => {
    alertMessage.value = ''
    isShowAlert.value = false
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
    alertMessage,
    isShowAlert,
    fetchLatestDrawNumber,
    fetchLottoData,
    formattedDrawDate,
    formattedTotalSellAmount,
    formattedTotalPrize,
    setAlertMessage,
    clearAlertMessage,
    prizePerGame,
    fixedNumbers,
    excludedNumbers,
    addFixedNumber,
    addExcludedNumber,
    removeFixedNumber,
    removeExcludedNumber,
  }
})
