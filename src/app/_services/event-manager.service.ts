import { Injectable } from '@angular/core';
import { Project } from '../_models/project.model';
import { D3Service } from './d3.service';
import { DataService } from './data.service';
import { NavigationService } from './navigation.service';
import { UiService } from './ui.service';

@Injectable({
  providedIn: 'root'
})
export class EventManagerService {

  d3Service: D3Service;
  dataService: DataService;
  transitionDuration = 1000;
  transitioning = false;

  constructor(private uiService: UiService, private navigate: NavigationService) { }

  // Set manually to prevent circular dependency
  public setD3Service(d3: D3Service) {
    this.d3Service = d3;
  }
  public setDataService(data: DataService) {
    this.dataService = data;
  }

  public projectHoverEnter() {
    this.uiService.handleHover(true);
  }

  public projectHoverExit() {
    this.uiService.handleHover(false);
    this.dataService.setActiveItemIndex(undefined);
  }

  public openProject(){
    this.uiService.openProject();
  }

  public closeProject() {
    this.uiService.closeProject();
    this.setActiveProject(undefined);

  }
  public setActiveProject(project: Project) {

    if (project !== undefined) {
      this.d3Service.openProjectIfNotSet(project.id);
      this.dataService.setActiveProject(project);

     // this.uiService.openProject();
    } else {
      this.d3Service.closeProjectIfOpen(false);
      this.uiService.closeProject();
    }
  }

  public updatePopupPosition(event) {
    this.uiService.updatePopupPosition(event);
  }

  public goBack() {
    this.navigate.back();
    this.uiService.closeProject();
   // this.d3Service.closeProject(this.d3Service.activeItemIndex);
  }

  public navigateToProject(projectId) {

    if (!this.transitioning) {
      this.transitioning = true;
      setTimeout(() => {this.transitioning = false}, this.transitionDuration);

      this.d3Service.closeProjectIfOpen(true);
      // this.closeProject();
      this.uiService.isFocused = false;
      this.dataService.setActiveItemIndex(undefined);
      this.setActiveProject(this.dataService.projects[projectId]);
      this.uiService.isFocused = true;

    }

  }

  public updateFilter() {
    this.dataService.filterProjects();
    this.d3Service.resetVisualization();
  }

  public resetVisualization() {
    this.d3Service.resetVisualization();
  }

  public toggleDarkMode() {
    this.dataService.toggleDarkMode();
  }
}
