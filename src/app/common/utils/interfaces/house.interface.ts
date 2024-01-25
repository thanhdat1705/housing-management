export interface HouseFilter {
  block_number: string;
  house_number: string;
  land_number: string;
  sortBy?: string;
  sortDirection?: string;
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

export interface House {
  id: string;
  model: string;
  title: string;
  description: string;
  banner: string;
  video: string;
  data: HouseData[];
}

export interface HouseData extends HouseInfor {
  id: string;
}
