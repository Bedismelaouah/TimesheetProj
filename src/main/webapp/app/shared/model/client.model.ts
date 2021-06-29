import { IProject } from 'app/shared/model/project.model';

export interface IClient {
  id?: number;
  firstname?: string | null;
  lastname?: string | null;
  email?: string | null;
  phone?: string | null;
  projects?: IProject[] | null;
}

export const defaultValue: Readonly<IClient> = {};
