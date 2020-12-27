import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../_services/data.service';
import { EventManagerService } from '../_services/event-manager.service';

@Component({
  selector: 'app-multiselect',
  templateUrl: './multiselect.component.html',
  styleUrls: ['./multiselect.component.scss']
})
export class MultiselectComponent implements OnInit {

  @Input() options: [] = [];
  @Input() name: string;

  target;
  constructor(public dataService: DataService, private eventManager: EventManagerService) { }

  ngOnInit(): void {
  }

  handleFilterChanged() {
    console.log(this.dataService.filterState);
    this.eventManager.updateFilter();
  }



  handleOnFocus(e) {
    console.log(e.originalEvent);
    setTimeout(() => {
      this.target = document.querySelector('.p-focus');

      this.target.style.setProperty('box-shadow', '0 0 0 0.2rem ' + this.dataService.activeColor.getRGBAString(0.3) );

    }, 0)
   }

  handleOnBlur(e) {
    this.target.style.setProperty('box-shadow', 'unset' );
  }

  handleMouseOver(e) {
    setTimeout(() => {
      this.target = document.querySelector('.p-focus');

      e.originalElement.target.style.setProperty('border-color',  this.dataService.activeColor.getRGBAString(0.3) );

    }, 0)
  }

  clearSelections() {
		this.dataService.filterState[this.name] = [];
		this.eventManager.updateFilter();
	}

}
