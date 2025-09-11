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
};

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
  },
  {
    id: 2,
    name: "Móveis Planejados",
    text: "Ambientes funcionais e sofisticados, personalizados de acordo com seu estilo e necessidade.",
    icon: <LayoutPanelLeft className="text-neutral-700 size-14" />,
    link_image: Moveis,
  },
  {
    id: 3,
    name: "Vidros em Geral",
    text: "Vidros de diferentes modelos e acabamentos para residências, comércios e escritórios, trazendo leveza e elegância.",
    icon: <PanelBottom className="text-neutral-700 size-14" />,
    link_image: Vidros,
  },
  {
    id: 4,
    name: "Portas em ACM",
    text: "Acabamento premium, alta durabilidade e modernidade para entradas e fachadas.",
    icon: <Ruler className="text-neutral-700 size-14" />,
    link_image: Portas,
  },
  {
    id: 5,
    name: "Película Inteligente",
    text: "Controle de luminosidade e privacidade instantânea com tecnologia de ponta em vidros.",
    icon: <Sun className="text-neutral-700 size-14" />,
    link_image: Vidros,
  },
  {
    id: 6,
    name: "Envidraçamento de Sacadas",
    text: "Proteção térmica e acústica, valorizando seu espaço e permitindo aproveitar a varanda em qualquer clima.",
    icon: <Wind className="text-neutral-700 size-14" />,
    link_image: Sacada,
  },
  {
    id: 7,
    name: "Guarda-Corpo",
    text: "Segurança e sofisticação para sacadas, escadas e varandas, com materiais resistentes e design elegante.",
    icon: <ShieldCheck className="text-neutral-700 size-14" />,
    link_image: GuardaCopo,
  },
  {
    id: 8,
    name: "Pele de Vidro",
    text: "Fachadas envidraçadas modernas, que garantem beleza, iluminação natural e valorização arquitetônica.",
    icon: <Grid className="text-neutral-700 size-14" />,
    link_image: PeledeVidro,
  },
  {
    id: 9,
    name: "Espelhos",
    text: "Espelhos sob medida para ampliar espaços, decorar ambientes e trazer sofisticação.",
    icon: <Square className="text-neutral-700 size-14" />,
    link_image: Espelho,
  },
  {
    id: 10,
    name: "Corrimão",
    text: "Durabilidade e segurança com acabamentos modernos em inox, vidro ou alumínio.",
    icon: <BarChart2 className="text-neutral-700 size-14" />,
    link_image: Corrimao,
  },
  {
    id: 11,
    name: "Pergolado",
    text: "Estruturas modernas e aconchegantes, ideais para áreas externas de lazer e descanso.",
    icon: <TreeDeciduous className="text-neutral-700 size-14" />,
    link_image: Pergolado,
  },
  {
    id: 12,
    name: "Inox",
    text: "Soluções em inox que aliam resistência, durabilidade e acabamento sofisticado para diversos projetos.",
    icon: <HardDrive className="text-neutral-700 size-14" />,
    link_image: inox,
  },
  {
    id: 13,
    name: "Gradil",
    text: "Segurança e praticidade em cercamentos, com design que harmoniza proteção e estética.",
    icon: <Lock className="text-neutral-700 size-14" />,
    link_image: Gradil,
  },
  {
    id: 14,
    name: "PVC",
    text: "Janelas e portas em PVC de alta performance, com isolamento acústico e resistência às intempéries.",
    icon: <Wind className="text-neutral-700 size-14" />, // Changed Window to Wind
    link_image: Portas,
  },
  {
    id: 15,
    name: "Tela de Mosquiteiro",
    text: "Proteção contra insetos sem perder a ventilação e a claridade dos ambientes.",
    icon: <Bug className="text-neutral-700 size-14" />,
    link_image: Mosquiteiro,
  },
  {
    id: 16,
    name: "Insulfilm",
    text: "Redução de calor, proteção solar e mais privacidade para vidros residenciais e comerciais.",
    icon: <Sun className="text-neutral-700 size-14" />,
    link_image: Insulfilm,
  },
];
