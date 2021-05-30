import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as data from '../../assets/data/data.json';
import { DataService } from '../_services/data.service';
import { EventManagerService } from '../_services/event-manager.service';


enum Content {
  FEATURE = "FEATURE",
  PHOTOGRID = "PHOTOGRID",
  CAROUSEL = "CAROUSEL",
  TEXT = "TEXT",
  VIDEO = "VIDEO",

}

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  path: string;
  project;
  ContentType = Content;

  constructor(private router: Router, private route: ActivatedRoute, private eventManager: EventManagerService, private dataService: DataService) { }

  ngOnInit(): void {
    this.path = this.router.url;
    console.log(this.dataService.activeColor);
    const sub = this.route.params.subscribe(params => {
      this.path = params.id;
      this.project = data.projects[this.path];

      if (this.path !== '' || this.path !== undefined) {
        this.eventManager.setActiveProject(this.project);
      }
    });
  }



}
