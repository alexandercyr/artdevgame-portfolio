import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Color } from '../_models/color.model';
import { DataService } from '../_services/data.service';
import { EventManagerService } from '../_services/event-manager.service';
import { NavigationService } from '../_services/navigation.service';

@Component({
  selector: 'app-arrow-button',
  templateUrl: './arrow-button.component.html',
  styleUrls: ['./arrow-button.component.scss']
})
export class ArrowButtonComponent implements OnInit {

  @Input() label = "";

  @Input() direction = "left";
  @Output() onButtonClick: EventEmitter<any> = new EventEmitter<any>();

  color: Color;
  button;
  focusListener;

  target;

  sub;

  constructor(private route: ActivatedRoute, private navigate: NavigationService, private eventManager: EventManagerService, public dataService: DataService) { }

  ngOnInit(): void {
    const self = this;
    const sub = this.route.params.subscribe(params => {
      this.refreshUI();
      this.target.style.setProperty('box-shadow', '0 0 0 0.2rem ' + this.dataService.activeColor.getRGBAString(0.3) );

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
    console.log('BLURRRRRRR')
    e.target.style.setProperty('box-shadow', 'unset' );

  }
}
