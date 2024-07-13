export function classNames(...classes: unknown[]): string {
  return classes.filter(Boolean).join(' ')
}

export const formatAmount = (amount: number): string => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN'
  }).format(amount)
}

export const generateTransactionRef = (): string => {
  const prefix = 'VEND142'
  const suffix = 'V927TR'

  const date = new Date()

  const year = date.getFullYear().toString().slice(-2) // Last two digits of the year
  const month = ('0' + (date.getMonth() + 1)).slice(-2) // Month, zero-padded
  const day = ('0' + date.getDate()).slice(-2) // Day, zero-padded
  const hour = ('0' + date.getHours()).slice(-2) // Hour, zero-padded
  const minute = ('0' + date.getMinutes()).slice(-2) // Minute, zero-padded
  const second = ('0' + date.getSeconds()).slice(-2) // Second, zero-padded
  const millisecond = ('00' + date.getMilliseconds()).slice(-3) // Millisecond, zero-padded to three digits

  const randomDigits = Math.floor(Math.random() * 100000)
    .toString()
    .padStart(5, '0') // 5 random digits

  return `${prefix}${year}${month}${day}${hour}${minute}${second}${millisecond}${randomDigits}${suffix}`
}
