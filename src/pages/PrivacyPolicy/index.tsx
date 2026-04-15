export const PrivacyPolicy = () => {
  return (
    <main className="min-h-screen w-full bg-gray-50 flex justify-center px-4 py-12">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-md p-6 sm:p-10">

        {/* HEADER */}
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Política de Privacidade
          </h1>

          <p className="text-sm text-gray-500 mt-2">
            Última atualização: Abril de 2026
          </p>
        </header>

        {/* INTRO */}
        <section className="space-y-4 text-gray-700 leading-relaxed">
          <p>
            Esta Política de Privacidade descreve como coletamos, usamos e protegemos
            as informações dos usuários que utilizam nosso site e serviços.
          </p>

          <p>
            Ao utilizar nossa plataforma, você concorda com os termos descritos nesta política.
          </p>
        </section>

        {/* COOKIES */}
        <section className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900">
            1. Uso de Cookies
          </h2>

          <p className="mt-2 text-gray-700 leading-relaxed">
            Utilizamos cookies para melhorar a experiência do usuário, personalizar
            conteúdo, analisar tráfego e garantir o funcionamento adequado do sistema.
            Você pode desativar os cookies nas configurações do seu navegador.
          </p>
        </section>

        {/* DADOS */}
        <section className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900">
            2. Coleta de Dados
          </h2>

          <p className="mt-2 text-gray-700 leading-relaxed">
            Podemos coletar informações como nome, e-mail e dados de navegação
            quando fornecidos voluntariamente pelo usuário ou automaticamente
            durante o uso da plataforma.
          </p>
        </section>

        {/* USO */}
        <section className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900">
            3. Uso das Informações
          </h2>

          <p className="mt-2 text-gray-700 leading-relaxed">
            As informações coletadas são utilizadas para melhorar nossos serviços,
            oferecer suporte, personalizar experiência e garantir segurança.
          </p>
        </section>

        {/* SEGURANÇA */}
        <section className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900">
            4. Segurança dos Dados
          </h2>

          <p className="mt-2 text-gray-700 leading-relaxed">
            Adotamos medidas técnicas e organizacionais para proteger os dados
            contra acesso não autorizado, alteração ou destruição indevida.
          </p>
        </section>

        {/* DIREITOS */}
        <section className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900">
            5. Direitos do Usuário
          </h2>

          <p className="mt-2 text-gray-700 leading-relaxed">
            O usuário pode solicitar acesso, alteração ou exclusão de seus dados
            pessoais a qualquer momento, conforme a legislação vigente.
          </p>
        </section>

        {/* CONTATO */}
        <section className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900">
            6. Contato
          </h2>

          <p className="mt-2 text-gray-700 leading-relaxed">
            Se tiver dúvidas sobre esta Política de Privacidade, entre em contato
            através dos nossos canais de suporte.
          </p>
        </section>

        {/* FOOTER */}
        <footer className="mt-10 pt-6 border-t text-sm text-gray-500">
          © {new Date().getFullYear()} - Todos os direitos reservados.
        </footer>
      </div>
    </main>
  )
}