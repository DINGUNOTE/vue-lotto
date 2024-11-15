<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const lottoNumbers = ref([])
const errorMsg = ref('')
const latestDrawNumber = ref(null)

const fetchLatestDrawNumber = async () => {
  try {
    // 최신 회차 번호를 추정하여 가져오기
    const response = await axios.get('/api/common.do?method=getLottoNumber&drwNo=1000')
    if (response.data.returnValue === 'success') {
      latestDrawNumber.value = response.data.drwNo
      fetchLottoNumbers(latestDrawNumber.value)
    } else {
      errorMsg.value = '최신 회차 번호를 불러오는 데 실패했습니다.'
    }
  } catch (error) {
    errorMsg.value = `API 호출 중 오류가 발생했습니다: ${error}`
  }
}

const fetchLottoNumbers = async (drawNumber) => {
  try {
    const response = await axios.get(`/api/common.do?method=getLottoNumber&drwNo=${drawNumber}`)
    if (response.data.returnValue === 'success') {
      lottoNumbers.value = [
        response.data.drwtNo1,
        response.data.drwtNo2,
        response.data.drwtNo3,
        response.data.drwtNo4,
        response.data.drwtNo5,
        response.data.drwtNo6,
        response.data.bnusNo,
      ]
    } else {
      errorMsg.value = '최신 당첨 회차를 불러오는 데 실패했습니다.'
    }
  } catch (error) {
    errorMsg.value = `API 호출 중 오류가 발생했습니다: ${error}`
  }
}

onMounted(() => {
  fetchLatestDrawNumber()
})
</script>

<template>
  <section>
    <div v-if="errorMsg">{{ errorMsg }}</div>
    <div v-else>
      <p>최신 로또 당첨 번호 (회차: {{ latestDrawNumber }}):</p>
      <ul>
        <li v-for="(number, index) in lottoNumbers" :key="index">{{ number }}</li>
      </ul>
    </div>
  </section>
</template>

<style scoped></style>
