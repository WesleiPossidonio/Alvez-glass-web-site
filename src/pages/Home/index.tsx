import {
  About,
  CallAction,
  // AdjectsSection,
  Coments,
  Contacts,
  Footer,
  Header,
  Hero,
  InstagramSection,
  Portifolio,
  ServicesSection,
  WhatsappButton
} from "./components"

export const Home = () => {
  return (
    <main className="w-full mx-0 ml-auto">
      <Header />
      <Hero />
      <About />
      <ServicesSection />
      <CallAction />
      {/* <AdjectsSection /> */}
      <Portifolio />
      <Coments />
      <InstagramSection />
      <Contacts />
      <Footer />
      <WhatsappButton />
    </main>
  )
}


