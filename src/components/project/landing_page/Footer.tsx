import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-slate-300 dark:text-slate-400">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              TOconcursos
            </h3>
            <p className="text-slate-400 text-pretty">
              A plataforma mais completa do Tocantins para sua preparação em concursos públicos. Transformamos sonhos em
              aprovações.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-slate-800 dark:bg-slate-900 hover:bg-indigo-600 dark:hover:bg-indigo-500 rounded-lg flex items-center justify-center transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-slate-800 dark:bg-slate-900 hover:bg-indigo-600 dark:hover:bg-indigo-500 rounded-lg flex items-center justify-center transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-slate-800 dark:bg-slate-900 hover:bg-indigo-600 dark:hover:bg-indigo-500 rounded-lg flex items-center justify-center transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-slate-800 dark:bg-slate-900 hover:bg-indigo-600 dark:hover:bg-indigo-500 rounded-lg flex items-center justify-center transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Plataforma</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-indigo-400 transition-colors">
                  Questões
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-400 transition-colors">
                  Simulados
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-400 transition-colors">
                  Relatórios
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-400 transition-colors">
                  Comunidade
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-400 transition-colors">
                  Certificados
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Suporte</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-indigo-400 transition-colors">
                  Central de Ajuda
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-400 transition-colors">
                  Tutoriais
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-400 transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-400 transition-colors">
                  Contato
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-400 transition-colors">
                  Status do Sistema
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Contato</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-indigo-400" />
                <span className="text-sm">contato@toconcursos.com.br</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-indigo-400" />
                <span className="text-sm">(63) 3214-5678</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-indigo-400 mt-0.5" />
                <span className="text-sm">
                  Palmas - TO
                  <br />
                  Brasil
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 dark:border-slate-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 dark:text-slate-500 text-sm">© 2024 TOconcursos. Todos os direitos reservados.</p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="hover:text-indigo-400 dark:hover:text-indigo-300 transition-colors">
                Termos de Uso
              </a>
              <a href="#" className="hover:text-indigo-400 dark:hover:text-indigo-300 transition-colors">
                Política de Privacidade
              </a>
              <a href="#" className="hover:text-indigo-400 dark:hover:text-indigo-300 transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
