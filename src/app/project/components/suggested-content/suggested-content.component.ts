import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api/selectitem';
import { DataService } from 'src/app/_services/data.service';
import { EventManagerService } from 'src/app/_services/event-manager.service';

@Component({
  selector: 'app-suggested-content',
  templateUrl: './suggested-content.component.html',
  styleUrls: ['./suggested-content.component.scss']
})
export class SuggestedContentComponent implements OnInit {

  filters = [];
  projectIds = [];
  viewingMore = false;

  constructor(private eventManager: EventManagerService, public dataService: DataService) { }

  ngOnInit(): void {

    this.projectIds = Object.keys(this.dataService.projects);
    this.filters.push(...this.findUniqueItems('type'));
    this.filters.push(...this.findUniqueItems('media'));

  }

  returnToExplorer() {
    this.scrollToTop();
    this.eventManager.goBack();
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  findUniqueItems(key: string): SelectItem[] {
    const array = [];

    const stringArray = [];

    this.projectIds.forEach(projectId => {
      this.dataService.projects[projectId][key].forEach(item => {
        stringArray.push(item);
      })
    })

		let uniqueItems = Array.from(new Set(stringArray));

		uniqueItems = uniqueItems.filter(item => item !== null);

		const dropdownItems: any[] = uniqueItems.map(item => {
			return {label: item, value: {label: item, key: key}};
		})

		array.push(...dropdownItems);
	///	array.sort((a, b) => a.label < b.label ? -1 : a.label > b.label ? 1 : 0);

		return array;
  }

  handleTagClick(tag) {
    console.log(tag);
    this.dataService.filterState[tag.value.key] = [tag.label];
    this.eventManager.updateFilter();
    this.returnToExplorer();
  }

  navigateButtonClick(path: string) {
    window.scrollTo(0,0);
    this.eventManager.navigateToProject(path);
  }

  toggleViewMore() {
    this.viewingMore = !this.viewingMore;

    if (this.viewingMore) {
      this.filters.push(...this.findUniqueItems('tech'));
    } else {
      this.filters = this.filters.filter(item => item.value.key !== 'tech');
    }

  }

}
