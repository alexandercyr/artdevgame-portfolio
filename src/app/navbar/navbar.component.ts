import { Component, OnInit } from '@angular/core';
import { EventManagerService } from '../_services/event-manager.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isDarkMode = false;

  constructor(private eventManager: EventManagerService) { }

  ngOnInit(): void {
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    this.eventManager.toggleDarkMode();
  }

  toggleColorPicker() {

  }
}
