import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { DataService } from '../_services/data.service';
import { EventManagerService } from '../_services/event-manager.service';
import { UiService } from '../_services/ui.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  target;
  list: String[];
  typeList: SelectItem[] = [];
  mediaList: SelectItem[] = [];
  techList: SelectItem[] = [];

  constructor(public dataService: DataService, private eventManager: EventManagerService,  public uiService: UiService) { }

  ngOnInit(): void {

    this.list = this.dataService.projectIds.map(id => {
      return this.dataService.projects[id];
    })
    this.typeList = this.findUniqueItems('type');
    this.mediaList = this.findUniqueItems('media');
    this.techList = this.findUniqueItems('tech');

    setTimeout(() => {
      document.querySelectorAll('.p-multiselect.p-component').forEach(item => {
        item.addEventListener('mouseenter', event => {
          const target = event.target as HTMLTextAreaElement;

          target.style.setProperty('border-color',  this.dataService.activeColor.getRGBString() );
        })
        item.addEventListener('mouseleave', event => {
          const target = event.target as HTMLTextAreaElement;

          target.style.setProperty('border-color',  "#333" );
        })
        // item.addEventListener('mouseexit', event => {
        //   console.log(event);
        //   event.target.style.setProperty('border-color',  "#333");

        // })
      })
      }, 10);


    }

  findUniqueItems(key: string): SelectItem[] {
    const array = [];

    const stringArray = [];

    this.list.forEach(itemArr => {
      itemArr[key].forEach(item => {
        stringArray.push(item);
      })
    })

		let uniqueItems = Array.from(new Set(stringArray));

		uniqueItems = uniqueItems.filter(item => item !== null);

		const dropdownItems: any[] = uniqueItems.map(item => {
			return {label: item, value: item};
		})

		array.push(...dropdownItems);
	///	array.sort((a, b) => a.label < b.label ? -1 : a.label > b.label ? 1 : 0);

		return array;
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

  showingPanel() {
    document.querySelectorAll('.p-checkbox .p-checkbox-box.p-highlight').forEach(item => {
      // item.style.setProperty('border-color',  this.dataService.activeColor.getRGBString());
      // item.style.setProperty('background',  this.dataService.activeColor.getRGBString());

    })
  }
}
