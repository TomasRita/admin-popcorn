import { History, Eye, Star, Users, Handshake, Wrench } from "lucide-react";
import background_image1 from "../assets/image/img.png";
export const franchises = [
  {
    title: "KADOSH BURGER",
    photo: background_image1,
    totalRevenue: "AOA 1.256.000",
    investment: "AOA 2.500.000",
    investmentMax: "AOA 3.000",
    daysRemaining: 2,
    deadline: "20/05/2025", // Example deadline (2 days from May 18, 2025)
  },
  {
    title: "KADOSH BURGER",
    photo: background_image1,
    totalRevenue: "AOA 1.256.000",
    investment: "AOA 2.500.000",
    investmentMax: "AOA 3.000",
    daysRemaining: 2,
    deadline: "20/05/2025",
  },
  {
    title: "KADOSH BURGER",
    photo: background_image1,
    totalRevenue: "AOA 1.256.000",
    investment: "AOA 2.500.000",
    investmentMax: "AOA 3.000",
    daysRemaining: 2,
    deadline: "20/05/2025",
  },
  {
    title: "KADOSH BURGER",
    photo: background_image1,
    totalRevenue: "AOA 1.256.000",
    investment: "AOA 2.500.000",
    investmentMax: "AOA 3.000",
    daysRemaining: 2,
    deadline: "20/05/2025",
  },
];
export const cardsData = [
  {
    title: "Acesso Simples",
    text: "Acesse o mapa diretamente pelo site ou aplicativo expoControll",
    text2:
      "Utilize uma interface intuitiva para monitorar e gerenciar sua frota de veículos.",
  },
  {
    title: "Filtros Inteligentes",
    text: "Filtre seus veículos por status, tipo e localização em tempo real.",
    text2: "Encontre rapidamente o veículo que precisa acompanhar.",
  },
  {
    title: "Localização em Tempo Real",
    text: "Monitore a posição dos seus veículos com precisão 24/7.",
    text2:
      "Visualize rotas, velocidades e históricos para um gerenciamento eficiente.",
  },
  {
    title: "Controle Remoto",
    text: "Envie comandos para bloquear e gerenciar seus veículos à distância.",
    text2: "Garanta segurança e eficiência com ações instantâneas.",
  },
];

export const steps = [
  {
    id: 1,
    title: "Registe‑se",
    description:
      "Primeiro, você precisa criar um perfil de marca/criador de conteúdo",
    position: "left-0 top-1/4 transform -translate-y-1/2",
    bgColor: "bg-teal-500 text-white",
  },
  {
    id: 2,
    title: "Criar um Portfólio",
    description: "Segundo, crie um portfólio público ou privado na Plataforma",
    position: "right-0 top-1/4 transform -translate-y-1/2",
    bgColor: "bg-blue-900 text-white",
  },
  {
    id: 3,
    title: "Candidatura/Aplicação",
    description:
      "Terceiro, crie um serviço e disponibilize para os criadores. E os criadores vão se candidatar ao serviço",
    position: "left-0 bottom-1/4 transform translate-y-1/2",
    bgColor: "bg-blue-900 text-white",
  },
  {
    id: 4,
    title: "Aprovação e Validação",
    description: "Quarto, aprovação e negociação de contrato",
    position: "right-0 bottom-1/4 transform translate-y-1/2",
    bgColor: "bg-blue-900 text-white",
  },
];
// src/data/siteContent.ts

import burgerKingLogo from "../assets/image/images.png";
// importe aqui as outras imagens quando tiver

export interface Franchise {
  name: string;
  description: string;
  revenue: string;
  logo?: string;
}

export interface Section<T = any> {
  title: string;
  subtitle?: string;
  items: T[];
}

export const novidadesFranquiasItems: Franchise[] = [
  {
    name: "BURGER KING",
    description:
      "Burger King, muitas vezes abreviado como BK, é uma rede de restaurantes especializada em fast-food, fundada nos Estados Unidos por James McLamore e David Edgerton, que abriram a primeira unidade em Miami, Flórida.",
    revenue: "1.256.000",
    logo: burgerKingLogo,
  },
  {
    name: "O BOTICÁRIO",
    description:
      "Uma renomada rede de cosméticos brasileira, conhecida por seus produtos de beleza e cuidados pessoais.",
    revenue: "850.000",
    logo: burgerKingLogo,
  },
  {
    name: "AMBEV EXPRESS",
    description:
      "Uma franquia de bebidas que oferece soluções rápidas e eficientes para distribuição de produtos Ambev.",
    revenue: "1.100.000",
    logo: burgerKingLogo,
  },
  {
    name: "MCDONALD'S",
    description:
      "Uma das maiores redes de fast-food do mundo, famosa por seus hambúrgueres e serviços globais.",
    revenue: "2.000.000",
    logo: burgerKingLogo,
  },
];

