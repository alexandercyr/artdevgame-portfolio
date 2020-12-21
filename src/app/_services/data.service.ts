import { Injectable } from '@angular/core';
import * as data from '../../assets/data/data.json';
import { Color } from '../_models/color.model';
import { Project } from '../_models/project.model';
import { EventManagerService } from './event-manager.service';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  activeProjectId = '';
  activeProject: Project;
  activeColor: Color;
  projects = data.projects;
  projectIds;
  activeIndex;
  previousProject: Project;
  nextProject: Project;

  constructor(private eventManager: EventManagerService) {
    this.projectIds = Object.keys(data.projects);
    this.eventManager.setDataService(this);
  }

  public setActiveProject(project: Project) {
    this.activeProject = project;
    this.activeProjectId = project.id;
    this.checkIfActiveIndexSet();
    this.setNextProject();
    this.setPreviousProject();
  }

  private checkIfActiveIndexSet() {
    if (this.activeIndex === undefined) {
      this.activeIndex = this.projectIds.indexOf(this.activeProjectId);
    }
  }

  public setActiveItemIndex(index: number) {
    this.activeIndex = index;
  }

  public setActiveColor(color) {
    this.activeColor = new Color(color.r, color.g, color.b);
  }

  public setNextProject() {
    let nextIndex = this.activeIndex + 1 >= this.projectIds.length ? 0 : this.activeIndex + 1;
    this.nextProject =  this.projects[this.projectIds[nextIndex]];
  }

  public setPreviousProject() {
    let prevIndex = this.activeIndex - 1 < 0 ? this.projectIds.length - 1 : this.activeIndex - 1;
    this.previousProject = this.projects[this.projectIds[prevIndex]];
  }
}
