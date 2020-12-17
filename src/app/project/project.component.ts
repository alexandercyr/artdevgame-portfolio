import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as data from '../../assets/data/data.json';
import { EventManagerService } from '../_services/event-manager.service';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  path: string;
  project;

  constructor(private router: Router, private route: ActivatedRoute, private eventManager: EventManagerService) { }

  ngOnInit(): void {
    this.path = this.router.url;

    const sub = this.route.params.subscribe(params => {
      this.path = params.id;
      this.project = data.projects[this.path];

      if (this.path !== '' || this.path !== undefined) {
        this.eventManager.setActiveProject(this.project);
      }
      console.log(this.project);
    });
  }



}
