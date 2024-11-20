import { format } from 'date-fns'

type formatDateProps = {
  date: Date
  dateFormat?: string
}
export function formatDate({
  date,
  dateFormat = 'dd/MM/yyyy'
}: formatDateProps) {
  try {
    return format(date, dateFormat)
  } catch (error) {
    return date.toString()
  }
}
