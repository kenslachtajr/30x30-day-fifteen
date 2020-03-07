import { Injectable } from '@angular/core';
import { Action, select, Store, ActionsSubject } from '@ngrx/store';
import { filter } from 'rxjs/operators';

import * as fromProjects from './projects.reducer';
import * as projectsActions from './projects.actions';
import * as projectsSelectors from './projects.selector';
import { Project } from '@ngrx-projects/core-data';

@Injectable({
  providedIn: 'root'
})
export class ProjectsFacade {
  allProjects$ = this.store.pipe(select(projectsSelectors.selectAllProjects));
  selectedProject$ = this.store.pipe(select(projectsSelectors.selectProject));
  projectLoading$ = this.store.pipe(
    select(projectsSelectors.selectProjectsLoading)
  );
  mutations$ = this.actions$.pipe(
    filter(
      (action: Action) =>
        action.type === projectsActions.createProject({} as any).type ||
        action.type === projectsActions.updateProject({} as any).type ||
        action.type === projectsActions.deleteProject({} as any).type
    )
  );

  constructor(
    private actions$: ActionsSubject,
    private store: Store<fromProjects.ProjectsPartialState>
  ) {}

  selectProject(selectedProjectId: string | number) {
    this.dispatch(projectsActions.projectSelected({ selectedProjectId }));
  }

  loadProjects() {
    this.dispatch(projectsActions.loadProjects());
  }

  loadProject(project: Project) {
    this.dispatch(projectsActions.loadProject({ project }));
  }

  createProject(project: Project) {
    this.dispatch(projectsActions.createProject({ project }));
  }

  updateProject(project: Project) {
    this.dispatch(projectsActions.updateProject({ project }));
  }

  deleteProject(project: Project) {
    this.dispatch(projectsActions.deleteProject({ project }));
  }

  private dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
