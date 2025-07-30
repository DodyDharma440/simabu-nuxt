import type { BasicData } from "~/common/interfaces/data";

export interface IUserRole extends BasicData {
  name: string;
}

export interface IUser extends BasicData {
  username: string;
  role: IUserRole;
  roleId?: string;
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
  programStudiId: number;
  programStudi?: IStudyProgram;
}

export interface IUserStore {
  user: IUser;
}

export interface IStudyProgram extends BasicData {
  nama: string;
  namaSingkat: string;
}

export interface IUserStaffInput
  extends Omit<IUserStaff, keyof BasicData | "userId" | "user">,
    Pick<IUser, "username" | "roleId"> {
  password?: string;
}

export interface IUserStudentInput
  extends Omit<
    IUserStudent,
    keyof BasicData | "userId" | "user" | "programStudi"
  > {
  password?: string;
}
