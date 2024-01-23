export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

export interface LocationFilter {
  search: string;
  state?: string;
  availableUnits?: number;
  sortBy?: string;
  sortDirection?: string;
}

export interface Location {
  availableUnits: number;
  city: string;
  id: string;
  laundry: boolean;
  name: string;
  state: string;
  wifi: boolean;
  photo?: string;
}
