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

  colors = [];
  userColors;

  defaultColors = {
    light: [
      //blue
      {
        r: 0,
        g: 0,
        b: 255
      },
      //orange
      {r: 247, g: 146, b: 30},
      //pink
      {r: 236, g: 30, b: 121}],
    dark: [
      //mint
      {r: 66, g: 255, b: 224},
      //orange
      {r: 247, g: 146, b: 30},
      //pink
      {r: 236, g: 30, b: 121}]
  }


  constructor(private eventManager: EventManagerService) {
    console.log(this.colors);
    this.projectIds = Object.keys(data.projects);
    this.eventManager.setDataService(this);
    this.filterState = new FilterState();
    this.loadDarkModePrefs();
    this.loadColors();
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
    localStorage.setItem('dark-mode', this.isDarkMode.toString());
    if (this.isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
    this.loadColors();
    this.eventManager.resetVisualization();
  }

  loadDarkModePrefs() {
    const mode = localStorage.getItem('dark-mode');
    if (mode) {
      this.isDarkMode = mode === 'true'

    } else {
      const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
      this.isDarkMode = prefersDarkScheme.matches;
      localStorage.setItem('dark-mode', this.isDarkMode.toString());
    }
    if (this.isDarkMode) {
      document.body.classList.add("dark");
    }
  }

  loadColors() {
    const mode = this.isDarkMode ? 'dark' : 'light';
    const colors = JSON.parse(localStorage.getItem('colors'));
    this.userColors = {...colors};
    if (colors) {
      this.colors = [...colors[mode]];
    } else {
      localStorage.setItem('colors', JSON.stringify(this.defaultColors));
      this.colors = this.defaultColors[mode];
    }
  }

  addColor() {
    this.colors.push(this.defaultColors[this.isDarkMode ? 'dark' : 'light'][0]);
    this.updateColors();
  }

  updateColors() {
    this.userColors[this.isDarkMode ? 'dark' : 'light'] = [...this.colors];
    this.saveColors();
  }

  resetColors() {
    this.colors = [...this.defaultColors[this.isDarkMode ? 'dark' : 'light']];
    this.userColors[this.isDarkMode ? 'dark' : 'light'] = [...this.colors];
    this.saveColors();
  }
  saveColors() {
    localStorage.setItem('colors', JSON.stringify(this.userColors))
  }
}
