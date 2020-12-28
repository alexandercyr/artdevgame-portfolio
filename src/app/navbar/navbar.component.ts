import { Component, OnInit } from '@angular/core';
import { DataService } from '../_services/data.service';
import { EventManagerService } from '../_services/event-manager.service';

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
  }

  toggleColorPicker() {
    this.showingColorPicker = !this.showingColorPicker;
  }
}