export const novidadesFranquiasSection: Section<Franchise> = {
  title: "Novidades de Franquias",
  subtitle:
    "Invista em uma franquia de sucesso comprovado e cresça junto com a marca",
  items: novidadesFranquiasItems,
};

export const cardsAbout = [
  {
    title: "NOSSA HISTÓRIA",
    text: "O expoControll nasceu da necessidade de conectar cidadãos angolanos às instituições públicas e serviços essenciais de forma eficiente. Fundado com o propósito de eliminar barreiras e facilitar o acesso a informações confiáveis, a plataforma se tornou indispensável para quem busca praticidade e agilidade no dia a dia.",
    icon: History,
  },
  {
    title: "NOSSA MISSÃO E VISÃO",
    text: "Facilitar o acesso aos serviços essenciais e promover a inclusão digital, empoderando os cidadãos angolanos com tecnologia acessível e eficiente. Ser a principal ponte entre instituições públicas e privadas e a população em Angola, promovendo um futuro onde os serviços sejam acessíveis a todos.",
    icon: Eye,
  },
  {
    title: "NOSSOS VALORES",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc vel blandit convallis, purus sapien bibendum est, at ullamcorper lorem sapien non sem.",
    icon: Star,
  },
  {
    title: "O QUE FAZEMOS",
    text: "Inovação: Utilizamos tecnologia de ponta para criar soluções práticas. Acessibilidade: Tornamos serviços essenciais acessíveis a todos. Transparência: Garantimos informações claras e confiáveis. Compromisso Social: Focamos no bem-estar e no desenvolvimento da sociedade angolana.",
    icon: Wrench,
  },
  {
    title: "NOSSA EQUIPE",
    text: "O expoControll oferece uma plataforma digital intuitiva e acessível que permite aos cidadãos buscar informações detalhadas, localizar instituições públicas e privadas, e agendar serviços essenciais. Nosso objetivo é transformar a forma como as pessoas interagem com as instituições, proporcionando uma experiência simplificada e eficiente.",
    icon: Users,
  },
  {
    title: "PARCEIROS E ESTRUTURAÇÃO",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc vel blandit convallis, purus sapien bibendum est, at ullamcorper lorem sapien non sem. Destaques: atualizações constantes sobre serviços essenciais, mapa interativo para localizar instituições e agendamento online de serviços.",
    icon: Handshake,
  },
];

// Define a simple Notification interface
export interface Notification {
  title: string;
  description: string;
  id_user: number;
  id_notification: number;
  created_in: string;
  read: boolean;
}

export interface Contact {
  id_contact: number;
  email: string;
  name: string;
  description: string;
  created_in: string;
  updated_in: string;
}
export interface ContactsResponse {
  result: Contact[];
  code: number;
  message: string;
}
// src/types/user.ts
export interface User {
  id: number;
  name: string;
  email: string;
  gender: string;
  license: string;
  expirationDate: string; // “yyyy-mm-dd” ou “dd-mm-yyyy”
  isBlocked: boolean;
}
export interface UserSectionProps {
  userData?: UserResult;
}
export interface User {
  id_user: number;
  name: string;
  email: string;
  telephone: string;
  photo: string;
  gender: string;
  path: string;
  password: string;
  type: number;
  latitude: string;
  longitude: string;
  created_in: string;
  access_token: string;
  Settings: {
    language: string;
    id_user: number;
    location: string;
    id_setting: number;
    theme: number;
  };
}

export interface Settings {
  language: string;
  id_user: number;
  location: string;
  id_setting: number;
  theme: number;
}

export interface UserResult {
  name: string;
  email: string;
  telephone: string;
  photo: string;
  gender: string;
  path: string;
  password: string;
  type: number;
  id_user: number;
  latitude: string;
  longitude: string;
  created_in: string;
  access_token: string;
  Settings: Settings;
}

// src/types/profile.ts
