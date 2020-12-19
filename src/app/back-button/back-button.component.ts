import { Component, OnInit, OnDestroy } from '@angular/core';
import { Color } from '../_models/color.model';
import { DataService } from '../_services/data.service';
import { EventManagerService } from '../_services/event-manager.service';
import { NavigationService } from '../_services/navigation.service';

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss']
})
export class BackButtonComponent implements OnInit, OnDestroy {

  color: Color;
  button;
  focusListener;

  constructor(private navigate: NavigationService, private eventManager: EventManagerService, private dataService: DataService) { }

  ngOnInit(): void {
    this.color = this.dataService.activeColor;
    document.documentElement.style.setProperty('--primary-color', this.color.getRGBString());
    this.button = document.getElementById('back-button');

    this.button.style.setProperty('color', this.color.getRGBString());
    const self = this;
    this.focusListener = this.button.addEventListener("focus", function () {
      self.button.style.setProperty('box-shadow', '0 0 0 0.2rem ' + self.color.getRGBAString(0.3) );
    });

  }

  ngOnDestroy() {
    this.button.removeEventListener('focus', this.focusListener);
  }

  goBack() {
    this.eventManager.goBack();
  }
}
