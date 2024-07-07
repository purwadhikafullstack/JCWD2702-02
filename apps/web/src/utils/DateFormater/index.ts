export const DateFormatter = (dateFromData: string): string => {
  const date = new Date(dateFromData)

  if (isNaN(date.getTime())) {
    throw new Error('Invalid date')
  }

  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Jakarta',
    hour12: false,
  }

  const formattedDate = new Intl.DateTimeFormat('id-ID', options).format(date)

  const formattedResult = formattedDate.replace(/,/g, '') + ' WIB'

  return formattedResult
}
