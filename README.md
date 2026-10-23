# NutriChat — Landing Page

Landing white-label do NutriChat, o assistente nutricional via WhatsApp.
Apresenta o produto, o(a) nutricionista e os planos, e leva o visitante
para uma conversa direta no WhatsApp.

**Live:** <https://nutrichat-landing-six.vercel.app>

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 16 (App Router) + React 19 + TypeScript |
| Estilo | Tailwind v4 (`@theme` com 9 tokens de cor) |
| Animação | Framer Motion (UI) + GSAP/ScrollTrigger (scroll, marquee, contadores) |
| Ícones | Lucide React |
| Deploy | Vercel (manual via CLI — ver abaixo) |

## Setup local

```bash
# 1. Copie o exemplo e preencha com os dados do nutri
cp .env.example .env.local
# edite .env.local

# 2. Instale as dependências
npm install

# 3. Rode em dev
npm run dev
# abre http://localhost:3000
```

## Variáveis de ambiente

Todas são `NEXT_PUBLIC_*`: o Next.js embute no bundle no build, então
**toda mudança exige rebuild ou reinício do dev server**.

| Var | Uso |
|---|---|
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Número que recebe os CTAs (DDI+DDD+número). Sem ele, a página fica em modo lista de espera. |
| `DATABASE_URL` | Neon Postgres da lista de espera (injetada pela integração da Vercel). |
| `NEXT_PUBLIC_NUTRI_MARCA` | Marca no Header/Footer/título. Padrão: `NutriChat`. |
| `NEXT_PUBLIC_NUTRI_NOME_COMPLETO` | *Opcional.* Nome do nutricionista parceiro **real**. |
| `NEXT_PUBLIC_NUTRI_CRN` | *Opcional.* CRN real (sigla + número). |
| `NEXT_PUBLIC_NUTRI_ESPECIALIDADE` | *Opcional.* Ex.: `Nutricionista clínica`. |
| `NEXT_PUBLIC_NUTRI_INICIAIS` | *Opcional.* Letras do avatar (calculadas do nome se ausente). |

A landing fala na voz da marca. **Não há nutricionista de placeholder**: nome
e CRN só aparecem quando nome **e** CRN estão preenchidos com dados reais.

## Lista de espera (pré-lançamento)

Enquanto `NEXT_PUBLIC_WHATSAPP_NUMBER` não tiver um número real, a página fica
em **modo lista de espera**: todo CTA abre um formulário (nome, WhatsApp ou
e-mail, plano de interesse e consentimento LGPD) que grava no Neon Postgres via
`POST /api/lista-espera`. Ao configurar o número na Vercel e republicar, os CTAs
voltam a abrir o WhatsApp sozinhos — sem mudar código.

```bash
# ver quem entrou na lista (lê o DATABASE_URL do .env.local)
node --env-file=.env.local scripts/lista-espera-ver.mjs

# criar a tabela num banco novo (idempotente)
node --env-file=.env.local scripts/lista-espera-setup.mjs

# credenciais locais atualizadas da Vercel
npx vercel env pull .env.local --yes
```

O banco foi provisionado pelo Marketplace da Vercel (Neon), que injeta
`DATABASE_URL`/`DATABASE_URL_UNPOOLED` em Production, Preview e Development.

## Build de produção

```bash
npm run build
npm run start
```

## Deploy (Vercel)

**O deploy é manual.** O repositório GitHub não está conectado à Vercel,
então merge em `main` não publica nada sozinho. Depois do merge:

```bash
git checkout main && git pull
npx vercel --prod
```

A pasta já está vinculada ao projeto (`.vercel/project.json`). Pra ter deploy
automático a cada merge, conecte o repo em **Vercel → Project → Settings → Git**.

- Env vars são configuradas em **Vercel → Project → Settings → Environment Variables**
- Domínio: alias curto `nutrichat-landing-six.vercel.app`
- Deployment Protection: **desligada** (landing é pública)


## Estrutura

```
app/                  # App Router (page.tsx + layout.tsx)
components/           # Hero, Plans, Footer, PhoneCanvas, StatsSection, ...
lib/
  nutricionista.ts    # Marca + nutri real opcional (lê NEXT_PUBLIC_NUTRI_*)
  gsap.ts             # Registro único dos plugins GSAP
  whatsapp.ts         # waLink(label) — monta wa.me com msg pré-preenchida
  animations.ts       # Variantes Framer Motion reutilizáveis
public/img/           # Imagens geradas no Higgsfield (comida/cenas, sem pessoas)
```

## O celular do Hero

`components/PhoneDemo.tsx` é uma demo interativa em HTML (sem WebGL), igual em
desktop e mobile. O visitante toca em Foto/Áudio/Código pra disparar a conversa,
e cada refeição registrada alimenta as abas **Hoje** (anel de kcal, macros, água
clicável) e **Semana** (barras clicáveis). Sem interação, um autoplay percorre o
roteiro; ele para no primeiro toque e pausa fora da tela.
