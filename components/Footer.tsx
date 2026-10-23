import { waLink, whatsappAtivo } from '@/lib/whatsapp'
import { marca, nutri } from '@/lib/nutricionista'

const nav = [
  { href: '#como-funciona', label: 'Como funciona' },
  { href: '#situacoes', label: 'Pra quem é' },
  { href: '#funcionalidades', label: 'Recursos' },
  { href: '#planos', label: 'Planos' },
]

export default function Footer() {
  return (
    <footer className="bg-floresta text-offwhite py-14">
      <div className="max-w-[1152px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <p className="text-xl font-bold mb-1">{marca}</p>
            {nutri && (
              <p className="text-menta/80 text-xs uppercase tracking-widest font-semibold mb-3">
                {nutri.nomeCompleto} · {nutri.crn}
              </p>
            )}
            <p className="text-menta text-sm leading-relaxed max-w-xs">
              Acompanhamento nutricional no WhatsApp, todo dia, sem app pra baixar.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="text-menta text-xs uppercase tracking-widest font-semibold mb-4">
              Navegação
            </p>
            <ul className="flex flex-col gap-2">
              {nav.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-offwhite/80 text-sm hover:text-offwhite transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div>
            <p className="text-menta text-xs uppercase tracking-widest font-semibold mb-4">
              Fale com a gente
            </p>
            <p className="text-offwhite/80 text-sm mb-4">
              {whatsappAtivo
                ? 'Chama no WhatsApp pra tirar uma dúvida ou começar seu acompanhamento.'
                : 'Estamos em pré-lançamento. Entre na lista e avisamos quando abrir as vagas.'}
            </p>
            <a
              href={waLink()}
              className="inline-flex items-center justify-center bg-menta text-floresta px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-claro transition-colors"
              style={{ minHeight: '44px' }}
            >
              {whatsappAtivo ? 'Abrir WhatsApp' : 'Entrar na lista'}
            </a>
          </div>
        </div>

        <div className="border-t border-floresta/40 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-offwhite/75 text-xs">
          <p>© {new Date().getFullYear()} {marca}. Todos os direitos reservados.</p>
          <p>O NutriChat não substitui a consulta: ele leva o plano do seu nutricionista pro dia a dia.</p>
        </div>
      </div>
    </footer>
  )
}
