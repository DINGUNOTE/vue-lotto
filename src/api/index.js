import axios from 'axios'

export const fetchLottoNumber = async (drawNumber) => {
  const response = await axios.get(
    `https://api.allorigins.win/get?url=${encodeURIComponent(`https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=${drawNumber}`)}`,
  )
  const data = JSON.parse(response.data.contents)
  return data
}
