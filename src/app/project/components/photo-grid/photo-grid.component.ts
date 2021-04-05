import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-photo-grid',
  templateUrl: './photo-grid.component.html',
  styleUrls: ['./photo-grid.component.scss']
})
export class PhotoGridComponent implements OnInit {

  @Input() content;

  showImage = false;
  activeIndex = 0;

  constructor() { }

  ngOnInit(): void {
  }

  imageClicked(index) {
    this.activeIndex = index;
    this.showImage = true;
    console.log('clicked');
  }
}
