export function waLink(planLabel?: string): string {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '5500000000000'
  const text = planLabel
    ? `Olá! Tenho interesse no plano ${planLabel} do Nutri Chat. Pode me passar mais informações?`
    : 'Olá! Quero começar com o NutriChat.'
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`
}
