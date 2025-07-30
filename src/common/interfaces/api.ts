export interface ApiResponse<T> {
  ok: true;
  statusCode: number;
  message: string;
  data: T;
}

export interface PaginationResponse<T extends object> {
  pageInfo: {
    hasNextPage: boolean;
    nextPage?: number;
  };
  nodes: T[];
  totalCount: number;
}
