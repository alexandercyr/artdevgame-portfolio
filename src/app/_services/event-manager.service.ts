import { Injectable } from '@angular/core';
import { Project } from '../_models/project.model';
import { DataService } from './data.service';
import { UiService } from './ui.service';

@Injectable({
  providedIn: 'root'
})
export class EventManagerService {

  constructor(private uiService: UiService, private dataService: DataService) { }

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
    this.dataService.setActiveProject(project);
  }

  public updatePopupPosition(event) {
    this.uiService.updatePopupPosition(event);
  }
}
