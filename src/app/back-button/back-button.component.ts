import { Component, OnInit } from '@angular/core';
import { Color } from '../_models/color.model';
import { DataService } from '../_services/data.service';
import { EventManagerService } from '../_services/event-manager.service';
import { NavigationService } from '../_services/navigation.service';

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss']
})
export class BackButtonComponent implements OnInit {

  color: Color;
  button;
  focusListener;

  constructor(private navigate: NavigationService, private eventManager: EventManagerService, public dataService: DataService) { }

  ngOnInit(): void {
    this.color = this.dataService.activeColor;
    document.documentElement.style.setProperty('--primary-color', this.dataService.activeColor.getRGBString());
  }



  goBack() {
    this.eventManager.goBack();
  }

  handleOnFocus(e) {
    e.target.style.setProperty('box-shadow', '0 0 0 0.2rem ' + this.dataService.activeColor.getRGBAString(0.3) );
  }
}
