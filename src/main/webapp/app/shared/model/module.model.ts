import { IUserInfo } from 'app/shared/model/user-info.model';
import { IProject } from 'app/shared/model/project.model';

export interface IModule {
  id?: number;
  name?: string;
  description?: string | null;
  userInfo?: IUserInfo | null;
  project?: IProject | null;
}

export const defaultValue: Readonly<IModule> = {};
