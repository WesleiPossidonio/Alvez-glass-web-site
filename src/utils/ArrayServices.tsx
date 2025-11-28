import {
  DoorOpen,
  LayoutPanelLeft,
  PanelBottom,
  Ruler,
  Wind,
  ShieldCheck,
  Grid,
  Square,
  BarChart2,
  TreeDeciduous,
  HardDrive,
  Lock,
  Bug,
  Sun
} from "lucide-react";

export type CarouselItemType = {
  id: number;
  name: string;
  text: string;
  icon: React.ReactNode;
  link_image: string;
  whatsapp: string;
};

const whatsappBase = "https://wa.me/22981445335?text=";

const makeMessage = (service: string) =>
  encodeURIComponent(`Olá! Tenho interesse no serviço de ${service}. Pode me enviar mais informações?`);

import Vidros from '@/assets/Porta de vidro para sala_ 9 modelos para se inspirar.jpeg'
import Esquadrilha from '@/assets/esquadrilahs.jpeg'
import Moveis from '@/assets/moveis-planejados.jpeg'
import Espelho from '@/assets/espelho.jpeg'
import Corrimao from '@/assets/vista-da-estrutura-construida-da-escada_1048944-4472968.jpg'
import Mosquiteiro from '@/assets/tela-mosquiteiro-.jpg'
import Sacada from '@/assets/sacada.jpeg'
import Gradil from '@/assets/Gradil.jpg'
import Portas from '@/assets/PortasECM.jpg'
import GuardaCopo from '@/assets/Guarda-copo.jpg'
import Insulfilm from '@/assets/Insulfilm Jateado Residencial.jpeg'
import Pergolado from '@/assets/pergolado.jpeg'
import PeledeVidro from '@/assets/pele de vidro.jpg'
import inox from '@/assets/inox.jpeg'


export const carouselItems: CarouselItemType[] = [
  {
    id: 1,
    name: "Esquadrias de Alumínio",
    text: "Portas, janelas e fachadas em alumínio sob medida, com resistência, durabilidade e design moderno.",
    icon: <DoorOpen className="text-neutral-700 size-14" />,
    link_image: Esquadrilha,
    whatsapp: whatsappBase + makeMessage("Esquadrias de Alumínio"),
  },
  {
    id: 2,
    name: "Móveis Planejados",
    text: "Ambientes funcionais e sofisticados, personalizados de acordo com seu estilo e necessidade.",
    icon: <LayoutPanelLeft className="text-neutral-700 size-14" />,
    link_image: Moveis,
    whatsapp: whatsappBase + makeMessage("Móveis Planejados"),
  },
  {
    id: 3,
    name: "Vidros em Geral",
    text: "Vidros de diferentes modelos e acabamentos para residências, comércios e escritórios, trazendo leveza e elegância.",
    icon: <PanelBottom className="text-neutral-700 size-14" />,
    link_image: Vidros,
    whatsapp: whatsappBase + makeMessage("Vidros em Geral"),
  },
  {
    id: 4,
    name: "Portas em ACM",
    text: "Acabamento premium, alta durabilidade e modernidade para entradas e fachadas.",
    icon: <Ruler className="text-neutral-700 size-14" />,
    link_image: Portas,
    whatsapp: whatsappBase + makeMessage("Portas em ACM"),
  },
  {
    id: 5,
    name: "Película Inteligente",
    text: "Controle de luminosidade e privacidade instantânea com tecnologia de ponta em vidros.",
    icon: <Sun className="text-neutral-700 size-14" />,
    link_image: Vidros,
    whatsapp: whatsappBase + makeMessage("Película Inteligente"),
  },
  {
    id: 6,
    name: "Envidraçamento de Sacadas",
    text: "Proteção térmica e acústica, valorizando seu espaço e permitindo aproveitar a varanda em qualquer clima.",
    icon: <Wind className="text-neutral-700 size-14" />,
    link_image: Sacada,
    whatsapp: whatsappBase + makeMessage("Envidraçamento de Sacadas"),
  },
  {
    id: 7,
    name: "Guarda-Corpo",
    text: "Segurança e sofisticação para sacadas, escadas e varandas, com materiais resistentes e design elegante.",
    icon: <ShieldCheck className="text-neutral-700 size-14" />,
    link_image: GuardaCopo,
    whatsapp: whatsappBase + makeMessage("Guarda-Corpo"),
  },
  {
    id: 8,
    name: "Pele de Vidro",
    text: "Fachadas envidraçadas modernas, que garantem beleza, iluminação natural e valorização arquitetônica.",
    icon: <Grid className="text-neutral-700 size-14" />,
    link_image: PeledeVidro,
    whatsapp: whatsappBase + makeMessage("Pele de Vidro"),
  },
  {
    id: 9,
    name: "Espelhos",
    text: "Espelhos sob medida para ampliar espaços, decorar ambientes e trazer sofisticação.",
    icon: <Square className="text-neutral-700 size-14" />,
    link_image: Espelho,
    whatsapp: whatsappBase + makeMessage("Espelhos"),
  },
  {
    id: 10,
    name: "Corrimão",
    text: "Durabilidade e segurança com acabamentos modernos em inox, vidro ou alumínio.",
    icon: <BarChart2 className="text-neutral-700 size-14" />,
    link_image: Corrimao,
    whatsapp: whatsappBase + makeMessage("Corrimão"),
  },
  {
    id: 11,
    name: "Pergolado",
    text: "Estruturas modernas e aconchegantes, ideais para áreas externas de lazer e descanso.",
    icon: <TreeDeciduous className="text-neutral-700 size-14" />,
    link_image: Pergolado,
    whatsapp: whatsappBase + makeMessage("Pergolado"),
  },
  {
    id: 12,
    name: "Inox",
    text: "Soluções em inox que aliam resistência, durabilidade e acabamento sofisticado para diversos projetos.",
    icon: <HardDrive className="text-neutral-700 size-14" />,
    link_image: inox,
    whatsapp: whatsappBase + makeMessage("Inox"),
  },
  {
    id: 13,
    name: "Gradil",
    text: "Segurança e praticidade em cercamentos, com design que harmoniza proteção e estética.",
    icon: <Lock className="text-neutral-700 size-14" />,
    link_image: Gradil,
    whatsapp: whatsappBase + makeMessage("Gradil"),
  },
  {
    id: 14,
    name: "PVC",
    text: "Janelas e portas em PVC de alta performance, com isolamento acústico e resistência às intempéries.",
    icon: <Wind className="text-neutral-700 size-14" />,
    link_image: Portas,
    whatsapp: whatsappBase + makeMessage("PVC"),
  },
  {
    id: 15,
    name: "Tela de Mosquiteiro",
    text: "Proteção contra insetos sem perder a ventilação e a claridade dos ambientes.",
    icon: <Bug className="text-neutral-700 size-14" />,
    link_image: Mosquiteiro,
    whatsapp: whatsappBase + makeMessage("Tela de Mosquiteiro"),
  },
  {
    id: 16,
    name: "Insulfilm",
    text: "Redução de calor, proteção solar e mais privacidade para vidros residenciais e comerciais.",
    icon: <Sun className="text-neutral-700 size-14" />,
    link_image: Insulfilm,
    whatsapp: whatsappBase + makeMessage("Insulfilm"),
  },
];
