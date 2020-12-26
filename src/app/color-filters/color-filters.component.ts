import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../_services/data.service';

@Component({
  selector: 'app-color-filters',
  templateUrl: './color-filters.component.html',
  styleUrls: ['./color-filters.component.scss']
})
export class ColorFiltersComponent implements OnInit {

  @Input()
  filters = [];

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
  }

}
