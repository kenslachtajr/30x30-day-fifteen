import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectsItemComponent } from './projects/projects-item/projects-item.component';
import { WildComponent } from './wild/wild.component';
import { LoginComponent } from '@ngrx-projects/ui-login';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'wild', component: WildComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'projects/:id', component: ProjectsItemComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'wild', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule {}
