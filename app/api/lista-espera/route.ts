import { neon } from '@neondatabase/serverless'

// Conexão criada sob demanda: no topo do módulo, `neon()` quebraria o
// `next build` quando DATABASE_URL não estiver presente.
let sql: ReturnType<typeof neon> | null = null
function db() {
  if (!sql) {
    const url = process.env.DATABASE_URL
    if (!url) throw new Error('DATABASE_URL não configurada')
    sql = neon(url)
  }
  return sql
}

const PLANOS = new Set(['Mensal', 'Trimestral', 'Semestral', 'Anual'])

type Body = {
  nome?: unknown
  contato?: unknown
  plano?: unknown
  consentimento?: unknown
  site?: unknown // campo-armadilha: humanos não veem, bots preenchem
}

const erro = (mensagem: string, status = 400) => Response.json({ ok: false, mensagem }, { status })

// Aceita WhatsApp (10–13 dígitos, com ou sem DDI) ou e-mail.
function normalizarContato(bruto: string): string | null {
  const v = bruto.trim()
  if (v.includes('@')) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) && v.length <= 120 ? v.toLowerCase() : null
  }
  const digitos = v.replace(/\D/g, '')
  if (digitos.length === 10 || digitos.length === 11) return `55${digitos}`
  if ((digitos.length === 12 || digitos.length === 13) && digitos.startsWith('55')) return digitos
  return null
}

export async function POST(request: Request) {
  let body: Body
  try {
    body = await request.json()
  } catch {
    return erro('Requisição inválida.')
  }

  // Bot caiu na armadilha: responde sucesso sem gravar nada.
  if (typeof body.site === 'string' && body.site.trim() !== '') return Response.json({ ok: true })

  const nome = typeof body.nome === 'string' ? body.nome.trim().replace(/\s+/g, ' ') : ''
  if (nome.length < 2 || nome.length > 80) return erro('Conta pra gente seu nome.')

  const contato = typeof body.contato === 'string' ? normalizarContato(body.contato) : null
  if (!contato) return erro('Informe um WhatsApp com DDD ou um e-mail válido.')

  if (body.consentimento !== true) return erro('Precisamos do seu ok pra guardar o contato.')

  const plano = typeof body.plano === 'string' && PLANOS.has(body.plano) ? body.plano : null

  try {
    // Mesmo contato de novo: atualiza nome/plano em vez de duplicar.
    await db()`
      INSERT INTO lista_espera (nome, contato, plano, consentimento)
      VALUES (${nome}, ${contato}, ${plano}, true)
      ON CONFLICT (contato) DO UPDATE
        SET nome = EXCLUDED.nome, plano = COALESCE(EXCLUDED.plano, lista_espera.plano)`
  } catch (error) {
    console.error('Erro ao gravar na lista de espera:', error)
    return erro('Não conseguimos salvar agora. Tenta de novo em instantes?', 500)
  }

  return Response.json({ ok: true })
}
