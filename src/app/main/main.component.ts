import { Component, ViewChild, ElementRef, AfterContentInit, OnInit, NgZone } from '@angular/core';
import {Location} from '@angular/common';

import { Router } from '@angular/router';
import * as d3 from 'd3';
import * as data from '../../assets/data/data.json';
import { EventManagerService } from '../_services/event-manager.service';
import { DataService } from '../_services/data.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements AfterContentInit, OnInit {

  width = 960;
  height = 960;
  n = 3;

  colors =  d3.scaleOrdinal(d3.range(this.n), d3.schemeTableau10);

  svg;
  simulation;
  selectedIndex = 0;
  activeItemIndex = 0;
  activeItemId = '30-clean';
  projectIds = [];
  projects;
  focused = false;
  transitionDuration = 1000;

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

    mouseEvent;
    lastMouseEvent;


  data() {
    const k = this.width / 100;
    const r = d3.randomUniform(k, k * 4);



    return Array.from({length: this.projectIds.length}, (_, i) => {

      const radius = r();
      var img = new Image(100, 100);
      img.src = '/assets/images/phone.jpg';
      return {id: i, r: radius, startingSize: radius, group: (i % (this.n)), img: data.projects[this.projectIds[i]].imgUrl}
    });
  }

  constructor(private ngZone: NgZone, private router: Router, private location: Location, private eventManager: EventManagerService, private dataService: DataService) { }

  ngOnInit() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.projectIds = Object.keys(data.projects);
    this.projects = data.projects;

    window.addEventListener('resize', () => this.resize());

  }

  ngAfterContentInit() {

    const objs: any[] = this.data();


    this.svg =  d3.select("svg#chart")
    .attr("width", this.width )
    .attr("height", this.height )

      //this.svg = document.querySelector('#chart') as HTMLElement;


      const nodes = objs.map(Object.create);

      const self = this;

      this.simulation = d3.forceSimulation(nodes)
          .alphaTarget(0.3) // stay hot
          .velocityDecay(0.1) // low friction
          .force("x", d3.forceX().strength(0.01))
          .force("y", d3.forceY().strength(0.01))
          .force("collide", d3.forceCollide().radius(d => d.r + 5).iterations(3))
          .force("center", d3.forceCenter(this.width / 2, this.height / 2));

          //.force("charge", d3.forceManyBody().strength((d, i) => i ? 0 : -width * 2 / 3))



          this.svg.on("touchmove", event => event.preventDefault())

          this.ngZone.runOutsideAngular(() => {
            self.svg.on("pointermove", event => movePointer(event));
            setInterval(() => checkIfMouseMoving(), 10);

          });



          function checkIfMouseMoving() {
            if (self.mouseEvent === self.lastMouseEvent && !self.focused) {
              pointed(self.mouseEvent);
            } else {
              self.lastMouseEvent = self.mouseEvent;
            }
          }


          const node = this.svg
              //.attr("stroke", "#fff")
             // .attr("stroke-width", 1.5)

            .selectAll("g.node")
            .data(nodes, function(d) { return d.id; })
            .join("g")
              .attr("id", d => d.id)
              .attr("class", "node")
              .attr("filter", "drop-shadow(-1px 6px 3px rgba(50, 50, 0, 0.5))")
              .call( g => g
                .append("svg:clipPath")
               .attr("id",  function(d) { return "circle" + d.id;})
                .append("svg:circle")
                .attr("r", d => d.r)
                .attr("fill", d => self.colors(d.group))
              )

              // Drop shadow hurting performace
              //
              // .call( g => g
              //   .append("svg:circle")
              //   .attr("r", d => d.r)
              //   .attr("fill", d => self.colors(d.group))
              //   .attr("filter", "url(#shadow)")
              // );

          const images = this.svg.selectAll("g.node")
              .call( g => g
               .append("svg:image")
               .attr("clip-path", d => "url(#circle" + d.id + ")")
                .attr("xlink:href",  function(d) { return d.img;})
                .attr("x", function(d) { return -d.r;})
                .attr("y", function(d) { return -d.r;})
                .attr("id", d => "image-" + d.id)
                .attr("cursor", "pointer")
                .attr("opacity", 0)
                .attr("display", "none")
                .attr("height", d => 2 * d.r)
                .attr("width", d => 2 * d.r)
                .attr("filter", d => `url(#${this.filters[d.group].r}${this.filters[d.group].g}${this.filters[d.group].b})`)
              )

            const smolImages = this.svg.selectAll("g.node")
            .call( g => g
              .append("svg:image")
              .attr("clip-path", d => "url(#circle" + d.id + ")")
              .attr("xlink:href",  function(d) { return "/assets/images/phone-sml.jpg";})
              .attr("x", function(d) { return -d.r;})
              .attr("y", function(d) { return -d.r;})
              .attr("id", d => "image-" + d.id + "-sml")
              .attr("opacity", 1)
              .attr("cursor", "pointer")
              .attr("height", d => 2 * d.r)
              .attr("width", d => 2 * d.r)
              .attr("filter", d => `url(#${this.filters[d.group].r}${this.filters[d.group].g}${this.filters[d.group].b})`)
            )


          self.simulation.on("tick", () => {
            if (!self.focused) {
              node
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
            openProject(i);
            if (!self.focused) {
              self.focused = !self.focused;

              self.eventManager.openProject();
              openProject(i);

            } else {
              self.eventManager.closeProject();
              closeProject(i);
              setTimeout(() => {
                self.focused = !self.focused;
              }, self.transitionDuration);
            }
            self.selectedIndex = i;

              // d3.select("h1").html(d.hero);
              // d3.select("h2").html(d.name);
              // d3.select("h3").html ("Take me to " + "<a href='" + d.link + "' >"  + d.hero + " web page ⇢"+ "</a>" );
           })

          // .on( 'pointerenter', function(e) {
          //   // select element in current context

          //   console.log('enter');
          //   self.activeItemIndex = e.target.id;

          //   self.popup.nativeElement.classList.toggle("show");

          //   // d3.select( this )
          //   //   .transition()
          //   //   .attr("x", function(d) { return -60;})
          //   //   .attr("y", function(d) { return -60;})
          //   //   .attr("height", 100)
          //   //   .attr("width", 100);
          // })
          // // // set back
          // .on( 'pointerout', function(event) {
          //   console.log('out');

          //   self.popup.nativeElement.classList.toggle("show");

          // });


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



          for (const d of nodes) {
            d.r = self.calculateCircleRadius(d, xPos, yPos);
          }
          self.simulation.force("collide").initialize(nodes);


        }

      }

      function openProject(selected) {

        // self.location.go(data.projects[selected].title);
        self.router.navigate([data.projects[self.projectIds[selected]].id])
        self.svg
          .attr("height", 2 * window.innerHeight )

        console.log(node);
        node.transition()
        .attr("transform", d => {
          if (d.index === selected) {
            return "translate(" + window.innerWidth * 2 / 3 + ", " + window.innerHeight * 2 / 3 + ")" ;
          }

          return "translate(" + d.x + ", " + d.y + ")";
        });

        const radius = self.calculateFocusedCircleRadius();
        node.select(`#image-${selected}-sml`).transition()
        .attr("x", -radius)
        .attr("y", -radius)
        .attr("opacity", 0)
        .attr("width", radius * 2)
        .attr("height", radius * 2)
        .duration(self.transitionDuration);

        setTimeout(() => {
          node.select(`#image-${selected}-sml`)
          .attr("display", "none");
        }, self.transitionDuration)

        node.select(`#image-${selected}`).transition()
        .attr("x", -radius)
        .attr("y", -radius)
        .attr("opacity", 1)
        .attr("display", "block")

        .attr("width", radius * 2)
        .attr("height", radius * 2)
        .duration(self.transitionDuration);


          node.selectAll("circle").transition()

          .attr("r", d => {
            if (d.index === selected) {
              return radius;
            }
            return 0;
          }).duration(self.transitionDuration);
        // for (const d of nodes) {
        //   d.r = 0;
        // }
        self.simulation.force("collide").initialize(nodes);
      }

      function closeProject(selected) {

        node.transition()
        .attr("transform", d => {
          return "translate(" + d.x + ", " + d.y + ")";
        }).duration(self.transitionDuration);

        node.selectAll("circle").transition()
          .attr("r", d => d.startingSize).duration(self.transitionDuration);
        node.select(`#image-${selected}-sml`).transition()
        .attr("x",  d => -d.startingSize)
        .attr("y", d => -d.startingSize)
        .attr("opacity", 1)

        .attr("display", "block")

        .attr("width", d => 2 * d.startingSize)
        .attr("height",  d => 2 * d.startingSize)
        .duration(self.transitionDuration);

        node.select(`#image-${selected}`).transition()
        .attr("x",  d => -d.startingSize)
        .attr("y", d => -d.startingSize)
        .attr("opacity", 0)
        .attr("width", d => 2 * d.startingSize)
        .attr("height",  d => 2 * d.startingSize)
        .duration(self.transitionDuration);

        setTimeout(() => {
          node.select(`#image-${selected}`)
          .attr("display", "none");
        }, self.transitionDuration)



        // for (const d of nodes) {
        //   d.r = 0;
        // }
        self.simulation.force("collide").initialize(nodes);
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

  showMore() {

  }

  checkIfHovered(el: Element) {
    if (el.id !== null && el.id.indexOf('image') > -1) {
      console.log(el.id);
      this.activeItemId = this.projectIds[parseInt(el.id.slice(6), 10)];
      console.log(this.activeItemId);

      this.activeItemIndex = parseInt(el.id.slice(6), 10);
      this.eventManager.setActiveProject(this.projects[this.activeItemId]);

      this.eventManager.projectHoverEnter();
        } else {
      this.eventManager.projectHoverExit();

    }
  }
}
