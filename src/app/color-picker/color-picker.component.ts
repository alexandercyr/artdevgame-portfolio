import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../_services/data.service';
import { EventManagerService } from '../_services/event-manager.service';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss']
})
export class ColorPickerComponent implements OnInit {

  @Input() visible = false;

  colors = [];
  color1;

  constructor(public dataService: DataService, private eventManager: EventManagerService) { }

  ngOnInit(): void {
    this.colors = [...this.dataService.colors];
  }

  colorChanged() {
    //this.eventManager.resetVisualization();
    this.eventManager.resetVisualization();
  }
}
