import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
// import { Component, ViewChild, ElementRef, AfterContentInit, OnInit, NgZone } from '@angular/core';

import * as d3 from 'd3';
import * as data from '../../assets/data/data.json';
import { Color } from '../_models/color.model';
import { DataService } from './data.service';
import { EventManagerService } from './event-manager.service';
import { NavigationService } from './navigation.service';
import { UiService } from './ui.service';
@Injectable({
  providedIn: 'root'
})
export class D3Service {

  simulation;
  nodes;
  node;
  svg;

  projects;

  width = 960;
  height = 960;
  n = 3;

  selectedIndex = 0;
  activeItemId = '30-clean';

  loading = false;
  focused = false;
  transitionDuration = 1000;
  needsResetting = false;



  mouseEvent;
  lastMouseEvent;

  colors =  d3.scaleOrdinal(d3.range(this.n), d3.schemeTableau10);

  constructor(private router: Router, private ngZone: NgZone, private eventManager: EventManagerService, private dataService: DataService, private navigate: NavigationService, private uiService: UiService) {
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.projects = data.projects;

    // Set manually to prevent circular dependency
    this.eventManager.setD3Service(this);
  }

  setSVG(svg) {
    this.svg = svg;
  }

  data() {
    const k = this.width / 100;
    const r = d3.randomUniform(k, k * 4);

    return Array.from({length: this.dataService.projectIds.length}, (_, i) => {

      const radius = r();
      return {id: i, r: radius, startingSize: radius, group: (i % (this.n)), projectId: this.dataService.projectIds[i], imgUrl: "/assets/images/projects/" + this.dataService.projectIds[i] + "/" + this.dataService.projectIds[i] + "-feature.jpg"}
    });
  }

  setupVisualization() {
    this.n = this.dataService.colors.length;
    const objs: any[] = this.data();
    this.nodes = objs.map(Object.create);

    this.width = window.innerWidth;
    this.height = window.innerHeight;


      const self = this;

      this.simulation = d3.forceSimulation(this.nodes)
          .alphaTarget(0.3) // stay hot
          .velocityDecay(0.1) // low friction
          .force("x", d3.forceX().strength(0.01))
          .force("y", d3.forceY().strength(0.01))
          .force("collide", d3.forceCollide().radius(d => d.r + 5).iterations(3))
          .force("center", d3.forceCenter(this.width / 2, this.height / 2));

          //.force("charge", d3.forceManyBody().strength((d, i) => i ? 0 : -width * 2 / 3))



          this.svg.on("touchmove", event => event.preventDefault())

          this.ngZone.runOutsideAngular(() => {
            this.svg.on("pointermove", event => movePointer(event));
            setInterval(() => checkIfMouseMoving(), 10);

          });


          function checkIfMouseMoving() {
            if (self.mouseEvent === self.lastMouseEvent && !self.focused) {
              pointed(self.mouseEvent);
            } else {
              self.lastMouseEvent = self.mouseEvent;
            }
          }


          this.node = this.svg
              //.attr("stroke", "#fff")
             // .attr("stroke-width", 1.5)

            .selectAll("g.node")
            .data(this.nodes, function(d) { return d.id; })
            .join("g")
              .attr("id", d => d.id)
              .attr("class", "node")
              // .attr("filter", "drop-shadow(-1px 6px 3px rgba(50, 50, 0, 0.5))")
              .call( g => g
                .append("svg:clipPath")
               .attr("id",  function(d) { return "circle" + d.id;})
                .append("svg:circle")
                .attr("r", d => d.r)
                .attr("fill", d => self.colors(d.group))
              );

          const images = this.svg.selectAll("g.node")
              .call( g => g
               .append("svg:image")
               .attr("clip-path", d => "url(#circle" + d.id + ")")
                .attr("xlink:href",  function(d) { return d.imgUrl;})
                .attr("x", function(d) { return -d.r;})
                .attr("y", function(d) { return -d.r;})
                .attr("id", d => "image-" + d.id)
                .attr("cursor", "pointer")
                .attr("opacity", 0)
                .attr("display", "none")
                .attr("height", d => 2 * d.r)
                .attr("width", d => 2 * d.r)
                .attr("preserveAspectRatio", "xMidYMid slice")
                .attr("filter", d => `url(#${this.dataService.colors[d.group].r}${this.dataService.colors[d.group].g}${this.dataService.colors[d.group].b})`)
              )

            const smolImages = this.svg.selectAll("g.node")
            .call( g => g
              .append("svg:image")
              .attr("clip-path", d => "url(#circle" + d.id + ")")
              .attr("xlink:href",  function(d) { return "/assets/images/projects/" + d.projectId + "/" + d.projectId + "-feature-sml.jpg";})
              .attr("x", function(d) { return -d.r;})
              .attr("y", function(d) { return -d.r;})
              .attr("id", d => "image-" + d.id + "-sml")
              .attr("opacity", 1)
              .attr("cursor", "pointer")
              .attr("height", d => 2 * d.r)
              .attr("width", d => 2 * d.r)
              .attr("preserveAspectRatio", "xMidYMid slice")
              .attr("filter", d => `url(#${this.dataService.colors[d.group].r}${this.dataService.colors[d.group].g}${this.dataService.colors[d.group].b})`)
            )


          this.simulation.on("tick", () => {
            if (!self.focused) {
              this.node
              .attr("transform", d => "translate(" + d.x + ", " + d.y + ")")
              .call( g => g.selectAll('circle').attr('r', d => d.r))
              .call( g => g.selectAll('image')
              .attr("x", function(d) { return -d.r;})
              .attr("y", function(d) { return -d.r;})
              .attr("height", d => 2 * d.r)
              .attr("width", d => 2 * d.r)
              .attr("preserveAspectRatio", "xMidYMid slice"))

              ;
            }

          });

          var setEvents = images
          // // Append hero text
          .on( 'click', function (d) {
            console.log(d);
            const i = parseInt(d.target.id.slice(6), 10);
            self.selectedIndex = i;
            if (!self.focused) {
              self.focused = !self.focused;

              const activeItemId = self.dataService.projectIds[i];

              self.dataService.setActiveItemIndex(i);
              self.eventManager.setActiveProject(self.dataService.projects[activeItemId]);
              self.dataService.setActiveColor(self.dataService.colors[i % (self.n)]);
              // self.eventManager.projectHoverEnter();
              self.eventManager.openProject();
              self.openProject(i);

            }
           })


      function movePointer(e) {
        self.mouseEvent = e;
        if (!self.focused) {
          pointed(self.mouseEvent);
        }
      }

      function pointed(event) {
        if (event !== undefined) {
          self.checkIfHovered(document.elementFromPoint(event.clientX, event.clientY));
          self.eventManager.updatePopupPosition(event);

          const [x, y] = d3.pointer(event);
          const xPos = x;
          const yPos = y;

          for (const d of self.nodes) {
            d.r = self.calculateCircleRadius(d, xPos, yPos);
          }
          self.simulation.force("collide").initialize(self.nodes);

        }

      }

  }

