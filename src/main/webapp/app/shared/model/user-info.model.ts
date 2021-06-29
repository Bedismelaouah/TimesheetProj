import { IRole } from 'app/shared/model/role.model';
import { IModule } from 'app/shared/model/module.model';

export interface IUserInfo {
  id?: number;
  firstname?: string | null;
  lastname?: string | null;
  email?: string | null;
  phone?: string | null;
  roles?: IRole[] | null;
  modules?: IModule[] | null;
}

export const defaultValue: Readonly<IUserInfo> = {};
