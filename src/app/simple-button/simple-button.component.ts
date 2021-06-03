import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Color } from '../_models/color.model';
import { DataService } from '../_services/data.service';
import { EventManagerService } from '../_services/event-manager.service';
import { NavigationService } from '../_services/navigation.service';

@Component({
  selector: 'app-simple-button',
  templateUrl: './simple-button.component.html',
  styleUrls: ['./simple-button.component.scss']
})
export class SimpleButtonComponent implements OnInit {

  @Input() label = "";

  @Input() textColor;
  @Input() direction = "left";
  @Input() iconName = "";
  @Input() hover = false;
  @Input() large = false;

  @Output() onButtonClick: EventEmitter<any> = new EventEmitter<any>();

  color: Color;
  button;
  focusListener;

  target;

  sub;

  constructor(private route: ActivatedRoute, private navigate: NavigationService, private eventManager: EventManagerService, public dataService: DataService) { }

  ngOnInit(): void {
    const self = this;
    this.sub = this.route.params.subscribe(params => {
      this.refreshUI();
    });
  }

  refreshUI() {
    document.documentElement.style.setProperty('--primary-color', this.dataService.activeColor.getRGBString());

  }

  handleButtonClick(e) {
    this.onButtonClick.emit();
    e.target.style.setProperty('box-shadow', '0 0 0 0.2rem ' + this.dataService.activeColor.getRGBAString(0.3) );
  }

  handleOnFocus(e) {
    this.target = e.target;
    e.target.style.setProperty('box-shadow', '0 0 0 0.2rem ' + this.dataService.activeColor.getRGBAString(0.3) );
  }

  handleOnBlur(e) {
    e.target.style.setProperty('box-shadow', 'unset' );
  }
}
