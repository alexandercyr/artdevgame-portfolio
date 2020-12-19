import { Component, ViewChild, ElementRef, AfterContentInit, OnInit } from '@angular/core';

import * as d3 from 'd3';

import { DataService } from '../_services/data.service';
import { D3Service } from '../_services/d3.service';
import { UiService } from '../_services/ui.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements AfterContentInit, OnInit {

  width = 960;
  height = 960;

  filters = [
    //blue
    {
      r: 0,
      g: 0,
      b: 1
    },
    //orange
    {
      r: 0.969,
      g: 0.576,
      b: 0.118
    },
    //pink
    {
      r: 0.929,
      g: 0.118,
      b: 0.475
    }];

  path;

  constructor(public dataService: DataService, private d3Service: D3Service, public uiService: UiService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    window.addEventListener('resize', () => this.resize());

    const sub = this.route.params.subscribe(params => {
      this.path = params.id;
      console.log('main: ' + this.path);

      if (this.path === '') {
        this.d3Service.closeProject(this.d3Service.activeItemId);
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
    this.d3Service.svg.width = this.width;
    this.d3Service.svg.style.height = this.height;

    this.d3Service.simulation.restart();
  }


}
