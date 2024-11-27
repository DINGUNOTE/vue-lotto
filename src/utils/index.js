// 금액 형식 변경
export const formatCurrency = (amount) => {
  return amount.toLocaleString('ko-KR', { style: 'currency', currency: 'KRW' })
}

// 날짜 형식 변경
export const formatDate = (dateString) => {
  const date = new Date(dateString)
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`
}

// 배열 오름차순 정렬
export const sortArr = (arr) => {
  return arr.sort((a, b) => a - b)
}
