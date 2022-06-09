export const dateFormat = (date: string) =>
  new Date(Date.parse(date)).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
