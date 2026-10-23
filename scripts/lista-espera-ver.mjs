// Mostra quem entrou na lista de espera (mais recentes primeiro).
//   node --env-file=.env.local scripts/lista-espera-ver.mjs
import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL)
const rows = await sql`SELECT nome, contato, plano, criado_em FROM lista_espera ORDER BY criado_em DESC`
console.log(`${rows.length} pessoa(s) na lista de espera\n`)
console.table(
  rows.map((r) => ({
    nome: r.nome,
    contato: r.contato,
    plano: r.plano ?? '—',
    quando: new Date(r.criado_em).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
  })),
)
