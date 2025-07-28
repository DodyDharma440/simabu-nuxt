export interface BasicData<I = number> {
  id: I;
  createdAt?: string | null;
  updatedAt?: string | null;
  deletedAt?: string | null;
}
