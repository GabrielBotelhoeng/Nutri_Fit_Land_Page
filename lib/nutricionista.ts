// Fonte única de dados da marca e (opcionalmente) do nutricionista parceiro.
//
// A landing fala na voz da marca NutriChat. Não existe mais nutricionista de
// placeholder: nome, CRN e especialidade só aparecem quando um profissional
// REAL é configurado via NEXT_PUBLIC_NUTRI_* — sem isso, nenhum dado de pessoa
// é exibido. Nunca coloque aqui um nome ou CRN inventado: registro profissional
// fictício numa página pública é exercício irregular da profissão.

const env = (v: string | undefined) => (v && v.trim() ? v.trim() : undefined)

const nomeCompleto = env(process.env.NEXT_PUBLIC_NUTRI_NOME_COMPLETO)
const crn = env(process.env.NEXT_PUBLIC_NUTRI_CRN)

export const marca = env(process.env.NEXT_PUBLIC_NUTRI_MARCA) ?? 'NutriChat'

// Só existe nutricionista na página quando nome E CRN foram configurados.
export const nutri =
  nomeCompleto && crn
    ? {
        nomeCompleto,
        crn,
        especialidade: env(process.env.NEXT_PUBLIC_NUTRI_ESPECIALIDADE) ?? 'Nutricionista',
        iniciais:
          env(process.env.NEXT_PUBLIC_NUTRI_INICIAIS) ??
          nomeCompleto
            .split(/\s+/)
            .map((p) => p[0])
            .slice(0, 2)
            .join('')
            .toUpperCase(),
      }
    : null
