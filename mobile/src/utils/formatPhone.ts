type formatPhoneProps = {
  phone: string
}
export function formatPhone({ phone }: formatPhoneProps) {
  if (phone.length < 10 || phone.length > 13) {
    return phone
  }

  return phone
    .replace(/\D/g, '')
    .replace(/^(\d{2})(\d{2})(\d{5})(\d{4})$/, '+$1 ($2) $3-$4')
    .replace(/^(\d{2})(\d{2})(\d{4})(\d{4})$/, '+$1 ($2) $3-$4')
}
