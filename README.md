# NutriChat — Landing Page

Landing white-label do NutriChat, o assistente nutricional via WhatsApp.
Apresenta o produto, o(a) nutricionista e os planos, e leva o visitante
para uma conversa direta no WhatsApp.

**Live:** <https://nutrichat-landing.vercel.app>

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 16 (App Router) + React 19 + TypeScript |
| Estilo | Tailwind v4 (`@theme` com 9 tokens de cor) |
| 3D | Three.js via `@react-three/fiber` + `@react-three/drei` |
| Animação | Framer Motion |
| Ícones | Lucide React |
| Deploy | Vercel (auto-deploy do branch `main`) |

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

Todas são `NEXT_PUBLIC_*` — o Next.js embute no bundle no momento do build,
então **toda mudança exige rebuild ou reinício do dev server**.

| Var | Uso |
|---|---|
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Número do nutricionista (DDI+DDD+número, sem `+` ou espaços). Alimenta os links `wa.me` de todos os CTAs. |
| `NEXT_PUBLIC_NUTRI_PRIMEIRO_NOME` | Primeiro nome (aparece no Hero e Header) |
| `NEXT_PUBLIC_NUTRI_NOME_COMPLETO` | Nome completo (Footer, StatsSection) |
| `NEXT_PUBLIC_NUTRI_INICIAIS` | 1–2 letras no avatar circular |
| `NEXT_PUBLIC_NUTRI_MARCA` | Marca / razão social (Footer) |
| `NEXT_PUBLIC_NUTRI_CRN` | CRN completo (sigla + número) |
| `NEXT_PUBLIC_NUTRI_CRN_SIGLA` | Só a sigla regional (StatsSection) |
| `NEXT_PUBLIC_NUTRI_ESPECIALIDADE` | Especialidade capitalizada (títulos) |
| `NEXT_PUBLIC_NUTRI_ESPECIALIDADE_INLINE` | Especialidade minúscula (meio de frase) |
| `NEXT_PUBLIC_NUTRI_ARTIGO` | `a` ou `o` |
| `NEXT_PUBLIC_NUTRI_PRONOME` | `ela` ou `ele` |
| `NEXT_PUBLIC_NUTRI_REGISTRADO` | `registrada` ou `registrado` |

Se qualquer `NEXT_PUBLIC_NUTRI_*` estiver ausente, `lib/nutricionista.ts`
faz fallback para o placeholder `Camila Rocha` (modo demo).

## Build de produção

```bash
npm run build
npm run start
```

## Deploy (Vercel)

O repositório está conectado à Vercel: push em `main` dispara build e
deploy automático.

- Env vars são configuradas em **Vercel → Project → Settings → Environment Variables**
- Domínio: alias curto `nutrichat-landing.vercel.app`
- Deployment Protection: **desligada** (landing é pública)

Para deploy manual (raro):

```bash
vercel --prod
```

## Estrutura

```
app/                  # App Router (page.tsx + layout.tsx)
components/           # Hero, Plans, Footer, PhoneCanvas, StatsSection, ...
lib/
  nutricionista.ts    # Fonte única dos dados do nutri (lê NEXT_PUBLIC_NUTRI_*)
  whatsapp.ts         # waLink(label) — monta wa.me com msg pré-preenchida
  animations.ts       # Variantes Framer Motion reutilizáveis
public/
  hero-phone-static.webp   # Fallback do celular 3D em mobile
```

## Responsividade

O celular 3D (Three.js) roda apenas em telas `>= 768px`. Em mobile, é
substituído pela imagem estática `public/hero-phone-static.webp` via
dynamic import com `ssr: false`.
