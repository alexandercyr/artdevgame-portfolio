import { Component, OnInit } from '@angular/core';
import { DataService } from '../_services/data.service';
import { EventManagerService } from '../_services/event-manager.service';
import { NavigationService } from '../_services/navigation.service';

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss']
})
export class BackButtonComponent implements OnInit {

  color;

  constructor(private navigate: NavigationService, private eventManager: EventManagerService, private dataService: DataService) { }

  ngOnInit(): void {
    this.color = this.dataService.activeColor.getRGBString();
  }

  goBack() {
    this.eventManager.goBack();
  }
}
