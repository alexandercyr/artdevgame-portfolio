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

  constructor(private uiService: UiService, private dataService: DataService, private navigate: NavigationService) { }

  // Set manually to prevent circular dependency
  public setD3Service(d3: D3Service) {
    this.d3Service = d3;
  }

  public projectHoverEnter() {
    this.uiService.handleHover(true);
  }

  public projectHoverExit() {
    this.uiService.handleHover(false);
  }

  public openProject(){
    this.uiService.openProject();
  }

  public closeProject() {
    this.uiService.closeProject();
  }
  public setActiveProject(project: Project) {

    if (project !== undefined) {
      this.dataService.setActiveProject(project);
      this.uiService.openProject();
      this.d3Service.openProjectIfNotSet(project.id);
    } else {
      this.d3Service.closeProjectIfOpen();
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
}
