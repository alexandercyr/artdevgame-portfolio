import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  path: string;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.path = this.router.url;

    const sub = this.route.params.subscribe(params => {
      this.path = params.id;
    });
  }



}
