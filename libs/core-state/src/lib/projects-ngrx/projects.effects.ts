import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';
import { map } from 'rxjs/operators';

import * as projectsActions from './projects.actions';
import { ProjectsFacade } from './projects.facade';
import {
  Project,
  ProjectsService,
  NotifyService
} from '@ngrx-projects/core-data';
import { ProjectsPartialState } from './projects.reducer';

@Injectable()
export class ProjectsEffect {
  loadProjects$ = createEffect(() =>
    this.dataPersistence.fetch(projectsActions.loadProjects, {
      run: (
        action: ReturnType<typeof projectsActions.loadProjects>,
        state: ProjectsPartialState
      ) => {
        return this.projectsService
          .all()
          .pipe(
            map((projects: Project[]) =>
              projectsActions.projectsLoaded({ projects })
            )
          );
      },
      onError: (
        action: ReturnType<typeof projectsActions.loadProjects>,
        error
      ) => {
        this.notify.notification('Effect Load All Error', error);
      }
    })
  );

  loadProject$ = createEffect(() =>
    this.dataPersistence.fetch(projectsActions.loadProject, {
      run: (
        action: ReturnType<typeof projectsActions.loadProject>,
        state: ProjectsPartialState
      ) => {
        return this.projectsService
          .findOne(action.project)
          .pipe(
            map((project: Project) =>
              projectsActions.projectLoaded({ project })
            )
          );
      },
      onError: (
        action: ReturnType<typeof projectsActions.loadProject>,
        error
      ) => {
        this.notify.notification('Effect Load Error:', error);
      }
    })
  );

  selectProjectOnLoad$ = createEffect(() =>
    this.dataPersistence.actions.pipe(
      ofType(projectsActions.projectLoaded),
      map(({ project }) =>
        projectsActions.projectSelected({ selectedProjectId: project.id })
      )
    )
  );

  createProject$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(projectsActions.createProject, {
      run: (
        action: ReturnType<typeof projectsActions.createProject>,
        state: ProjectsPartialState
      ) => {
        return this.projectsService.create(action.project).pipe(
          map((project: Project) =>
            projectsActions.projectCreated({ project })
          ),
          // tap(() => this.projectsFacade.loadProjects())
        );
      },
      onError: (
        action: ReturnType<typeof projectsActions.createProject>,
        error
      ) => {
        this.notify.notification('Effect Create Error:', error);
      }
    })
  );

  updateProject$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(projectsActions.updateProject, {
      run: (
        action: ReturnType<typeof projectsActions.updateProject>,
        state: ProjectsPartialState
      ) => {
        return this.projectsService.update(action.project).pipe(
          map((project: Project) =>
            projectsActions.projectUpdated({ project })
          ),
          // tap(() => this.projectsService.all())
        );
      },
      onError: (
        action: ReturnType<typeof projectsActions.updateProject>,
        error
      ) => {
        this.notify.notification('Effect Update Error:', error);
      }
    })
  );

  deleteProject$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(projectsActions.deleteProject, {
      run: (
        action: ReturnType<typeof projectsActions.deleteProject>,
        state: ProjectsPartialState
      ) => {
        return this.projectsService
          .delete(action.project)
          .pipe(
            map(() =>
              projectsActions.projectDeleted({ project: action.project })
            )
          );
      },
      onError: (
        action: ReturnType<typeof projectsActions.deleteProject>,
        error
      ) => {
        this.notify.notification('Effect Delete Error:', error);
      }
    })
  );

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<ProjectsPartialState>,
    private projectsService: ProjectsService,
    private projectsFacade: ProjectsFacade,
    private notify: NotifyService
  ) {}
}
