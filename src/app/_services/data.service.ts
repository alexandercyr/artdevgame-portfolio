import { Injectable } from '@angular/core';
import * as data from '../../assets/data/data.json';
import { Color } from '../_models/color.model';
import { Project } from '../_models/project.model';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  activeProjectId = '';
  activeProject: Project;
  activeColor: Color;
  projects = data.projects;

  constructor() { }

  public setActiveProject(project: Project) {
    this.activeProject = project;
    this.activeProjectId = project.id;
  }

  public setActiveColor(color) {
    this.activeColor = new Color(color.r, color.g, color.b);
  }
}
