// Cria a tabela da lista de espera (idempotente). Usa a conexão direta:
// DDL não passa pelo pooler (PgBouncer).
//   node --env-file=.env.local scripts/lista-espera-setup.mjs
import { neon } from '@neondatabase/serverless'

const url = process.env.DATABASE_URL_UNPOOLED ?? process.env.DATABASE_URL
if (!url) throw new Error('DATABASE_URL ausente — rode `npx vercel env pull .env.local --yes`')
const sql = neon(url)

await sql`
  CREATE TABLE IF NOT EXISTS lista_espera (
    id             serial PRIMARY KEY,
    nome           text        NOT NULL CHECK (char_length(nome) BETWEEN 2 AND 80),
    contato        text        NOT NULL UNIQUE CHECK (char_length(contato) BETWEEN 5 AND 120),
    plano          text,
    consentimento  boolean     NOT NULL CHECK (consentimento),
    criado_em      timestamptz NOT NULL DEFAULT now()
  )`
console.log('Tabela lista_espera pronta.')
