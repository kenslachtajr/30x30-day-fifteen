import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectsService } from '@ngrx-projects/core-data';

@Component({
  selector: 'ngrx-projects-projects-item',
  templateUrl: './projects-item.component.html',
  styleUrls: ['./projects-item.component.scss']
})
export class ProjectsItemComponent implements OnInit {
  _project$;
  public get project$() {
    return this._project$;
  }
  public set project$(value) {
    this._project$ = value;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectsService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(param => {
      const id = param['id'];
      this.project$ = this.projectService.findOne(id);
    });
  }

  goBackToProjects() {
    this.router.navigate(['/projects']);
  }
}
