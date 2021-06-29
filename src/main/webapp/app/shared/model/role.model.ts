import { IUserInfo } from 'app/shared/model/user-info.model';

export interface IRole {
  id?: number;
  role?: string | null;
  userInfo?: IUserInfo | null;
}

export const defaultValue: Readonly<IRole> = {};
