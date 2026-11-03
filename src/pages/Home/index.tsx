import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import { 
  About, 
  CallAction, 
  Coments, 
  Contacts, 
  Footer, 
  Header, 
  Hero, 
  InstagramSection, 
  Portifolio, 
  ServicesSection, 
  WhatsappButton 
} from "./components";

export const Home = () => {
  useEffect(() => {
    Aos.init({
      duration: 700,
      once: true,
      offset: 60,
      easing: "ease-out",
    });
  }, []);

  return (
    <main className="w-full min-w-0">
      <Header />
      <Hero />
      <About />
      <ServicesSection />
      <CallAction />
      <Portifolio />
      <Coments />
      <InstagramSection />
      <Contacts />
      <Footer />
      <WhatsappButton />
    </main>
  );
};