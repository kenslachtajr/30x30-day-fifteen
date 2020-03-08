import { Component } from '@angular/core';

@Component({
  selector: 'ngrx-projects-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dashboard';

  links = [{ path: './projects', icon: 'work', title: 'Projects' }];
}
