export interface ApiResponse<T> {
  ok: true;
  statusCode: number;
  message: string;
  data: T;
}
