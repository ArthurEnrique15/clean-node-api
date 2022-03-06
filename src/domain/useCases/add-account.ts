import { AccountModel } from "../models/account";

// ? DTO?
export interface AddAccountModel {
  name: string;
  email: string;
  password: string;
}

export interface AddAccount {
  add: (account: AddAccountModel) => AccountModel;
}
