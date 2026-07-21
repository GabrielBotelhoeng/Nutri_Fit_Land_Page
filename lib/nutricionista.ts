// Fonte única de dados do nutricionista exibidos na landing.
// Cada campo aceita override via env var NEXT_PUBLIC_* — se ausente, usa o
// placeholder atual (Camila Rocha) que serve como demo/portfólio até fechar
// o primeiro cliente. Ao onboardar um nutri real, popular o .env.local com
// os dados dele e reiniciar o dev server / rebuildar.

export const nutri = {
  primeiroNome:
    process.env.NEXT_PUBLIC_NUTRI_PRIMEIRO_NOME ?? 'Camila',
  nomeCompleto:
    process.env.NEXT_PUBLIC_NUTRI_NOME_COMPLETO ?? 'Camila Rocha',
  iniciais:
    process.env.NEXT_PUBLIC_NUTRI_INICIAIS ?? 'C',
  marca:
    process.env.NEXT_PUBLIC_NUTRI_MARCA ?? 'Camila Rocha Nutrição',

  crn:
    process.env.NEXT_PUBLIC_NUTRI_CRN ?? 'CRN-3 12.345',
  // Só a sigla regional (usada isolada no StatsSection).
  crnSigla:
    process.env.NEXT_PUBLIC_NUTRI_CRN_SIGLA ?? 'CRN-3',

  // "Nutricionista clínica" com inicial maiúscula (usado em títulos/labels).
  especialidade:
    process.env.NEXT_PUBLIC_NUTRI_ESPECIALIDADE ?? 'Nutricionista clínica',
  // Mesma coisa em minúscula pra ficar bem no meio de frase.
  especialidadeInline:
    process.env.NEXT_PUBLIC_NUTRI_ESPECIALIDADE_INLINE ?? 'nutricionista clínica',

  // Concordância de gênero pra copy conversacional.
  // Feminino:  artigo="a", pronome="ela", registrado="registrada"
  // Masculino: artigo="o", pronome="ele", registrado="registrado"
  artigo:
    process.env.NEXT_PUBLIC_NUTRI_ARTIGO ?? 'a',
  pronome:
    process.env.NEXT_PUBLIC_NUTRI_PRONOME ?? 'ela',
  registrado:
    process.env.NEXT_PUBLIC_NUTRI_REGISTRADO ?? 'registrada',
} as const

// Helpers pra capitalização quando "ela"/"a" aparecem em início de frase.
export const artigoCapitalizado = nutri.artigo.charAt(0).toUpperCase() + nutri.artigo.slice(1)
export const pronomeCapitalizado = nutri.pronome.charAt(0).toUpperCase() + nutri.pronome.slice(1)
