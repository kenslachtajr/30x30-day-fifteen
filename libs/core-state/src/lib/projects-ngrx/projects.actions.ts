import { createAction, props } from '@ngrx/store';
import { Project } from '@ngrx-projects/core-data';

export const projectSelected = createAction(
  '[PROJECT] Project Selected',
  props<{ selectedProjectId: string | number }>()
);

export const loadProjects = createAction('[PROJECT] Load Projects');

export const projectsLoaded = createAction(
  '[PROJECT] Projects Loaded',
  props<{ project: Project }>()
);

export const loadProject = createAction(
  '[PROJECT] Load Project',
  props<{project: Project}>()
);

export const projectLoaded = createAction(
  '[PROJECT] Project Loaded',
  props<{project: Project}>()
);

export const createProject = createAction(
  '[PROJECT] Create Projet',
  props<{ project: Project }>()
);

export const projectCreated = createAction(
  '[PROJECT] Project Created',
  props<{ project: Project }>()
);

export const updateProject = createAction(
  '[PROJECT] Update Project',
  props<{ project: Project }>()
);

export const projectUpdated = createAction(
  '[PROJECT] Project Updated',
  props<{ project: Project }>()
);

export const deleteProject = createAction(
  '[PROJECT] Delete Project',
  props<{ project: Project }>()
);

export const projectDeleted = createAction(
  '[PROJECT] Project Deleted',
  props<{ project: Project }>()
);
