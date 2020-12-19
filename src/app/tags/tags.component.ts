import { Component, Input, OnInit } from '@angular/core';
import { Project } from '../_models/project.model';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {


  @Input() project: Project;
  @Input() visible: false;

  constructor() { }

  ngOnInit(): void {
  }

}
