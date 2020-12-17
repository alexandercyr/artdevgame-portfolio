import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-feature-text',
  templateUrl: './feature-text.component.html',
  styleUrls: ['./feature-text.component.scss']
})
export class FeatureTextComponent implements OnInit {

  @Input() content;

  constructor() { }

  ngOnInit(): void {
  }

}
