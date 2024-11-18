import axios from 'axios'

const BASE_URL = 'https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo='

export const fetchLottoNumber = async (drawNumber) => {
  const response = await axios.get(
    `https://api.allorigins.win/get?url=${encodeURIComponent(`${BASE_URL}${drawNumber}`)}`,
  )
  return JSON.parse(response.data.contents)
}
