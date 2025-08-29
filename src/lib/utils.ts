//Função para formatação de datas
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function formatDate(date: string) {
  return new Intl.DateTimeFormat("pt-BR").format(new Date(date));
}

// Função para extrair a data válida do campo publishedAt
export const parseDate = (dateString: string): string => {
  const match = dateString.match(/(\d{4}-\d{2}-\d{2})/);
  if (match) {
    return new Date(match[1]).toLocaleDateString();
  }
  return dateString;
};
export const truncateText = (
  text: string,
  maxLength: number = 25,
  position: "start" | "middle" | "end" = "middle"
) => {
  if (text.length <= maxLength) return text;

  if (position === "start") {
    return `...${text.slice(-maxLength)}`;
  } else if (position === "end") {
    return `${text.slice(0, maxLength)}...`;
  } else {
    const halfLength = Math.floor(maxLength / 2);
    return `${text.slice(0, halfLength)}...${text.slice(-halfLength)}`;
  }
};

export const getBase64ImageFromUrl = (url: string): Promise<string> => {
  return fetch(url)
    .then((response) => response.blob())
    .then(
      (blob) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        })
    );
};

// Por exemplo, em um arquivo utils/roles.ts ou diretamente no componente

export function getEntityName(type: number): string {
  switch (type) {
    case 0:
      return "Administrador Central";
    case 1:
      return "Administrador de Setor";
    case 2:
      return "Administrador de Instituição";
    case 3:
      return "Funcionário de Call Center";
    case 4:
      return "Funcionário de Marketing";
    case 5:
      return "Usuário";
    default:
      return "Usuário";
  }
}
