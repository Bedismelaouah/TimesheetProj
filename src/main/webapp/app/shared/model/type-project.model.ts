import { IProject } from 'app/shared/model/project.model';

export interface ITypeProject {
  id?: number;
  type?: string | null;
  projects?: IProject[] | null;
}

export const defaultValue: Readonly<ITypeProject> = {};
