import type { BasicData } from "~/common/interfaces/data";

export interface IUserRole extends BasicData {
  name: string;
}

export interface IUser extends BasicData {
  username: string;
  role: IUserRole;
}

export interface IUserStaff {
  nama: string;
  nip: string;
  alamat: string | null;
  noTelp: string | null;
  userId: number;
  user: Omit<IUser, "createdAt" | "updatedAt">;
}

export interface IUserStudent {
  nama: string;
  nim: string;
  alamat: string | null;
  noTelp: string | null;
  userId: number;
  user: Omit<IUser, "createdAt" | "updatedAt">;
}

export interface IUserStore {
  user: IUser;
}
