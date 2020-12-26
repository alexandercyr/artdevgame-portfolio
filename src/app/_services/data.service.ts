import { Injectable } from '@angular/core';
import * as data from '../../assets/data/data.json';
import { Color } from '../_models/color.model';
import { FilterState } from '../_models/filter-state.model';
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
  filterState: FilterState;
  isDarkMode = false;

  colors = [
    //blue
    {
      r: 0,
      g: 0,
      b: 1
    },
    //orange
    {
      r: 0.969,
      g: 0.576,
      b: 0.118
    },
    //pink
    {
      r: 0.929,
      g: 0.118,
      b: 0.475
    }];

  constructor(private eventManager: EventManagerService) {
    this.projectIds = Object.keys(data.projects);
    this.eventManager.setDataService(this);
    this.filterState = new FilterState();
    this.activeColor = new Color(this.colors[0].r, this.colors[0].g, this.colors[0].b);

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

  public filterProjects() {
    const allProjectIds = Object.keys(data.projects);

    const filteredIds = allProjectIds.filter(projectId => {
      return this.projectHasFilter(projectId, 'type') &&
      this.projectHasFilter(projectId, 'media') &&
      this.projectHasFilter(projectId, 'tech');
    })

    this.projectIds = filteredIds;
  }

  projectHasFilter(projectId: string, key: string) {
    // return true if all filters unselected OR selected filter is found in particular project
    return this.filterState[key].length === 0 ||
    this.filterState[key].filter(filter => {
      return this.projects[projectId][key].indexOf(filter) >= 0;
    }).length > 0;
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");

    }
  }

}
