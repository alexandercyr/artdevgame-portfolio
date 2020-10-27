import { Component, ViewChild, ElementRef, AfterContentInit, OnInit } from '@angular/core';
import * as d3 from 'd3';


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


  data() {
    const k = this.width / 200;
    const r = d3.randomUniform(k, k * 4);
    return Array.from({length: 50}, (_, i) => {
      const radius = r();
      var img = new Image(100, 100);
      img.src = 'https://cataas.com/cat';
      return {r: radius, startingSize: radius, group: (i % (this.n + 1)), img: img}
    });
  }

  constructor() { }

  ngOnInit() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;


    window.addEventListener('resize', () => this.resize());
  }

  ngAfterContentInit() {
    // console.log(this.chart);
    // const rect = this.chart.nativeElement.getBoundingClientRect();
    // console.log(rect.width, rect.height);

    // this.width = rect.width;

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
          .force("collide", d3.forceCollide().radius(d => d.r + 1).iterations(3))
          .force("center", d3.forceCenter(this.width / 2, this.height / 2));

          //.force("charge", d3.forceManyBody().strength((d, i) => i ? 0 : -width * 2 / 3))



          this.svg.on("touchmove", event => event.preventDefault())

          this.svg.on("pointermove", event => pointed(event));

          const node = this.svg.append("g")
              //.attr("stroke", "#fff")
             // .attr("stroke-width", 1.5)
            .selectAll("circle")
            .data(nodes)
            .join("circle")
              .attr("r", d => d.r)
              .attr("fill", d => self.colors(d.group));
             // .call(drag(simulation));

          node.append("title")
              .text(d => d.id);

          self.simulation.on("tick", () => {
            node
                .attr("r", d => d.r)
                .attr("cx", d => d.x)
                .attr("cy", d => d.y);
          });


      // d3.select(context.canvas)
      //     .on("touchmove", event => event.preventDefault())
      //     .on("pointermove", event => pointed(event));


      // // invalidation.then(() => simulation.stop());

      function pointed(event) {
        const [x, y] = d3.pointer(event);
        const xPos = x;
        const yPos = y;

        for (const d of nodes) {

          // Distance from mouse position to node
          const magnitude = Math.sqrt(Math.pow((d.x - xPos), 2) + Math.pow((d.y - yPos), 2));

          const minSize = 5;
          const r = d.startingSize + 1000 / magnitude;
          const maxSize = 50;
          d.r = r > maxSize ? maxSize : r;
        }
        self.simulation.force("collide").initialize(nodes);
      }

      // function ticked() {
      //   context.clearRect(0, 0, self.width, self.height);
      //   context.save();

      //   context.translate(self.width / 2, self.height / 2);
      //   context.beginPath();

      //   for (const d of nodes) {


      //     context.moveTo(d.x + d.r, d.y);
      //     context.arc(d.x, d.y, d.r, 0, 2 * Math.PI, false);
      //     context.fillStyle = self.colors(d.group);
      //     context.fill();

      //     // const pattern = context.createPattern(d.img, "repeat");
      //     // context.strokeStyle = pattern;
      //     // context.stroke();

      //   }

      //   context.clip();
      //   for (const d of nodes) {


      //     context.drawImage(d.img, d.x - d.r, d.y - d.r, d.r * 2, d.r * 2)

      //     // const pattern = context.createPattern(d.img, "repeat");
      //     // context.strokeStyle = pattern;
      //     // context.stroke();

      //   }


      //   context.restore();
      // }


  }

  resize() {
    this.width = window.innerWidth;
    this.width = window.innerHeight;
    this.svg.width = this.width;
    this.svg.height = this.height;

    this.simulation.restart();
  }



}
