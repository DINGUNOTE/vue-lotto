import axios from 'axios'

export const fetchLottoNumber = async (drawNumber) => {
  const response = await axios.get(
    `/api/common.do?method=getLottoNumber&drwNo=${drawNumber}`,
  )
  return response.data
}
