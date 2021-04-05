import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-ui-image',
  templateUrl: './ui-image.component.html',
  styleUrls: ['./ui-image.component.scss']
})
export class UiImageComponent implements OnInit {
  @ViewChild('container', {static: true}) container: ElementRef;
  @ViewChild('imageEl', {static: true}) imageEl: ElementRef;

  @Input() image;

  @Output() handleClick: EventEmitter<any> = new EventEmitter<any>();

  directionClass = 'vertical';
  parentClass = 'landscape';

  constructor() { }

  ngOnInit(): void {


  }

  checkDimensions() {
      if (this.imageEl.nativeElement.clientWidth >= this.imageEl.nativeElement.clientHeight ) {
        this.directionClass = 'horizontal'

      } else {
        this.directionClass = 'vertical'
      }

      if (this.container.nativeElement.clientWidth >= this.container.nativeElement.clientHeight ) {
        this.parentClass = 'landscape'

      } else {
        this.parentClass = 'portrait'
      }
  }

  imageClick() {
    this.handleClick.emit();
  }
}
