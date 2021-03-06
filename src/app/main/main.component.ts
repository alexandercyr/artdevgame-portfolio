import { Component, ViewChild, ElementRef, AfterContentInit, OnInit } from '@angular/core';

import * as d3 from 'd3';

import { DataService } from '../_services/data.service';
import { D3Service } from '../_services/d3.service';
import { UiService } from '../_services/ui.service';
import { ActivatedRoute } from '@angular/router';
import { EventManagerService } from '../_services/event-manager.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements AfterContentInit, OnInit {

  width = 960;
  height = 960;

  path;

  constructor(private eventManager: EventManagerService, public dataService: DataService, private d3Service: D3Service, public uiService: UiService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    window.addEventListener('resize', () => this.resize());

    const sub = this.route.params.subscribe(params => {
      this.path = params.id;
      console.log('main: ' + this.path);

      if (this.path === '') {
        this.d3Service.closeProject(this.d3Service.activeItemId, false);
      }
    });
  }

  ngAfterContentInit() {
    this.d3Service.svg = d3.select("svg#chart")
    .attr("width", this.width )
    .attr("height", this.height );
    this.d3Service.setupVisualization();

  }

  resize() {
    this.width = window.innerWidth;
    this.width = window.innerHeight;
    // this.d3Service.svg.style.width = this.width;
    // this.d3Service.svg.style.height = this.height;

    this.d3Service.svg = d3.select("svg#chart")
    .attr("width",window.innerWidth )
    .attr("height", window.innerHeight );

    // this.d3Service.simulation.restart();
    this.d3Service.resetVisualization();
  }


}
