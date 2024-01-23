export interface Filter {
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
  search?: string;
  pageNumber: number;
  pageSize: number;
  searchFields?: any;
}
