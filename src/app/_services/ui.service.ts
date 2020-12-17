import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UiService {


  popupLeft = '0';
  popupTop = '0';

  isFocused = false;
  isHovering = false;

  constructor() { }

  handleHover(isHovering: boolean) {
    this.isHovering = isHovering;
  }

  openProject() {
    this.isFocused = true;
    this.popupLeft = '0';
    this.popupTop = '0';
  }

  closeProject() {
    this.isFocused = false;
  }

  updatePopupPosition(event) {
    this.popupLeft = event.clientX + 20 + 'px';
    this.popupTop = event.clientY + 'px';
  }
}