  openProject(selected) {

    this.router.navigate([data.projects[Object.keys(data.projects)[selected]].id])
    this.svg
      .attr("height", 2 * window.innerHeight)

    console.log(this.node);
    this.node.transition()
    .attr("transform", d => {
      if (d.index === selected) {
        return "translate(" + window.innerWidth * 2 / 3 + ", " + window.innerHeight * 2 / 3 + ")" ;
      }

      return "translate(" + d.x + ", " + d.y + ")";
    });

    const radius = this.calculateFocusedCircleRadius();
    this.node.select(`#image-${selected}-sml`).transition()
    .attr("x", -radius)
    .attr("y", -radius)
    .attr("opacity", 0)
    .attr("cursor", "initial")

    .attr("width", radius * 2)
    .attr("height", radius * 2)
    .duration(this.transitionDuration);

    // Disabling appears to stop disappearing projects after quick changing
    // setTimeout(() => {
    //   this.node.select(`#image-${selected}-sml`)
    //   .attr("display", "none");
    // }, this.transitionDuration)

    this.node.select(`#image-${selected}`).transition()
    .attr("x", -radius)
    .attr("y", -radius)
    .attr("opacity", 1)
    .attr("display", "block")
    .attr("cursor", "initial")

    .attr("width", radius * 2)
    .attr("height", radius * 2)
    .duration(this.transitionDuration);


    this.node.selectAll("circle").transition()
      .attr("r", d => {
        if (d.index === selected) {
          return radius;
        }
        return 0;
      }).duration(this.transitionDuration);

    this.simulation.force("collide").initialize(this.nodes);
  }

