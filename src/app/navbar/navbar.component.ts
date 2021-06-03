import { Component, OnInit } from '@angular/core';
import { Color } from '../_models/color.model';
import { DataService } from '../_services/data.service';
import { EventManagerService } from '../_services/event-manager.service';
import { UiService } from '../_services/ui.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isDarkMode = false;
  showingColorPicker = false;

  constructor(private eventManager: EventManagerService, private dataService: DataService) { }

  ngOnInit(): void {
    this.isDarkMode = this.dataService.isDarkMode;
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;

    this.eventManager.toggleDarkMode();
    this.dataService.projectIds.forEach((id, index) => {
      const color = this.dataService.colors[index % (this.dataService.colors.length)]

      if (id === this.dataService.activeProjectId) {
        this.dataService.setActiveColor(new Color(color.r, color.g, color.b));
      }
      const image = document.querySelector('#image-' + index) as HTMLElement;
      const imageSml = document.querySelector('#image-' + index + '-sml') as HTMLElement;

      image.setAttribute('filter', 'url(#' + color.r.toString() + color.g.toString() + color.b.toString() + ')' )
      imageSml.setAttribute('filter', 'url(#' + color.r.toString() + color.g.toString() + color.b.toString() + ')' )

    });
  }

  toggleColorPicker() {
    this.showingColorPicker = !this.showingColorPicker;
  }
}

