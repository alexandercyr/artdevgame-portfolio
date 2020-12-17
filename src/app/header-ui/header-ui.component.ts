import { Component, OnInit } from '@angular/core';
import { DataService } from '../_services/data.service';
import { UiService } from '../_services/ui.service';

@Component({
  selector: 'app-header-ui',
  templateUrl: './header-ui.component.html',
  styleUrls: ['./header-ui.component.scss']
})
export class HeaderUiComponent implements OnInit {

  constructor(public uiService: UiService, public dataService: DataService) { }

  ngOnInit(): void {
  }

  getClassString() {
    return this.uiService.isFocused ? 'selected ' : '' + this.uiService.isHovering ? 'show ' : '';
  }
}
