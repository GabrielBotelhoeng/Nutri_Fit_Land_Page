const phone = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '').replace(/\D/g, '')

// Só existe WhatsApp de verdade com um número completo (DDI+DDD+número) que
// não seja o placeholder de zeros. Sem isso, a página entra em modo lista de
// espera e todo CTA abre o formulário (ver ListaEspera.tsx).
export const whatsappAtivo = /^\d{12,13}$/.test(phone) && !/^0+$/.test(phone.slice(2))

export const LISTA_ESPERA_HREF = '#lista-espera'

export function waLink(planLabel?: string): string {
  if (!whatsappAtivo) {
    return planLabel ? `${LISTA_ESPERA_HREF}:${planLabel}` : LISTA_ESPERA_HREF
  }
  const text = planLabel
    ? `Olá! Tenho interesse no plano ${planLabel} do Nutri Chat. Pode me passar mais informações?`
    : 'Olá! Quero começar com o NutriChat.'
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`
}
