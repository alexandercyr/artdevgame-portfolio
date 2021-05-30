import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/_services/data.service';

@Component({
  selector: 'app-project-info',
  templateUrl: './project-info.component.html',
  styleUrls: ['./project-info.component.scss']
})
export class ProjectInfoComponent implements OnInit {

  techString;

  constructor(public dataService: DataService) {
    this.techString = this.generateTechString(dataService.activeProject.tech);
  }

  ngOnInit(): void {
  }

  generateTechString(tech: string[]) {
    let string = '';
    tech.forEach((type, index) => {
      string += type;
      string += index == tech.length - 1 ? '' : ', ';
    })
    return string;
  }
}
