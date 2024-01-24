export interface HouseFilter {
  search: string;
  sortBy?: string;
  sortDirection?: string;
}

export interface House {
  id: string;
  type: string;
  attributes: HouseInfor;
  // links: string;
}

export interface HouseInfor {
  house_number: string;
  price: number;
  block_number: string;
  land_number: string;
  house_type: string;
  model: string;
  status: string;
}

export interface BaseHouse<T> {
  id?: string;
  type: string;
  attributes: T;
  // links: string;
}

export interface HouseModel {
  id: number;
  model: string;
  media: HouseModelInfor;
}

export interface HouseModelInfor {
  title: string;
  description: string;
  banner: string;
  video: string;
}
