import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Color } from '../_models/color.model';
import { DataService } from '../_services/data.service';
import { EventManagerService } from '../_services/event-manager.service';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss']
})
export class ColorPickerComponent implements OnInit {

  @Input() visible = false;
  @Output() handleClosePicker: EventEmitter<any> = new EventEmitter<any>();

  colors = [];
  color1;

  constructor(public dataService: DataService, private eventManager: EventManagerService) { }

  ngOnInit(): void {
    this.colors = [...this.dataService.colors];


  }

  closePicker() {
    this.handleClosePicker.emit();
  }

  colorChanged() {
    //this.eventManager.resetVisualization();
    this.dataService.projectIds.forEach((id, index) => {
      const color = this.dataService.colors[index % (this.dataService.colors.length)]

      if (id === this.dataService.activeProjectId) {
        this.dataService.setActiveColor(new Color(color.r, color.g, color.b));

      }
      const image = document.querySelector('#image-' + index) as HTMLElement;
      const imageSml = document.querySelector('#image-' + index + '-sml') as HTMLElement;

      image.setAttribute('filter', 'url(#' + color.r.toString() + color.g.toString() + color.b.toString() + ')' )
      imageSml.setAttribute('filter', 'url(#' + color.r.toString() + color.g.toString() + color.b.toString() + ')' )

    });
    this.eventManager.resetVisualization();
  }

  updateColor() {
    this.dataService.updateColors();
    this.colorChanged();
  }

  deleteColor(i) {
    this.dataService.colors.splice(i, 1);
    this.dataService.updateColors();
    this.colorChanged();
  }
  addColor() {
    this.dataService.addColor();
    this.colorChanged();
  }
  resetColors() {
    this.dataService.resetColors();
    this.colorChanged();
  }
}
