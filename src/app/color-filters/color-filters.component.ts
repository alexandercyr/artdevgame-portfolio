import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-color-filters',
  templateUrl: './color-filters.component.html',
  styleUrls: ['./color-filters.component.scss']
})
export class ColorFiltersComponent implements OnInit {

  @Input()
  filters = [];

  constructor() { }

  ngOnInit(): void {
  }

}
