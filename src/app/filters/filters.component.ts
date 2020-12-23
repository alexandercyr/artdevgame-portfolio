import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { DataService } from '../_services/data.service';
import { EventManagerService } from '../_services/event-manager.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  list;
  typeList: SelectItem[] = [];
  mediaList: SelectItem[] = [];
  techList: SelectItem[] = [];


  constructor(public dataService: DataService, private eventManager: EventManagerService) { }

  ngOnInit(): void {
    this.list = this.dataService.projectIds.map(id => {
      return this.dataService.projects[id];
    })
    this.typeList = this.findUniqueItems('type');
    this.mediaList = this.findUniqueItems('media');
    this.techList = this.findUniqueItems('tech');

  }

  findUniqueItems(key: string) {
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
		array.sort((a, b) => a.label < b.label ? -1 : a.label > b.label ? 1 : 0);

		return array;
  }

  handleFilterChanged() {
    console.log(this.dataService.filterState);
    this.eventManager.updateFilter();
  }

}
