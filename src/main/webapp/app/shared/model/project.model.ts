import { IModule } from 'app/shared/model/module.model';
import { IClient } from 'app/shared/model/client.model';
import { ITypeProject } from 'app/shared/model/type-project.model';

export interface IProject {
  id?: number;
  projectName?: string | null;
  modules?: IModule[] | null;
  client?: IClient | null;
  typeProject?: ITypeProject | null;
}

export const defaultValue: Readonly<IProject> = {};
