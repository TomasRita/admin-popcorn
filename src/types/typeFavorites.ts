export type InstitutionType = "All" | "Hospital" | "UBS" | "Samu" | "Farmacia";
export type VehicleType = "All" | "Aberto" | "Aguardando";

// Defina a interface das opções
export interface FilterOption {
  value: string;
  label: string;
}


export type VehicleStatus = "Aberto" | "Fechado" | "Aguardando";

export interface VehicleItem {
  id: number;
  nomeInstituicao: string;
  tipoAtividade:  string;
  dataHora: string;
  status: VehicleStatus;
}
