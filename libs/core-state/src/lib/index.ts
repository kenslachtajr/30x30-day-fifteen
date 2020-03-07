import { ActionReducerMap } from '@ngrx/store';
import * as fromProjects from './projects-ngrx/projects.reducer';

export interface AppState {
  projects: fromProjects.ProjectsState;
}

export const reducers: ActionReducerMap<AppState> = {
  projects: fromProjects.reducer
};

export const defaultState: AppState = {
  projects: { ids: [] } as fromProjects.ProjectsState
};
