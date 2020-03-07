import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Project, NotifyService, emptyProject } from '@ngrx-projects/core-data';
import { ProjectsFacade } from '@ngrx-projects/core-state';
import { Observable } from 'rxjs';

@Component({
  selector: 'ngrx-projects-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  form: FormGroup;
  selectedProject: Project;
  projects$: Observable<Project[]> = this.projectsFacade.allProjects$;

  constructor(
    private projectsFacade: ProjectsFacade,
    private formBuilder: FormBuilder,
    private notify: NotifyService
  ) {}

  ngOnInit() {
    this.initForm();
    this.projectsFacade.loadProjects();
    this.projectsFacade.mutations$.subscribe(() => this.resetProject());
  }

  resetProject() {
    this.form.reset();
    this.selectProject(emptyProject);
    Object.keys(this.form.controls).forEach(key => {
      this.form.get(key).setErrors(null);
    });
  }

  selectProject(project: Project) {
    this.projectsFacade.selectProject(project.id);
    this.form.patchValue(project);
  }

  createProject() {
    this.notify.notification(`You have created ${this.form.value.title}`);
    this.projectsFacade.createProject(this.form.value);
  }

  updateProject() {
    this.notify.notification(`You have updated ${this.form.value.title}`);
    this.projectsFacade.updateProject(this.form.value);
  }

  saveProject(project: Project) {
    if (project.id) {
      this.updateProject();
    } else {
      this.createProject();
    }
  }

  deleteProject(project: Project) {
    this.notify.notification(`You have deleted ${project.title}`);
    this.projectsFacade.deleteProject(project);
  }

  private initForm() {
    this.form = this.formBuilder.group({
      id: null,
      title: ['', Validators.compose([Validators.required])],
      details: ['', Validators.compose([Validators.required])],
      importanceLevel: null
    });
  }
}
