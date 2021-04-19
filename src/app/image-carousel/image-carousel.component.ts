import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../_services/data.service';

@Component({
  selector: 'app-image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.scss']
})
export class ImageCarouselComponent implements OnInit {

  @Input()
  images;
  showImage = false;
  activeIndex = 0;

  constructor(public dataService: DataService) {

  }

  ngOnInit(): void {

  }

  imageClicked(image) {
    this.activeIndex = this.images.indexOf(image);
    this.showImage = true;
  }
}
