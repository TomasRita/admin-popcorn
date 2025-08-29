// ------------------------------------------Marketplace-------------------------------------------

export interface Offer {
  lotes: string;
  grupo: string;
  precoPorLote: string; // Required property
  total: string;
}
export interface OfferTableProps {
  title: string;
  search: string;
  filter: string;
  onBuyClick: (offer: {
    pricePerLot: string;
    totalOrder: string;
    profitPerAction: string;
    quantity: number;
    deadline: string;
  }) => void;
}

// ------------------------------------------FranchiseGuide-------------------------------------------
export interface CategoryOption {
  label: string;
  value: string;
}
export interface CategoryWithSubs extends CategoryOption {
  subcategories: CategoryOption[];
}
export interface OfferFranchise {
  id: string;
  logoUrl: string;
  title: string;
  category: string;
  subcategory?: string;
  subtitle?: string;
  goal: string;
  minInvestment: string;
  isPopular?: boolean;
  description: string;
}
// ------------------------------------------Startup-------------------------------------------
export interface FormStartup {
  title: string;
  photo: string;
  totalRevenue: string;
  investment: string;
  investmentMax: string;
  daysRemaining: number;
  deadline: string;
}
// ------------------------------------------Launch-------------------------------------------

export interface LaunchItemProps {
  id: string;
  name: string;
  photo:string;
  status: "disponivel" | "depositado";
  onClick?: () => void;
}