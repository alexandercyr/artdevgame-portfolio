import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class D3Service {

  svg;

  constructor() { }

  setSVG(svg) {
    this.svg = svg;
  }
}
