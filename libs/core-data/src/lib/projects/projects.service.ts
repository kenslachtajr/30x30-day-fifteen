import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from './project.model';

const BASE_URL = 'https://kenneth-server.herokuapp.com/';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  model = 'projects'

  constructor(private httpClient: HttpClient) {}

  getUrl() {
    return `${BASE_URL}${this.model}`
  }

  all() {
    return this.httpClient.get(this.getUrl())
  }

  findOne(project: Project) {
    return this.httpClient.get(this.getUrlForId(project));
  }

  create(project) {
    return this.httpClient.post(this.getUrl(), project);
  }

  getUrlForId(id) {
    return `${this.getUrl()}/${id}`;
  }

  update(project: Project) {
    return this.httpClient.patch(this.getUrlForId(project.id), project);
  }

  delete(project: Project) {
    return this.httpClient.delete(this.getUrlForId(project.id));
  }
}
