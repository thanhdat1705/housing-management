export interface CommonResponse<T> {
  // message: string;
  // isSuccess: boolean;
  // errorCode: string;
  data: T;
}

export interface PaginationResponse<T> {
  pageIndex: number;
  pageSize: number;
  count: number;
  data: T;
}

export interface QueryListResponse<T>
  extends CommonResponse<PaginationResponse<T>> {
  data: {
    pageIndex: number;
    pageSize: number;
    count: number;
    data: T;
  };
}
