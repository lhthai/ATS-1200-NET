const formatDateTime = () => {
  const date = new Date()
  let hour = date.getHours()
  hour = (hour < 10 ? '0' : '') + hour

  let min = date.getMinutes()
  min = (min < 10 ? '0' : '') + min

  let sec = date.getSeconds()
  sec = (sec < 10 ? '0' : '') + sec

  const year = date.getFullYear()

  let month = date.getMonth() + 1
  month = (month < 10 ? '0' : '') + month

  let day = date.getDate()
  day = (day < 10 ? '0' : '') + day

  return `${day}/${month}/${year} ${hour}:${min}:${sec}`
}

export default formatDateTime
