import type { IUserStaff, IUserStudent } from "~/modules/user/interfaces";

export interface ILoginInput {
  username: string;
  password: string;
  remember: boolean;
}

export interface IUserStoreState {
  userData: IUserStaff | IUserStudent | null;
}
