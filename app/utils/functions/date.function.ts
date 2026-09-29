// 'dd/MM/yyyy' → Date
export const parseDate = (dateStr: string): Date => {
  const dateParts = dateStr.split('/')
  return new Date(
    Number(dateParts[2]),
    Number(dateParts[1]) - 1,
    Number(dateParts[0])
  )
}