  closeProject(selected, isNavigating) {

    this.node.transition()
    .attr("transform", d => {
      return "translate(" + d.x + ", " + d.y + ")";
    }).duration(this.transitionDuration);

    this.node.selectAll("circle").transition()
      .attr("r", d => d.startingSize).duration(this.transitionDuration);
    this.node.select(`#image-${selected}-sml`).transition()
    .attr("x",  d => -d.startingSize)
    .attr("y", d => -d.startingSize)
    .attr("opacity", 1)
    .attr("cursor", "pointer")

    .attr("display", "block")

    .attr("width", d => 2 * d.startingSize)
    .attr("height",  d => 2 * d.startingSize)
    .duration(this.transitionDuration);

    this.node.select(`#image-${selected}`).transition()
    .attr("x",  d => -d.startingSize)
    .attr("y", d => -d.startingSize)
    .attr("opacity", 0)
    .attr("cursor", "pointer")
    .attr("width", d => 2 * d.startingSize)
    .attr("height",  d => 2 * d.startingSize)
    .duration(this.transitionDuration);

    setTimeout(() => {
      this.node.select(`#image-${selected}`)
      .attr("display", "none");

    }, this.transitionDuration)

    if (isNavigating) {
      this.focused = false;
    } else {
      setTimeout(() => {
        this.focused = false;

      }, this.transitionDuration);
    }


    this.simulation.force("collide").initialize(this.nodes);

    if (this.needsResetting) {
      setTimeout(() => {
        d3.selectAll("svg#chart > *").remove()
      this.setupVisualization();
      },this.transitionDuration)
    }


  }
  openProjectIfNotSet(projectId) {
    if (this.dataService.activeIndex === undefined) {
      const i = this.dataService.projectIds.indexOf(projectId);
      this.dataService.setActiveColor(this.dataService.colors[i % (this.n)]);
      this.loading = true;

      if (this.navigate.isFirstLoad()) {
        setTimeout(() => {
          console.log(i);
          this.selectedIndex = i;
          this.focused = true;
          this.loading = false;


          this.dataService.setActiveItemIndex(i);
          this.eventManager.openProject();

          this.openProject(i);
        }, 500);
      } else {
          console.log(i);
          this.selectedIndex = i;
          this.focused = true;
          this.loading = false;

          this.dataService.setActiveItemIndex(i);
          this.eventManager.openProject();

          this.openProject(i);
      }




    }
  }
  closeProjectIfOpen(navigating: boolean) {
    if (this.focused) {
      this.closeProject(this.dataService.activeIndex, navigating)
    }
  }


  easeInOutCubic(x: number): number {
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
  }

  calculateFocusedCircleRadius() {
    const center = window.innerHeight * 2 / 3;

    const distanceFromTopEdge = 50;

    return center - distanceFromTopEdge;
  }

  calculateCircleRadius(d, xPos, yPos) {
     // Distance from mouse position to node
     const magnitude = Math.sqrt(Math.pow((d.x - xPos), 2) + Math.pow((d.y - yPos), 2));

     // console.log('magnitude: '  + magnitude);
     const maxMagnitude = 250;

     const normalized = magnitude > maxMagnitude ? 0 : 1 - (magnitude / maxMagnitude);

     const minSize = 5;
     const changeModifier = 100;
     const r = d.startingSize + (changeModifier * this.easeInOutCubic(normalized));
     const maxSize = 50;
     // d.r = r > maxSize ? maxSize : r;

     return Math.abs(r);
  }


  resize() {
    this.width = window.innerWidth;
    this.width = window.innerHeight;
    this.svg.width = this.width;
    this.svg.style.height = this.height;

    this.simulation.restart();
  }

  colorFilter = (red, blue, green, id) => {
    return `<svg xmlns="http://www.w3.org/2000/svg" ><filter id="${id}"><feColorMatrix type="matrix" result="grayscale" values="1 0 0 0 0 1 0 0 0 0 1 0 0 0 0 0 0 0 1 0" /> <feComponentTransfer color-interpolation-filters="sRGB" result="duotone_magenta_gold"><feFuncR type="table" tableValues="${red} 1"></feFuncR><feFuncG type="table" tableValues="${green} 1"></feFuncG><feFuncB type="table" tableValues="${blue} 1"></feFuncB><feFuncA type="table" tableValues="0 1"></feFuncA></feComponentTransfer></filter></svg>`;
  }

  checkIfHovered(el: Element) {
    if (!this.loading && el.id !== null && el.id.indexOf('image') > -1 ) {
      console.log(el.id);
      const index = parseInt(el.id.slice(6), 10);

      if (index !== this.dataService.activeIndex) {
        const activeItemId = this.dataService.projectIds[index];

        this.dataService.setActiveItemIndex(index);
        this.dataService.setActiveProject(this.dataService.projects[activeItemId]);

        // Testing color mixing
        ///////////////////////
        // const col1 = this.filters[index % (this.n)];
        // const col2 = this.filters[(index + 1) % (this.n)]
        // const color = new Color(col1.r, col1.b, col1.g)
        // const mixedColor = color.colorMixer([col2.r * 255, col2.g * 255, col2.b * 255], 0.7)
        // this.dataService.setActiveColor({r: mixedColor[0] / 255, g: mixedColor[1]/ 255, b: mixedColor[2] / 255});

        this.dataService.setActiveColor(this.dataService.colors[index % (this.n)]);

        this.eventManager.projectHoverEnter();
      }
    } else {
      this.eventManager.projectHoverExit();

    }
  }

  resetVisualization() {
    if (!this.uiService.isFocused) {
      d3.selectAll("svg#chart > *").remove()
      this.setupVisualization();
      this.needsResetting = false;

    } else {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.openProject(this.dataService.activeIndex);
      this.needsResetting = true;
    }
  }
}
