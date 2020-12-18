import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/_services/data.service';

@Component({
  selector: 'app-feature-text',
  templateUrl: './feature-text.component.html',
  styleUrls: ['./feature-text.component.scss']
})
export class FeatureTextComponent implements OnInit {

  @Input() content;

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
  }

}
