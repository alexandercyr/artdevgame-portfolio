import { Injectable } from '@angular/core';
import * as data from '../../assets/data/data.json';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  activeProjectId = '';
  activeProject: Project;
  projects = data.projects;

  constructor() { }

  public setActiveProject(project: Project) {
    this.activeProject = project;
    this.activeProjectId = project.id;
  }
}
