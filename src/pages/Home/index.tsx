import {
  About,
  // AdjectsSection,
  Coments,
  Contacts,
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
      <Portifolio />
      {/* <AdjectsSection /> */}
      <Coments />

      <InstagramSection />
      <Contacts />
      <WhatsappButton />
    </main>
  )
}


