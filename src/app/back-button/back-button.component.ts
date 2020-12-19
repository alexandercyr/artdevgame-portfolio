import { Component, OnInit } from '@angular/core';
import { EventManagerService } from '../_services/event-manager.service';
import { NavigationService } from '../_services/navigation.service';

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss']
})
export class BackButtonComponent implements OnInit {

  constructor(private navigate: NavigationService, private eventManager: EventManagerService) { }

  ngOnInit(): void {
  }

  goBack() {
    this.eventManager.goBack();
  }
}
